import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert, Dimensions } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
import { profileAction, getSkillAction, getSkillnewarrayAction } from '../../Store/Actions/AppAction';
const { width, height } = Dimensions.get("window");



class Edit_Skill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // experience: '',
            // company_name: '',
            submit: false,
            skill_name: '',
            Experience_name: '',
            delete: false,
            edit: false


        }

    }

    componentWillMount() {
        const id = this.props.userID.uid
        this.props.profileData(id);
        this.props.getSkill(id);
    }


    delete_Experience = () => {

        const userID = this.props.userID.uid;
        const editSkill = this.props.value;
        Alert.alert(
            `Are you sure delete ?`,
            '',
            [
                ,
                {
                    text: 'Cancel',
                    onPress: () => {

                    }
                    ,
                    style: 'cancel',
                },
                {
                    text: 'Confirm ',
                    onPress: () => {
                        var ref = firebase.database().ref("users").child(userID).child("Skills");
                        ref.orderByChild("Skill").equalTo(editSkill).once("value", function (snapshot) {
                            snapshot.forEach(function (employee) {
                                employee.ref.remove({ Skill: editSkill });
                            })
                        }).then(() => {
                            // this.props.getSkillnewarray()
                            this.setState({

                                delete: true
                            });
                            setTimeout(() => {
                                 this.props.getSkill(userID)

                                Alert.alert('', "your skill has been deleted");
                                this.setState({
                                    delete: false
                                });
                            }, 2000);
                        }).catch((err) => {
                            Alert.alert("", err);
                        });

                    }
                }
            ],
            { cancelable: false },
        );

    }
    submit = () => {
        const { skill_name, } = this.state;

        const userID = this.props.userID.uid;
        const editExp = this.props.value;
        if (skill_name === '') {
            Alert.alert("please enter your skill")
        } else {
            var ref = firebase.database().ref("users").child(userID).child("Skills");
            ref.orderByChild("Skill").equalTo(editExp).once("value", function (snapshot) {
                snapshot.forEach(function (employee) {
                    employee.ref.update({ Skill: skill_name });
                });
            }).then(() => {
                this.setState({
                    edit: true,
                    skill_name: ''
                });

                setTimeout(() => {
                    Alert.alert('', "your skill has been successfully updated");
                    this.setState({
                        edit: false
                    })
                }, 3000);
            }).catch((err) => {
                Alert.alert("", err);
            });



        }

    }

    render() {
        console.log("waaaa", this.state.keyss)

        return (
            <View
                style={{ flex: 0.3, marginTop: 50, justifyContent: "center", textAlign: "center", padding: 10, margin: 20 }}>
                <View style={{ paddingBottom: 20, padding: 10 }}>
                    <Item floatingLabel>
                        <Label>Edit Your {this.props.value} Skill</Label>
                        <Input
                            onChangeText={skill_name => this.setState({ skill_name })}
                            value={this.state.skill_name} />
                    </Item>

                </View>
                {
                    (this.state.edit === true) ?

                        <Spinner color='blue' />

                        : null
                }
                <Button block info
                    onPress={this.submit}>
                    <Text>Update</Text>
                </Button>



                <View style={{ paddingTop: 20, }}>
                    <Button block danger style={{ padding: 10 }}
                        onPress={this.delete_Experience}>
                        <Text>Remove {this.props.value} skill </Text>
                    </Button>
                    {
                        (this.state.delete === true) ?

                            <Spinner color='red' />

                            : null
                    }

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.flatten({});
function mapStateToProps(state) {
    return {
        verifyCode: state.authReducer.currentUser,
        phoneNumber: state.authReducer.phoneNumber,
        All_Skill: state.appReducer.All_Skill,
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
        getSkill: (userID) => {
            dispatch(getSkillAction(userID));
        },
        getSkillnewarray: () => {
            dispatch(getSkillnewarrayAction())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit_Skill);