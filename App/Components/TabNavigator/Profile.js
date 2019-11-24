import React, { Component } from "react";
import {
  View, Dimensions, Image, Text, ScrollView,
  ActivityIndicator, AsyncStorage, Alert, TouchableHighlight,
  Modal, TouchableOpacity, Share,
} from "react-native";
import ImagePicker from 'react-native-image-picker';
const { width, height } = Dimensions.get("window");
import { List, ListItem, Thumbnail, Left, Right, Body, Button, Badge, Icon } from "native-base";
import { connect } from "react-redux";
import { profileAction, GetUserAction, getSkillAction } from '../../Store/Actions/AppAction'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Add_Expreience from './Add_Expreience';
import Add_Skill from './Add_Skill';
import Users from "../SignIn/User";
import firebase from "react-native-firebase";
import ShowSkill from "./ShowSkill";
import Edit_Experience from "./Edit_Experience";
import AddTagLine from "./AddTagLine";
// import RNFetchBlob from 'react-native-fetch-blob';
import Manage_Profile from './Manage_Profile'
import ShowPromote from './ShowPromote'

const options = {
  title: 'Select Profile Image',
  chooseFromLibraryButtonTitle: "Choose Photo from Library",
  // takePhotoButtonTitle: null,
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class Profile extends Component {
  all_data = this.props.userDetail
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      total_users: [],
      modalVisible: false,
      modalVisible1: false,
      modalVisibleTagline: false,
      total_experience: [],
      modalVisibleEdit: false,
      modalVisibleManage: false,
      modalVisiblePromoteYourSeld: false,
      exp: '',
      Experience: '',
      TagSate: '',
      avatarSource: null,
      url: null,
      uploading: false
    };

  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerStyle: {
        backgroundColor: "#0071CE"
      },
      headerTintColor: "#fff",
      // headerLeft: (
      //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      //     {/* <Image
      //       source={require("../../../assets/Setting.png")}
      //       resizeMode="contain"
      //       style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
      //     /> */}
      //     <Icon name="menu" style={{ color: "#fff", marginLeft: 18, fontSize: width / 9 }} />
      //   </TouchableOpacity>
      // ),
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
            // onPress={navigation.getParam("selectImage")}
            style={{ marginRight: width / 33 }}
          >
            <Image
              source={require("../../../assets/Back.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
            {/* <Thumbnail
               onPress={navigation.getParam("selectImage")}
              style={{ marginLeft: 8, marginRight: -6 }}
              source={{ uri: navigation.getParam('url') }} /> */}
          </TouchableOpacity>
        </View>
      )
    };
  };


  Manage_Profile(visible) {
    this.setState({ modalVisibleManage: visible });

  }
  PromoteYourSeld(visible) {
    this.setState({ modalVisiblePromoteYourSeld: visible });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisible1(visible) {
    this.setState({ modalVisible1: visible });
  }

  setModalVisible3(visible, value, Experience) {
    this.setState({ modalVisibleEdit: visible, exp: value, Experience: Experience });
    // Alert.alert(value, "Edit experience ")
  }

  setModalVisibleTagLine(visible) {
    this.setState({ modalVisibleTagline: visible });
  }

  selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response !== null) {


        console.log('Response = ', response.uri);
        const uri = response.uri
        const user_id = this.props.userID.uid;

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          let mime = 'image/jpg';
          const urf = firebase.storage().ref(`Profile_Image/${user_id}`).child(response.fileName).put(uri, { contentType: 'image/jpeg' })
          urf.on('state_changed',
            (snapshot) => {
              // console.log(snapshot)
              this.setState({ uploading: true })
              // progrss function....
              // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              // this.setState({ progress })

            },
            (error) => {
              console.log(error);
              this.setState({ uploading: false })
              // error function ....
            },
            () => {
              // complete function...
              const user_id = this.props.userID.uid;
              firebase.storage().ref(`Profile_Image/${user_id}`).child(response.fileName).getDownloadURL().then(url => {
                this.setState({
                  url,
                  uploading: true

                })
              }).then(() => {
                const id = firebase.auth().currentUser.uid
                this.setState({
                  uploading: false
                })
                // ("Successfully Upload Profile Image")

                Alert.alert(
                  '', "Successfully Upload Profile Image",
                  [
                    { text: 'OK', onPress: () => this.updateState() },
                  ],
                  { cancelable: false },
                );
                firebase.database().ref("users").child(`${id}/userDetail`).update({
                  url: this.state.url,

                }).then(() => {
                  firebase.database().ref("users").child(`${id}/FriendList`).on('value', snapshot => {
                    let userList = snapshot.val();
                    if (userList !== null) {
                      let userListKeys = Object.keys(userList);
                      let userID = this.props.userID.uid;

                      userListKeys.map(key => {
                        firebase.database().ref('users').child(key).child(`FriendList/${userID}`).update({
                          url: this.state.url,

                        })
                      })
                    } else {

                    }

                  })
                }).then(() => {
                  let userID = this.props.userID.uid;
                  this.props.profileData(userID);
                  this.setState({
                    uploading: false
                  })


                })

              })
            })
        }

      } else {

      }

    });
  }


  async  componentDidMount() {

    // this.props.navigation.setParams({
    //   url: this.props.userDetail.url

    // });

    this.checkPermission();
    this.createNotificationListeners();


  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {  //when app is open
      const { title, body } = notification;
      console.log(title, body, "when app is open");
      console.log(notification, "when app is open");
      if (title === "Friend Request") {
        this.props.navigation.navigate("Social")
        Alert.alert(
          title, body,
          [
            { text: 'ok', onPress: () => console.log('OK Pressed') },
            // {
            //   text: 'show profile',
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
          ],
          { cancelable: false },
        );
      } else {

        // this.props.navigation.navigate("MessageList")

        Alert.alert(
          title, body,
          [
            { text: 'Reply', onPress: () => this.props.navigation.navigate("MessageList") },
            {
              text: 'later',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      }

      // this.showAlert(title, body);
      // this.props.navigation.navigate("MessageList")
    });
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);

      console.log(notificationOpen, "notificationOpen");  //undefine and when click notification tray open app but undefined



    });
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      console.log(notificationOpen, "getInitialNotification"); //when app is background
      // this.props.navigation.navigate("MessageList")
      // this.showAlert(title, body);
      // firebase.notifications().getBadge()
      // .then(count => {
      //   count--
      //   firebase.notifications().setBadge(count)
      //   console.log('decrease badge', count)
      // })
      // .then(() => {
      //   console.log('decrease badge')
      // })
      // .catch(error => {
      //   console.log('fail to count')
      // })
    }
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  showAlert(title, body) {



  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('permission fcmToken', fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log(' ', fcmToken);
        // let token = await AsyncStorage.getItem('fcmToken');
        console.log("USer Token", fcmToken);
        if (fcmToken === '') {

        } else {
          let user_id = this.props.userDetail.uid
          firebase.database().ref(`message_token/${user_id}`).set({
            messaging_token: fcmToken,
            name: this.props.userDetail.name,
            user_id: this.props.userDetail.uid
          })
        }


      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }


  async componentWillMount() {
    let userID = this.props.userID.uid;
    const id = firebase.auth().currentUser.uid;
    let dbRef = firebase.database().ref(`users/${id}/FriendList`);
    dbRef.on("child_added", val => {
      let person = val.val();
      console.log(person, "all users")
      person.phone = val.key;
      console.log(person.phone, "who user number--------------------------------")

      if (person.uid === id) {

      } else {
        console.log(person, "own user");
        this.setState(prevState => {
          return {
            total_users: [...prevState.total_users, person],

          };
        });

      }

    });

    firebase
      .database()
      .ref("users")
      .child(id)
      .child('TagLine')
      .child("post")
      .on("child_added", value => {

        this.setState({
          TagSate: value.val()
        })
      });


    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        console.log(user, "user available")
        console.log(user._auth._user._user.uid, "uid")
        await AsyncStorage.setItem('User', user._auth._user._user.uid)

        // ...
      } else {
        // ...
        console.log('errorss')
      }
    });

    this.props.GetExperience(id);
    this.props.getSkill(id)
    this.props.profileData(id)





  }


  updateState = () => {
    let userID = this.props.userID.uid;
    const id = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref("users")
      .child(userID)
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
      .child(id)
      .child('TagLine')
      .child("post")
      .on("child_added", value => {

        this.setState({
          TagSate: value.val()
        })
      });
    this.props.profileData(userID);
    this.props.GetExperience(userID);
    this.props.getSkill(userID)
  }


  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `I would like to connect with you on Vizkard`,
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

    const  userDetail = this.all_data
    return (
      <ScrollView
        contentContainerStyle={{
          // height: height,
          width
        }}
        style={{ backgroundColor: "#fff" }}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View
            style={{ flex: 0.2, backgroundColor: "#0071CE", }} >
            <View style={{ flex: 0.5, marginTop: width / 20, }}  >
              <List style={{ marginTop: width / 25 }}>
                <ListItem noBorder thumbnail>
                  <Left>
                    <TouchableOpacity onPress={this.selectImage}>

                      <Thumbnail
                        style={{ borderRadius: 30 / 4 }} large
                        square
                        source={{ uri: userDetail.url }} />

                    </TouchableOpacity>

                  </Left>
                  <Body>
                    <Text style={{ fontSize: width / 20, color: "#fff", fontWeight: "bold" }}>
                      Say hi to add your tagline
                    </Text>
                  </Body>
                </ListItem>
                <Text style={{ fontSize: width / 50, color: "#fff", fontStyle: "italic", paddingLeft: 15 }}>
                  Add or change profile image
                    </Text>
              </List>

            </View>


          </View>
          <View style={{ flex: 0.8, backgroundColor: "#fff", }}>
            <View style={{ flex: 1, backgroundColor: "#fff", }}>
              <List >
                <ListItem thumbnail noBorder >
                  <Body>
                    <Text style={{ fontSize: width / 20, }}>{userDetail.name}</Text>
                    <Text note numberOfLines={1}> {userDetail.occupation} {userDetail.company} </Text>
                    <Text note numberOfLines={1}> {userDetail.email}   {userDetail.phoneNumber} </Text>
                    <Text note numberOfLines={1}> {userDetail.address}   {userDetail.city}  </Text>
                    <Text note numberOfLines={1}> {userDetail.website} </Text>
                  </Body>
                </ListItem>
              </List>

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
                    onPress={() => this.Manage_Profile(true)}
                  >
                    <Text onPress={() => this.Manage_Profile(true)}>Edit Profile</Text>
                  </Button>

                  <Modal
                    animationType='slide'
                    transparent={false}
                    style={{ backgroundColor: "black" }}
                    visible={this.state.modalVisibleManage}
                    onRequestClose={() => {
                      this.Manage_Profile(!this.state.modalVisibleManage)
                      console.log("cancel")
                    }}
                  >
                    <View style={{ marginTop: 22, padding: 10 }}>
                      <View>
                        <TouchableHighlight
                          onPress={() => {
                            this.Manage_Profile(!this.state.modalVisibleManage);
                          }}
                        >

                          <MaterialCommunityIcons
                            name="keyboard-backspace"
                            size={width / 15}
                            color="#000"
                            style={{}}
                          />
                        </TouchableHighlight>
                      </View>
                    </View>
                    <Manage_Profile />
                  </Modal>

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
                    onPress={this.onShare}>
                    <Text onPress={this.onShare} >Share</Text>
                  </Button>
                </View>
              </View>
              <List style={{ paddingTop: 20 }}>
                <ListItem itemDivider >
                  <Text onPress={() => this.setModalVisibleTagLine(true)} style={{ fontWeight: 'bold' }}>Add Tag line +</Text>
                </ListItem>
                <Modal
                  animationType='slide'
                  transparent={false}
                  style={{ backgroundColor: "black" }}
                  visible={this.state.modalVisibleTagline}
                  onRequestClose={() => {
                    this.setModalVisibleTagLine(!this.state.modalVisibleTagline)
                  }}
                >
                  <View style={{ marginTop: 22, padding: 10 }}>
                    <View>


                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisibleTagLine(!this.state.modalVisibleTagline);
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
                  <AddTagLine value={this.state.TagSate} />

                </Modal>
                <ListItem>
                  {
                    (this.state.TagSate !== null) ?
                      <Text>{this.state.TagSate}</Text>

                      : <Text style={{ fontWeight: "normal", color: "#000" }}>No Tag Line Found</Text>
                  }
                </ListItem>
                <ListItem itemDivider >
                  <Text style={{ fontWeight: 'bold' }} onPress={() => { this.setModalVisible1(true); }}>
                    Add Skill +
                    </Text>
                </ListItem>
                <Modal
                  animationType="slide"
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
                  <Add_Skill />

                </Modal>
                <ShowSkill />

                <ListItem itemDivider>
                  <Text style={{ fontWeight: 'bold' }} onPress={() => { this.setModalVisible(true); }}>Add Experience +</Text>
                </ListItem>
                <Modal
                  animationType='slide'
                  transparent={false}
                  style={{ backgroundColor: "black" }}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}
                >
                  <View style={{ marginTop: 22, padding: 10 }}>
                    <View>


                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
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
                  <Add_Expreience />

                </Modal>

                {
                  (this.props.All_Experience !== null) ?
                    this.props.All_Experience.map((value, id) => {
                      return <View key={id} >
                        <List>
                          <ListItem>
                            <Text

                              onPress={() => {
                                this.setModalVisible3(true, value.Company, value.Experience);
                              }}
                              style={{
                                color: "#000",
                                fontWeight: "normal"
                              }}
                            >
                              {value.Company}: {value.Experience}
                            </Text>
                          </ListItem>
                        </List>



                        <Modal
                          animationType='fade'
                          transparent={false}
                          style={{ backgroundColor: "black" }}
                          visible={this.state.modalVisibleEdit}
                          onRequestClose={() => {
                            this.setModalVisible3(!this.state.modalVisibleEdit)
                            console.log("cancel")
                          }}
                        >
                          <View style={{ marginTop: 22, padding: 10 }}>
                            <View>
                              <TouchableHighlight
                                onPress={() => {
                                  this.setModalVisible3(!this.state.modalVisibleEdit);
                                }}
                              >

                                <MaterialCommunityIcons
                                  name="keyboard-backspace"
                                  size={width / 15}
                                  color="#000"
                                  style={{}}
                                />
                              </TouchableHighlight>
                            </View>
                          </View>
                          <Edit_Experience name={this.state.exp} Experience={this.state.Experience} />
                        </Modal>

                      </View>

                    })
                    : <Text

                      style={{
                        fontSize: width / 30,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10

                      }}>No Work Experience Found please add
                  </Text>
                }
              </List>

            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
function mapStateToProps(state) {

  console.log(state.appReducer.All_Skill, "state.appReducer.User_Skills");
  return {
    userID: state.authReducer.userID, //as object
    userDetail: state.appReducer.userDetail,
    phoneNumber: state.authReducer.phoneNumber,
    User_Experience: state.appReducer.User_Experience,
    All_Experience: state.appReducer.All_Experience,
    All_Skill: state.appReducer.All_Skill,
    getTextDetected: state.authReducer.getTextDetected


  };
}
function mapDispatchToProps(dispatch) {
  return {
    profileData: (userID) => {
      dispatch(profileAction(userID));
    },
    GetExperience: (userID) => {
      dispatch(GetUserAction(userID))
    },
    getSkill: (userID) => {
      dispatch(getSkillAction(userID));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
