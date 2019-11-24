import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";

class AddTagLine extends Component {
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
        const prevTag = this.props.value
        if (company_name === '') {
            Alert.alert("", 'Please add tag line');

        } else {


            firebase.database().ref(`users/${userID}`).child('TagLine').child(`post`).push(company_name)
                .then(() => {
                    this.setState({

                        company_name: '',
                        submit: true
                    });

                    setTimeout(() => {

                        Alert.alert('', "your Tag Line has been successfully submitted");
                        this.setState({
                            submit: false
                            
                        })
                    }, 3000);
                }).catch((err) => {
                    Alert.alert("", err);
                });
        }
    }
    render() {
        // console.log("waaaa", this.state.total_experience)
        return (
            <View
                style={{ flex: 0.3, marginTop: 0,  justifyContent: "center", textAlign: "center", padding: 10, margin: 10 }}>
                <View style={{ paddingBottom: 10 }}>
                    <Item floatingLabel>
                        <Label>Add Tag Line</Label>
                        <Input
                            onChangeText={company_name => this.setState({ company_name })}
                            value={this.state.company_name} />
                    </Item>
                    {/* <Item floatingLabel>
                        <Label>Add Experience</Label>
                        <Input
                            onChangeText={experience => this.setState({ experience })}
                            value={this.state.experience} />
                    </Item> */}



                </View>
                {
                    (this.state.submit === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    onPress={this.submit}>
                    <Text>Add your tag line</Text>
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTagLine);