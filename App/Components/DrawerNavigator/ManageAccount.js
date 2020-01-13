import React, { Component } from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Button, Header, Left, Body, Right, Title, Icon, ListItem, Switch } from "native-base";
const { height, width } = Dimensions.get('window');
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from 'react-native-vector-icons/AntDesign'
import firebase from "react-native-firebase";



export default class ManageAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide_skill: false,
            skill_hide_value: null,
            hide_experience: false,
            experience_hide_value: null,
            hide_phone: false,
            hide_phone_value: null,
            hide_city_value: null,
            hide_city: false,
            hide_pro_value: null,
            hide_profession: false
        }
    }
    static navigationOptions = {
        headerTitle: "Manage Account",
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="account" size={25} style={{ color: '#0071ce' }} />
        ),
        title: "Manage Account",
        headerStyle: {
            backgroundColor: "#8b6e4b"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            flex: 1,
            marginLeft: -10
        }
    }

    componentDidMount() {
        const user = firebase.auth().currentUser.uid
        firebase
            .database()
            .ref("user_privacy")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    skill_hide_value: value.val()
                })
            });

        firebase
            .database()
            .ref("user_experience_hide")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    experience_hide_value: value.val(),
                });
            });
        firebase
            .database()
            .ref("privacy/hide_phone")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    hide_phone_value: value.val(),
                });
            });

        firebase
            .database()
            .ref("privacy/hide_city")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    hide_city_value: value.val(),
                })
            });
        firebase
            .database()
            .ref("privacy/hide_profession")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    hide_pro_value: value.val(),
                })
            });
    }

    onSkill_hide = () => {
        if (this.state.skill_hide_value === null) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("user_privacy").child(user_id).set({
                hide_skill: true
            });
            this.setState({
                skill_hide_value: true
            })

        } else if (this.state.skill_hide_value === true) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("user_privacy").child(user_id).set({
                hide_skill: false
            });
            this.setState({
                skill_hide_value: false
            })
        } else if (this.state.skill_hide_value === false) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("user_privacy").child(user_id).set({
                hide_skill: true
            });
            this.setState({
                skill_hide_value: true
            })
        }
    }

    onExperience_hide = () => {
        if (this.state.experience_hide_value === null) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("user_experience_hide").child(user_id).set({
                hide_experience: true
            });
            this.setState({
                experience_hide_value: true,
            })
        } else if (this.state.experience_hide_value === true) {

            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("user_experience_hide").child(user_id).set({

                hide_experience: false
            });
            this.setState({
                experience_hide_value: false,

            })
        } else if (this.state.experience_hide_value === false) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("user_experience_hide").child(user_id).set({

                hide_experience: true
            });
            this.setState({
                experience_hide_value: true,
            })
        }
    }

    onPhone_hide = () => {
        if (this.state.hide_phone_value === null) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_phone").child(user_id).set({
                hide_phone: true
            });
            this.setState({
                hide_phone_value: true,
            })
        } else if (this.state.hide_phone_value === true) {

            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_phone").child(user_id).set({

                hide_phone: false
            });
            this.setState({
                hide_phone_value: false,

            })
        } else if (this.state.hide_phone_value === false) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_phone").child(user_id).set({

                hide_phone: true
            });
            this.setState({
                hide_phone_value: true,

            })
        }

    }

    onCity_hide = () => {
        if (this.state.hide_city_value === null) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_city").child(user_id).set({

                hide_city: true
            });
            this.setState({
                hide_city_value: true,

            })
        } else if (this.state.hide_city_value === true) {

            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_city").child(user_id).set({

                hide_city: false
            });
            this.setState({
                hide_city_value: false,

            })
        } else if (this.state.hide_city_value === false) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_city").child(user_id).set({

                hide_city: true
            });
            this.setState({
                hide_city_value: true,

            })
        }

    }

    onProfession_hide = () => {
        if (this.state.hide_pro_value === null) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_profession").child(user_id).set({

                hide_profession: true
            });
            this.setState({
                hide_pro_value: true,

            })
        } else if (this.state.hide_pro_value === true) {

            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_profession").child(user_id).set({

                hide_profession: false
            });
            this.setState({
                hide_pro_value: false,

            })
        } else if (this.state.hide_pro_value === false) {
            let user_id = firebase.auth().currentUser.uid
            firebase.database().ref("privacy/hide_profession").child(user_id).set({

                hide_profession: true
            });
            this.setState({
                hide_pro_value: true,

            })
        }
    }


    render() {
        return (

            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header
                    style={{ backgroundColor: '#0071CE' }}
                    androidStatusBarColor="#0071CE">
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                            <Icon name="arrow-back" style={{ color: "#fff", marginLeft: 10 }} />
                        </TouchableOpacity>

                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title
                            style={{ alignSelf: "center", }}

                        >Manage Account</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {/* <Icon name='menu' /> */}
                    </Right>

                </Header>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }} >
                        <Image
                            source={require("../../../assets/logo.png")}
                            style={{
                                width: width / 2,
                                height: height / 2,
                                // marginTop: 20,
                                resizeMode: "contain"
                                // color:'rgba(208, 164, 135, 1)'
                            }}
                        />
                    </View>
                    <View style={{ flex: 0.5, }} >


                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#0071CE" }}>
                                    <AntDesign active name="circledowno" style={{ color: "#fff" }} size={width / 20} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Hide you all skills</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.skill_hide_value} onValueChange={this.onSkill_hide}
                                />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#0071CE" }}>
                                    <MaterialCommunityIcons active name="briefcase-outline" style={{ color: "#fff" }} size={width / 20} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Hide your all experience</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.experience_hide_value}
                                    onValueChange={this.onExperience_hide} />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#0071CE" }}>
                                    <MaterialCommunityIcons active name="cellphone-lock" style={{ color: "#fff" }} size={width / 20} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Hide your phone number</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.hide_phone_value}
                                    onValueChange={this.onPhone_hide}
                                />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#0071CE" }}>
                                    <MaterialCommunityIcons active name="flag-remove" style={{ color: "#fff" }} size={width / 20} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Hide your city name</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.hide_city_value}
                                    onValueChange={this.onCity_hide}
                                />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#0071CE" }}>
                                    <MaterialCommunityIcons active name="professional-hexagon" style={{ color: "#fff" }} size={width / 20} />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Hide your profession</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.hide_pro_value}
                                    onValueChange={this.onProfession_hide}
                                />
                            </Right>
                        </ListItem>
                    </View>
                </View>
            </View>
        )
    }
}

