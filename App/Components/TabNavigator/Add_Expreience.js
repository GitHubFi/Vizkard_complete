import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
import { profileAction, GetUserAction } from '../../Store/Actions/AppAction'


class Add_Expreience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            experience: '',
            company_name: '',
            submit: false,

        }
    }



    submit = () => {
        const { experience, company_name } = this.state;
        const userID = this.props.userID.uid
        if (experience === '') {
            Alert.alert("", 'Add your experience');
        } else if (company_name === '') {
            Alert.alert("", 'Add your Company name');

        } else {


            firebase.database().ref(`users/${userID}`).child('Experience/').push({
                Company: company_name,
                Experience: experience
            }).then(() => {
                this.setState({
                    experience: '',
                    company_name: '',
                    submit: true
                });

                setTimeout(() => {

                    Alert.alert('', "your experience has been successfully submitted");
                    this.setState({
                        submit: false
                    });
                    this.props.GetExperience(userID);
                    this.props.profileData(userID);
                }, 3000);
            }).catch((err) => {
                Alert.alert("", err.message);
                console.log(err, "meraj")
            });
        }
    }
    render() {

        return (
            <View
                style={{ flex: 0.3, marginTop: 50, justifyContent: "center", textAlign: "center", padding: 10, margin: 20 }}>
                <View style={{ paddingBottom: 20 }}>
                    <Item floatingLabel>
                        <Label>Company Name</Label>
                        <Input
                            onChangeText={company_name => this.setState({ company_name })}
                            value={this.state.company_name}
                            keyboardType={"default"} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Add Experience</Label>
                        <Input
                            onChangeText={experience => this.setState({ experience })}
                            value={this.state.experience}
                            keyboardType={"default"} />
                    </Item>



                </View>
                {
                    (this.state.submit === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    onPress={this.submit}>
                    <Text>submit</Text>
                </Button>

            </View>
        );
    }
}

const styles = StyleSheet.flatten({});
function mapStateToProps(state) {
    return {
        verifyCode: state.authReducer.currentUser,
        phoneNumber: state.authReducer.phoneNumber,


        userID: state.authReducer.userID,

        isProgress: state.authReducer.isProgress,

        isError: state.authReducer.isError,

        errorTest: state.authReducer.errorTest,


    }
}
function mapDispatchToProps(dispatch) {
    return {
        verifyCode: (payload, path) => {
            dispatch(verifylogin(payload, path));
        },
        profileData: (userID) => {
            dispatch(profileAction(userID));
        },
        GetExperience: (userID) => {
            dispatch(GetUserAction(userID))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Add_Expreience);