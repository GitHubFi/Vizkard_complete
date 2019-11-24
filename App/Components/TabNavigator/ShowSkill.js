import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert, Dimensions, ScrollView, Modal, TouchableHighlight } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner, List, ListItem } from 'native-base';
import { connect } from 'react-redux';
import firebase from "react-native-firebase";
const { width, height } = Dimensions.get("window");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Edit_Skill from "./Edit_Skill";
import { profileAction, GetUserAction, getSkillAction } from '../../Store/Actions/AppAction'



class ShowSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_skills: [],
            modalVisible1: false,
            Edit_Skill: null
        }
    }

    componentWillMount() {
        let userID = this.props.userID.uid;
        // const id = firebase.auth().currentUser.uid
        // firebase
        //     .database()
        //     .ref("users")
        //     .child(id)
        //     .child('Skills')
        //     .on("child_added", value => {

        //         this.setState(prevState => {
        //             return {
        //                 total_skills: [...prevState.total_skills, value.val()]
        //             };
        //         });
        //     });

        this.props.getSkill(userID);



    }




    setModalVisible1(visible, Skill) {
        this.setState({ modalVisible1: visible, Edit_Skill: Skill });

    }

    render() {

        return (
            <ScrollView>
                <View
                    style={{ justifyContent: "center", textAlign: "center", }}>

                    {
                        (this.props.All_Skill !== null) ?


                            this.props.All_Skill.map((value, id) => {
                                return <View key={id}>
                                    <List>
                                        <ListItem key={id}>
                                            <Text
                                                style={{
                                                    fontSize: width / 30,
                                                    // paddingTop: 0,
                                                    // paddingBottom: 10,
                                                    fontWeight: "normal",
                                                    color: "#000",
                                                    // textAlign: "center",
                                                    // justifyContent: "center"

                                                }}
                                                onPress={() => {
                                                    this.setModalVisible1(true, value.Skill);
                                                }}>
                                                {value.Skill}
                                            </Text>
                                        </ListItem>
                                    </List>



                                    <Modal
                                        animationType='fade'
                                        transparent={false}
                                        style={{ backgroundColor: "black" }}
                                        visible={this.state.modalVisible1}
                                        onRequestClose={() => {
                                            this.setModalVisible1(!this.state.modalVisible1)
                                        }}
                                    >
                                        <View style={{ marginTop: 22, padding: 10 }}>
                                            <View>


                                                <TouchableHighlight
                                                    onPress={() => {
                                                        this.setModalVisible1(!this.state.modalVisible1);
                                                    }}>

                                                    <MaterialCommunityIcons
                                                        name="keyboard-backspace"
                                                        size={width / 15}
                                                        color="#000"
                                                        style={{}}
                                                    />
                                                </TouchableHighlight>

                                            </View>

                                        </View>


                                        <Edit_Skill value={this.state.Edit_Skill} />
                                    </Modal>
                                </View>


                            })
                            : null
                    }

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.flatten({});
function mapStateToProps(state) {
    return {
        userID: state.authReducer.userID,
        All_Skill: state.appReducer.All_Skill
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getSkill: (userID) => {
            dispatch(getSkillAction(userID));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSkill);