import React, { Component } from "react";
import { View, Dimensions, Image, Text, ScrollView, TouchableOpacity, Alert, AsyncStorage, } from "react-native";
const { width, height } = Dimensions.get("window");
import { Item, Input, Content, Fab, Button, Icon, List, ListItem, Thumbnail, Left, Body, Right, } from "native-base";
import { connect } from "react-redux";
import { friendRequestAction, FriendRequestList, acceptRequestAction, declineRequestAction } from '../../Store/Actions/AppAction';
import { Linking } from 'react-native'

import firebase from "react-native-firebase";
class PublicProfileDetail extends Component {
    constructor(props) {
        // console.log("llll", props.user, 'lllll ')
        super(props);
        this.state = {

            active: false,
            isFriend: false,
            name: '',
            userId: null,
            status: {},
            Request_Status: {},
            AcceptID: "",
            users: [],
            phone: [],
            MobileNumber: "",
            Detail: {},
            total_experience: [],
            total_Skills: [],
            total_Friends: [],
            TagSate: null,
            hide_skill: null,
            hide_experience: null,
            hide_city: null,
            hide_phone: null,
            hide_profession: null,





        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Contacts",
            headerStyle: {
                backgroundColor: "#0071CE"
            },
            headerTintColor: "#fff",
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    {/* <Image
                        source={require("../../../assets/Setting.png")}
                        resizeMode="contain"
                        style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
                    /> */}
                    <Icon name="menu" style={{ color: "#fff", marginLeft: 18, fontSize: width / 9 }} />
                </TouchableOpacity>
            ),
            headerTitleStyle: {
                // textAlign: "center",
                flex: 1,
                marginLeft: 12
            },
            headerRight: (
                <View style={{ flexDirection: "row" }}>
                    {/* <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginRight: width / 28 }}
                    >
                        <Image
                            source={require("../../../assets/groupChat.png")}
                            resizeMode="contain"
                            style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
                        />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginRight: width / 28 }}
                    >
                        <Image
                            source={require("../../../assets/Back.png")}
                            resizeMode="contain"
                            style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
                        />
                    </TouchableOpacity>
                </View>
            )
        };
    };

    async componentWillUnmount() {
        this.props.navigation.setParams({
            detailUser: null
        })
    }

    async componentWillMount() {
        let userPhone = await AsyncStorage.getItem('user')
        let dbRef = firebase.database().ref(`users/${userPhone}/FriendList`);
        dbRef.on("child_added", async val => {
            let person = val.val();
            // console.log(person, "all users")
            person.phone = val.key;
            // console.log(person.phone, "who user number--------------------------------")

            if (person.phone === userPhone) {

            } else {
                // console.log(person, "own user");
                this.setState(prevState => {
                    return {
                        users: [...prevState.users, person],
                        phone: [...prevState.phone, person.phoneNumber],

                    };
                });
                this.props.GETUSERRequest(this.state.users);
            }

        });
        const Curr = this.props.userID.uid;
        let userInfo = firebase.database().ref(`users/${Curr}/userDetail`);
        userInfo.on("value", val => {
            let Detail = val.val();
            this.setState({
                Detail: Detail
            })
        })


        const CurrUser = this.props.userID.uid;
        let userDetail = this.props.navigation.getParam('detailUser');
        let user_uid = userDetail.uid;
        let request = firebase.database().ref(`Friend Request/${CurrUser}/${user_uid}`);
        request.on("child_added", val => {
            let status = val.val();
            this.setState({
                status: status
            })

        });

        firebase
            .database()
            .ref("users")
            .child(user_uid)
            .child('Experience')
            .on("child_added", value => {

                this.setState(prevState => {
                    return {
                        total_experience: [...prevState.total_experience, value.val()]
                    };
                });
            });

        firebase
            .database()
            .ref("users")
            .child(user_uid)
            .child('Skills')
            .on("child_added", value => {

                this.setState(prevState => {
                    return {
                        total_Skills: [...prevState.total_Skills, value.val()]
                    };
                });
            });

        firebase
            .database()
            .ref("users")
            .child(user_uid)
            .child('FriendList')
            .on("child_added", value => {

                this.setState(prevState => {
                    return {
                        total_Friends: [...prevState.total_Friends, value.val()]
                    };
                });
            });

        firebase
            .database()
            .ref("users")
            .child(user_uid)
            .child('TagLine')
            .child("post")
            .on("child_added", value => {
                this.setState({
                    TagSate: value.val()
                })
            });

        // let userDetail = this.props.navigation.getParam('detailUser');
        let user = userDetail.uid
        firebase
            .database()
            .ref("user_privacy")
            .child(user_uid)
            .on("child_added", value => {
                this.setState({
                    hide_skill: value.val()
                })
                console.log(value, "value")
            });
        firebase
            .database()
            .ref("user_experience_hide")
            .child(user_uid)
            .on("child_added", value => {
                this.setState({
                    hide_experience: value.val()
                })
                console.log(value, "value")
            });

        firebase
            .database()
            .ref("privacy/hide_city")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    hide_city: value.val()
                })
                console.log(value, "value")
            });
        firebase
            .database()
            .ref("privacy/hide_phone")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    hide_phone: value.val()
                })
                console.log(value, "value")
            });
        firebase
            .database()
            .ref("privacy/hide_profession")
            .child(user)
            .on("child_added", value => {
                this.setState({
                    hide_profession: value.val()
                })
                console.log(value, "value")
            });
    }
    update_State = () => {
        const CurrUser = this.props.userID.uid;
        let userDetail = this.props.navigation.getParam('detailUser');
        let user_uid = userDetail.uid;
        let request = firebase.database().ref(`Friend Request/${CurrUser}/${user_uid}`);
        request.on("child_added", val => {
            let status = val.val();
            this.setState({
                status: status
            })

        });
    }


    componentDidMount() {
        this.update_State();

    }
    async sendFriendRequest(userDetail) {
        let userPhone = await AsyncStorage.getItem('user');
        Alert.alert("", `Sent Friend Request to ${userDetail.name}`)
        this.setState({
            isFriend: true,
            AcceptID: userDetail.phoneNumber
        });
        if (userDetail.name !== "") {
            this.setState({
                name: userDetail.name,
                userId: userDetail.uid
            })
        }
        const CurrUser = this.props.userID.uid
        const friendUid = userDetail.uid
        this.props.sendFriendRequestAction(userDetail, CurrUser, friendUid);
    }

    AcceptRequest(userDetail) {
        const CurrUser = this.props.userID.uid;
        const friendUid = userDetail.uid;
        const Current_User_Detail = this.state.Detail
        this.props.Accept_Request_Action(userDetail, Current_User_Detail, CurrUser, friendUid)


    }

    DeclineRequest(userDetail) {

        const CurrUser = this.props.userID.uid;
        const friendUid = userDetail.uid;
        const Current_User_Detail = this.state.Detail
        this.props.Decline_Request_Action(userDetail, Current_User_Detail, CurrUser, friendUid, this.state.status)
        Alert.alert("You Successfully Decilne Friend Request");


    }
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    render() {
        let userDetail = this.props.navigation.getParam('detailUser');
        return (
            <ScrollView
                contentContainerStyle={{
                    // height: height / -20,
                    // backgroundColor: "red",
                    width
                }}
                style={{ backgroundColor: "#fff" }}>
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <View
                        style={{ flex: 0.2, backgroundColor: "#0071CE", }}  >
                        <View
                            style={{
                                flex: 0.5,
                                marginTop: width / 20,
                                paddingBottom:10
                            }}
                        >
                            <List style={{}}>
                                <ListItem noBorder thumbnail>
                                    <Left>

                                        <Thumbnail
                                            style={{ borderRadius: 30 / 4 }} large
                                            square source={{ uri: userDetail.url }} />

                                    </Left>
                                    <Body>
                                        <Text style={{ fontSize: width / 20, color: "#fff", fontWeight: "bold" }}>
                                            Say hi to add your tagline
                                        </Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>
                    </View>
                    <View style={{ flex: 0.8, backgroundColor: "#fff", }}>
                        <View
                            style={{ flex: 1, backgroundColor: "#fff", }}>
                            <List style={{}}>
                                <ListItem noBorder thumbnail>

                                    <Body>
                                        <Text style={{ fontSize: width / 20, }}>{userDetail.name}</Text>
                                        <Text note numberOfLines={1}> {
                                            this.state.hide_profession === true ?
                                                'profession hide from user' :
                                                userDetail.occupation}/{userDetail.company} </Text>
                                        <Text note numberOfLines={1}> {userDetail.email} - {
                                            this.state.hide_phone === true ?
                                                'Phone no. hide from user' :
                                                userDetail.phoneNumber} </Text>
                                        <Text note numberOfLines={1}> {userDetail.address} - {
                                            this.state.hide_city === true ?
                                                'City hide from user' :
                                                userDetail.city}  </Text>
                                        <Text note numberOfLines={1}> {userDetail.website} </Text>
                                    </Body>

                                </ListItem>
                            </List>
                            {
                                (this.state.status.status === "send request") ?

                                    <View style={{
                                        flex: 0.5,
                                        backgroundColor: "#fff",
                                        textAlign: "center",
                                        alignItems: "center",
                                        justifyContent: 'center',
                                        paddingTop: 5
                                    }}>
                                        <Button rounded light style={{
                                            textAlign: "center",
                                            alignItems: "center",
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            width: '80%',
                                            borderColor: "#A9B3B6",
                                            borderWidth: 0.5

                                        }}>
                                            <Text>Sent Request</Text>
                                        </Button>
                                    </View>
                                    : (this.state.status.to === userDetail.uid) ?
                                        <View style={{ backgroundColor: "#fff" }}>
                                            <View style={{
                                                flex: 0.5, marginTop: 10, backgroundColor: "#fff",
                                                flexDirection: "row", paddingTop: 10, paddingBottom: width / 5,
                                                textAlign: "center",
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }}>

                                                <View style={{
                                                    flex: 0.5,
                                                    backgroundColor: "#fff",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: 'center',
                                                    paddingTop: 5
                                                }}>

                                                    <Button rounded light style={{
                                                        textAlign: "center",
                                                        alignItems: "center",
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        width: '80%',
                                                        borderColor: "#A9B3B6",
                                                        borderWidth: 0.5

                                                    }}
                                                        onPress={this.AcceptRequest.bind(this, userDetail)}>
                                                        <Text>Accept</Text>
                                                    </Button>

                                                </View>
                                                <View style={{
                                                    flex: 0.5,
                                                    backgroundColor: "#fff",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: 'center',
                                                    paddingTop: 5
                                                }}>

                                                    <Button rounded light style={{
                                                        textAlign: "center",
                                                        alignItems: "center",
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        width: '80%',
                                                        borderColor: "#A9B3B6",
                                                        borderWidth: 0.5

                                                    }}
                                                        onPress={this.DeclineRequest.bind(this, userDetail)}  >
                                                        <Text>Decline</Text>
                                                    </Button>
                                                </View>

                                            </View>
                                            <View
                                                style={{
                                                    flex: 0.3,
                                                    backgroundColor: "#fff",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: 'center',
                                                }}>
                                                <Text style={{ fontSize: width / 20, }}>Hi, I would like to add you on Vizkard</Text>
                                            </View>
                                        </View>
                                        : (this.state.status === 'yes') ?
                                            <View style={{
                                                flex: 0.5, marginTop: 10, backgroundColor: "#fff",
                                                flexDirection: "row", paddingTop: 10,
                                                textAlign: "center",
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }}>
                                                <View style={{
                                                    flex: 0.5,
                                                    backgroundColor: "#fff",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: 'center',
                                                    paddingTop: 5
                                                }}>


                                                    <Button rounded light style={{
                                                        textAlign: "center",
                                                        alignItems: "center",
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        width: '80%',
                                                        borderColor: "#A9B3B6",
                                                        borderWidth: 0.5,



                                                    }}
                                                        onPress={() =>
                                                            this.props.navigation.navigate("ChatScreen", userDetail)
                                                        }>
                                                        <Text>Message</Text>
                                                    </Button>

                                                </View>
                                                <View style={{
                                                    flex: 0.5,
                                                    backgroundColor: "#fff",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: 'center',
                                                    paddingTop: 5
                                                }}>


                                                    <Button rounded light style={{
                                                        textAlign: "center",
                                                        alignItems: "center",
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        width: '80%',
                                                        borderColor: "#A9B3B6",
                                                        borderWidth: 0.5

                                                    }}
                                                        // onPress={this.onShare}
                                                        onPress={() => Linking.openURL(`mailto:${userDetail.email}?subject=&body=`)}
                                                    >
                                                        <Text>Email</Text>
                                                    </Button>

                                                </View>
                                                <View style={{
                                                    flex: 0.5,
                                                    backgroundColor: "#fff",
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    justifyContent: 'center',
                                                    paddingTop: 5
                                                }}>


                                                    <Button rounded light style={{
                                                        textAlign: "center",
                                                        alignItems: "center",
                                                        alignSelf: 'center',
                                                        justifyContent: 'center',
                                                        width: '80%',
                                                        borderColor: "#A9B3B6",
                                                        borderWidth: 0.5

                                                    }}
                                                        onPress={() => Linking.openURL(`tel:${userDetail.phoneNumber}`)}>
                                                        <Text>Call</Text>
                                                    </Button>


                                                </View>

                                            </View>

                                            :
                                            <View style={{
                                                flex: 0.5,
                                                backgroundColor: "#fff",
                                                textAlign: "center",
                                                alignItems: "center",
                                                justifyContent: 'center',
                                                paddingTop: 5
                                            }}>
                                                <Button rounded light style={{
                                                    textAlign: "center",
                                                    alignItems: "center",
                                                    alignSelf: 'center',
                                                    justifyContent: 'center',
                                                    width: '80%',
                                                    borderColor: "#A9B3B6",
                                                    borderWidth: 0.5

                                                }}
                                                    onPress={this.sendFriendRequest.bind(this, userDetail)} >
                                                    <Text onPress={this.sendFriendRequest.bind(this, userDetail)}>Add Friend</Text>
                                                </Button>
                                            </View>
                            }

                            {
                                (this.state.status === 'yes') ?
                                    <List style={{ paddingTop: 20 }}>
                                        <ListItem itemDivider >
                                            <Text style={{ fontWeight: 'bold' }}>Tag line</Text>
                                        </ListItem>
                                        <ListItem>
                                            {
                                                (this.state.TagSate !== null) ?
                                                    <Text>{this.state.TagSate}</Text>

                                                    : <Text>No Tag Line Found</Text>
                                            }

                                        </ListItem>

                                        <ListItem itemDivider >
                                            <Text style={{ fontWeight: 'bold' }}>Skills</Text>
                                        </ListItem>

                                        {
                                            this.state.hide_skill === true ?
                                                <ListItem>
                                                    <Text>
                                                        Hide from user
                                        </Text>
                                                </ListItem>
                                                :
                                                (this.state.status === "yes") ?
                                                    this.state.total_Skills.slice(0).reverse().map((value, id) => {
                                                        return <ListItem key={id}>
                                                            <Text>
                                                                {value.Skill}
                                                            </Text>
                                                        </ListItem>
                                                    })
                                                    : null

                                        }


                                        <ListItem itemDivider>
                                            <Text style={{ fontWeight: 'bold' }}>Experience</Text>
                                        </ListItem>
                                        {
                                            this.state.hide_experience === true ?
                                                <ListItem>
                                                    <Text>
                                                        Hide from user
                                        </Text>
                                                </ListItem>

                                                : this.state.total_experience.slice(0).reverse().map((value, id) => {
                                                    return <ListItem key={id}>

                                                        <Text>
                                                            {value.Company}: {value.Experience}
                                                        </Text>
                                                    </ListItem>

                                                })
                                        }
                                    </List>
                                    : null
                            }
                        </View>



                    </View>

                </View>
            </ScrollView>

        );
    }
}



function mapStateToProps(state) {
    // console.log(state.authReducer.FriendReqUser, ";;")
    return {
        userID: state.authReducer.userID,
        phoneNumber: state.authReducer.phoneNumber,
        FriendReqUser: state.authReducer.FriendReqUser

    }
}
function mapDispatchToProps(dispatch) {
    return {


        sendFriendRequestAction: (payload, CurrUser, friendUid) => {
            dispatch(friendRequestAction(payload, CurrUser, friendUid));
        },
        GETUSERRequest: (payload) => {
            dispatch(FriendRequestList(payload));
        },
        Accept_Request_Action: (payload, Current_User_Detail, CurrUser, friendUid) => {
            dispatch(acceptRequestAction(payload, Current_User_Detail, CurrUser, friendUid));
        },
        Decline_Request_Action: (payload, Current_User_Detail, CurrUser, friendUid, status) => {
            dispatch(declineRequestAction(payload, Current_User_Detail, CurrUser, friendUid, status));
        },


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicProfileDetail);
