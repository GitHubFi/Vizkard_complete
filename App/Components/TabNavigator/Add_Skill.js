import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";



class Add_Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // experience: '',
            // company_name: '',
            submit: false,
            skill_name: ''

        }
    }



    submit = () => {
        const { skill_name } = this.state;
        const userID = this.props.userID.uid
        if (skill_name === '') {
            Alert.alert("", 'Add your Skills');
        } else {
            
             firebase
                .database()
                .ref(`users/${userID}`)
                .child('Skills').push({ Skill: skill_name }) 
                // .set({
                //     Skill: skill_name
                // })
                .then(() => {
                    this.setState({
                        skill_name: '',
                        submit: true
                    });

                    setTimeout(() => {

                        Alert.alert('', "your skill has been successfully submitted");
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
        // console.log("waaaa", this.state.skill_name)
        return (
            <View
                style={{ flex: 0.3, marginTop: 50, justifyContent: "center", textAlign: "center", padding: 10, margin: 20 }}>
                <View style={{ paddingBottom: 20 }}>
                    <Item floatingLabel>
                        <Label>Add Skills</Label>
                        <Input
                            onChangeText={skill_name => this.setState({ skill_name })}
                            value={this.state.skill_name} />
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Add_Skill);