import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
import { profileAction, GetUserAction } from '../../Store/Actions/AppAction'




class Edit_Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // experience: '',
            // company_name: '',
            submit: false,
            editWork: '',
            editExperience: '',
            Experience_name: '',
            delete: false,
            editSpinner: false,
            editexpspinner: false

        }

    }

    componentWillMount() {
        const id = this.props.userID.uid
        this.props.GetExperience(id);
    }




    editWork = () => {
        const { editWork, } = this.state;
        // const Experience = this.state.Experience_name
        const userID = this.props.userID.uid;
        const editExp = this.props.name;
        if (editWork === '') {
            Alert.alert("please enter your work space");
        } else {
            var ref = firebase.database().ref("users").child(userID).child("Experience");
            ref.orderByChild("Company").equalTo(editExp).once("value", function (snapshot) {
                snapshot.forEach(function (employee) {
                    employee.ref.update({ Company: editWork });
                });
            }).then(() => {
                this.setState({
                    editWork: '',
                    editSpinner: true
                });

                setTimeout(() => {
                    Alert.alert('', "your skill has been successfully changed");
                    this.setState({
                        editSpinner: false
                    })
                }, 3000);
            }).catch((err) => {
                Alert.alert("error", err);
            });
        }
    }
    Edit_Experience = () => {
        const { editExperience, } = this.state;
        // const Experience = this.state.Experience_name
        const userID = this.props.userID.uid;
        const editExp = this.props.Experience;
        if (editExperience === '') {
            Alert.alert("please enter your experience");
        } else {
            var ref = firebase.database().ref("users").child(userID).child("Experience");
            ref.orderByChild("Experience").equalTo(editExp).once("value", function (snapshot) {
                snapshot.forEach(function (employee) {
                    employee.ref.update({ Experience: editExperience });
                });
            }).then(() => {
                this.setState({
                    editExperience: '',
                    editexpspinner: true
                });

                setTimeout(() => {
                    Alert.alert('', "your skill has been successfully changed");
                    this.setState({
                        editexpspinner: false
                    })
                }, 3000);
            }).catch((err) => {
                Alert.alert("error", err);
            });
        }
    }

    delete_Experience = () => {

        const userID = this.props.userID.uid;
        const editWork = this.props.name;
        const editExp = this.props.Experience;

        Alert.alert(
            `Are you sure delete ?`,
            '',
            [
                ,
                { text: 'Cancel', onPress: () => { }, style: 'cancel', }, {
                    text: 'Confirm ',
                    onPress: () => {
                        var ref = firebase.database().ref("users").child(userID).child("Experience");
                        ref.orderByChild("Company").equalTo(editWork).once("value", function (snapshot) {
                            snapshot.forEach(function (employee) {
                                employee.ref.remove({ Company: editWork, Experience: editExp });
                            });
                        })
                            .then(() => {
                                this.setState({ delete: true });
                                setTimeout(() => {
                                    Alert.alert('', "your Experience has been deleted");
                                    this.setState({
                                        delete: false
                                    });
                                    this.props.GetExperience(userID);
                                    this.props.profileData(userID);

                                }, 3000);
                            }).catch((err) => {
                                Alert.alert("error", err);
                            });

                    }
                }
            ],
            { cancelable: false },
        );

    }

    render() {
        // console.log("waaaa", this.state.keyss)

        return (
            <View
                style={{ flex: 1, marginTop: 0, justifyContent: "center", textAlign: "center", padding: 20, }}>
                <View style={{ padding: 10, }} >
                    <Item floatingLabel >
                        <Label>Edit Your work space {this.props.name}</Label>
                        <Input
                            onChangeText={editWork => this.setState({ editWork })}
                            value={this.state.editWork} />
                    </Item>

                </View>
                {
                    (this.state.editSpinner === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    onPress={this.editWork}>
                    <Text>Update</Text>
                </Button>
                <View style={{ padding: 10 }}>
                    <Item floatingLabel>
                        <Label>Edit Your Experience {this.props.Experience}</Label>
                        <Input
                            onChangeText={editExperience => this.setState({ editExperience })}
                            value={this.state.editExperience} />
                    </Item>

                </View>
                {
                    (this.state.editexpspinner === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    style={{ padding: 10, marginBottom: 20 }}
                    onPress={this.Edit_Experience}>
                    <Text>Update Experience</Text>
                </Button>
                {/* <View style={{ padding: 10, }}> */}
                <Button block danger
                    onPress={this.delete_Experience}
                    style={{ padding: 10, }}>
                    <Text>Remove Experience</Text>
                </Button>
                {
                    (this.state.delete === true) ?

                        <Spinner color='red' />

                        : null
                }

                {/* </View> */}


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
        All_Experience: state.appReducer.All_Experience

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
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Experience);