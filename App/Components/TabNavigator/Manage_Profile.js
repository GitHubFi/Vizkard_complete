import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
import { profileAction } from '../../Store/Actions/AppAction'




class Manage_Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // experience: '',
            // company_name: '',
            submit: false,
            skill_name: '',
            company_name: '',
            submit_company_name: false,
            occupation: '',
            submit_occupation_name: false

        }
    }



    submit = () => {
        const { skill_name } = this.state;
        const userID = this.props.userID.uid
        if (skill_name === '') {
            Alert.alert("", 'Enter your name');
        } else {

            firebase
                .database()
                .ref(`users/${userID}`)
                .child('userDetail')
                .update({
                    name: skill_name
                }).then(() => {
                    this.change_Name()
                    this.setState({
                        // skill_name: '',
                        submit: true
                    })
                    this.props.profileData(userID)

                    setTimeout(() => {

                        Alert.alert('', "your name has been successfully Changed");
                        this.change_Name()
                        this.setState({
                            submit: false,
                            skill_name: ''
                        })
                    }, 3000);
                })
                .catch((err) => {
                    Alert.alert("", err);
                });
        }
    }
    submit_company_name = () => {
        const { company_name } = this.state;
        const userID = this.props.userID.uid
        if (company_name === '') {
            Alert.alert("", 'Enter your Company name');
        } else {

            firebase
                .database()
                .ref(`users/${userID}`)
                .child('userDetail')
                .update({
                    company: company_name
                })
                .then(() => {
                    this.setState({
                        // company_name: '',
                        submit_company_name: true
                    });
                    this.props.profileData(userID)


                    setTimeout(() => {

                        Alert.alert('', "your Company name has been successfully Changed");
                        this.change_Company()
                        this.setState({
                            submit_company_name: false,
                            company_name: '',
                        })
                    }, 3000);
                }).catch((err) => {
                    Alert.alert("", err);
                });
        }
    }
    submit_occupation_name = () => {
        const { occupation } = this.state;
        const userID = this.props.userID.uid
        if (occupation === '') {
            Alert.alert("", 'Enter your occupation');
        } else {

            firebase
                .database()
                .ref(`users/${userID}`)
                .child('userDetail')
                .update({
                    occupation: occupation
                })
                .then(() => {
                    this.setState({

                        submit_occupation_name: true
                    });
                    this.props.profileData(userID)


                    setTimeout(() => {

                        Alert.alert('', "your occupation has been successfully Changed");
                        this.change_occupation()
                        this.setState({
                            submit_occupation_name: false,
                            occupation: '',
                        })
                    }, 3000);
                }).catch((err) => {
                    Alert.alert("", err);
                });
        }
    }

    change_Name = () => {
        const { skill_name } = this.state;
        let userID = this.props.userID.uid;
        firebase.database().ref("users").child(`${userID}/FriendList`).on('value', snapshot => {
            let userList = snapshot.val()
            if (userList !== null) {
                let userListKeys = Object.keys(userList);
                let userID = this.props.userID.uid;

                userListKeys.map(key => {
                    firebase.database().ref('users').child(key).child(`FriendList/${userID}`).update({
                        name: skill_name

                    })
                })
            } else {

            }

        })
    }


    change_Company = () => {
        const { company_name } = this.state;
        let userID = this.props.userID.uid;
        firebase.database().ref("users").child(`${userID}/FriendList`).on('value', snapshot => {
            let userList = snapshot.val();
            if (userList !== null) {
                let userListKeys = Object.keys(userList);
                let userID = this.props.userID.uid;

                userListKeys.map(key => {
                    firebase.database().ref('users').child(key).child(`FriendList/${userID}`).update({
                        company: company_name

                    })
                })
            } else {

            }

        })
    }

    change_occupation = () => {
        const { occupation } = this.state;
        let userID = this.props.userID.uid;
        firebase.database().ref("users").child(`${userID}/FriendList`).on('value', snapshot => {
            let userList = snapshot.val();
            if (userList !== null) {
                let userListKeys = Object.keys(userList);
                let userID = this.props.userID.uid;

                userListKeys.map(key => {
                    firebase.database().ref('users').child(key).child(`FriendList/${userID}`).update({
                        occupation: occupation

                    })
                })
            } else {

            }

        })
    }
    render() {

        return (
            <View
                style={{ flex: 1, marginTop: 0, justifyContent: "center", textAlign: "center", padding: 20, }}>
                <View style={{ padding: 10 }}>
                    <Item floatingLabel>
                        <Label>Change Profile name</Label>
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
                <View style={{ padding: 10 }}>
                    <Item floatingLabel>
                        <Label>Change Company name</Label>
                        <Input
                            onChangeText={company_name => this.setState({ company_name })}
                            value={this.state.company_name} />
                    </Item>

                </View>
                {
                    (this.state.submit_company_name === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    onPress={this.submit_company_name}>
                    <Text>submit</Text>
                </Button>
                <View style={{ padding: 10 }}>
                    <Item floatingLabel>
                        <Label>Change Occupation</Label>
                        <Input
                            onChangeText={occupation => this.setState({ occupation })}
                            value={this.state.occupation} />
                    </Item>

                </View>
                {
                    (this.state.submit_occupation_name === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    onPress={this.submit_occupation_name}>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Manage_Profile);