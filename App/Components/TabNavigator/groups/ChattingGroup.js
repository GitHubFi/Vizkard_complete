import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,

} from "react-native";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Thumbnail } from 'native-base'
const { height, width } = Dimensions.get("window");
import { connect } from 'react-redux';
import { All_Message_Action1 } from '../../../Store/Actions/AppAction';
import firebase from "react-native-firebase";


const message_list = [
  {
    from: 'uid',
    message: 'hi hello'
  },
  {
    from: 'uid',
    message: 'hello i am new'
  }
]
export default class ChattingGroup extends Component {
  All_Message = []
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: props.navigation.state.params.name,
        // phone: props.navigation.state.params.uid,
        // Email: props.navigation.state.params.email,
        // url: props.navigation.state.params.url
      },
      textMessage: "",
      messageList: [],
      sender_uid: '',
      userName: "",
      isConnect: false,
      group_name: '',
      sender_detail: {}
      // monthToStart: ''
    };
    // this.onEndReachedCalledDuringMomentum = true;

  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: params.name,
      headerStyle: {
        backgroundColor: "#0071CE"
      },
      headerTintColor: "#fff",
      headerLeft: (
        // <Ionicons
        //   name="ios-person"
        //   size={width / 14}
        //   color="#fff"
        //   style={{ marginLeft: 15 }}
        // />
        // <Thumbnail
        //   size={width / 14}
        //   // square
        //   small
        //   style={{ marginLeft: 15, borderRadius: 30 / 4 }}
        //   source={{ uri: 'https://assets.rebelcircus.com/blog/wp-content/uploads/2016/05/facebook-avatar.jpg' }} />
        <View style={styles.ThumbnailStyle}>
          <Text style={styles.groupName}>{params.group_name.substring(0, 2).toUpperCase()}</Text>
        </View>
      ),
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
              source={require("../../../../assets/Back.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerTitleStyle: {
        // textAlign: "center",
        flex: 1,
        marginLeft: 10
      }
    };
  };


  componentWillMount() {
    const name = this.props.navigation.state.params.group_name;
    const group_creator_uid = this.props.navigation.state.params.group_creator_uid;
    const sender_uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("group_chatting")
      .child(name)
      .child(group_creator_uid)
      .on("value", snapshot => {
        let user = snapshot.val();
        if (user !== null) {
          let All_message = Object.values(user);
          this.All_Message = [...All_message];
          this.setState({
            messageList: [... this.All_Message.reverse()]
          })
        } else {

        }
      });
    this.setState({ sender_uid: sender_uid })

  }

  componentDidMount() {
    // this.check_internet()
    let groupName = this.props.navigation.state.params.group_name
    let user_info = this.props.navigation.state.params.group_member
    const sender_uid = firebase.auth().currentUser.uid
    user_info.forEach(element => {
      if (this.state.sender_uid === element.user_uid) {
        this.setState({
          sender_detail: element,
          user_name: element.name // user name
        })
      }
    });
    this.setState({
      group_name: groupName
    });
  }

  convertDate = time => {
    var timestamp = time.toString().substring(0, 10)
    const date = new Date(timestamp * 1000)
    datevalues = [
      currentDate = date.getDate(),
      currentMonth = date.getMonth() + 1,
      currentyear = date.getFullYear(),
    ]


    // console.log("CURRENT DATE", date)
    return datevalues[0] + "/" + datevalues[1] + "/" + datevalues[2];
  }
  convertTime = time => {
    let d = new Date(time);

    let c = new Date();
    let result = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":";
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();



    // if (c.getDay() !== d.getDay()) {
    //     result = d.getDay() + "" + d.getMonth() + "" + result;
    // }
    return result;

  };
  sendMessage = async () => {
    if (this.state.isConnect === true) {
      ToastAndroid.show("check internet connection", ToastAndroid.CENTER);
      this.check_internet();
    } else {
      // let email = this.props.userDetail.email;
      // let SenderName = this.props.userDetail.name
      //group_member: array => object user_id 

      if (this.state.textMessage.length > 0) {
        const group_detail = this.props.navigation.state.params.group_member;
        const userID = this.props.navigation.state.params.group_creator_uid;
        const group_name = this.props.navigation.state.params.group_name;
        const sender_uid = firebase.auth().currentUser.uid

        let msgId = firebase
          .database()
          .ref("group_chatting")
          .child(group_name)
          .child(userID)
          .push().key;

        let updates = {};
        let message = {
          message: this.state.textMessage,
          time: firebase.database.ServerValue.TIMESTAMP,
          from: sender_uid,
          Sender_name: this.state.user_name,
        };
        updates[
          `group_chatting/${group_name}/${userID}/${msgId}`
        ] = message;

        firebase.database().ref().update(updates);
        this.setState({ textMessage: "" });

        firebase.database().ref('group_notification').child(sender_uid).push({
          message: this.state.textMessage,
          time: firebase.database.ServerValue.TIMESTAMP,
          from: sender_uid,
          Sender_name: this.state.user_name,
          group_name: group_name,
          group_member: group_detail.map((item) =>item.user_uid )
        });

      }
    }
  };

  renderRow = ({ item }) => {
    return (
      <TouchableWithoutFeedback
      // onLongPress={() => this.someHandlerFunction(item)}
      >
        <View
          style={{
            // flexDirection: "row",
            width: "90%",
            alignSelf: item.from === this.state.sender_uid ? "flex-end" : "flex-start",
            backgroundColor: item.from === this.state.sender_uid ? "#2967cc" : "#e1e2e3",
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          {
            (item.message === "you deleted this message") ?

              <Text
                style={{
                  //color: "#fff",
                  color: item.from === this.state.sender_uid ? "#fff" : "#000",
                  padding: 12,
                  paddingBottom: 10,
                  fontSize: 16,
                  fontStyle: 'italic'
                  // alignItems: "flex-start"
                }}
              >
                <Octicons
                  name="circle-slash"
                  size={width / 20}

                  color="#fff"
                  style={{
                    marginLeft: 15, marginTop: 15, marginTop: 10,
                    color: item.from === this.props.userID.uid ? "#fff" : "#000",
                  }}
                /> {item.message}

              </Text>
              : <View>
                <Text
                  style={{
                    paddingLeft: 5,
                    color: item.from === this.state.sender_uid ? "#fff" : "#000",
                    fontStyle: 'italic'
                  }}>{item.from === this.state.sender_uid ? '' : item.Sender_name}</Text>
                <Text
                  style={{
                    //color: "#fff",
                    color: item.from === this.state.sender_uid ? "#fff" : "#000",
                    padding: 10,
                    fontSize: 16,
                    // fontStyle: 'italic'
                    // alignItems: "flex-start"
                  }}
                >
                  {item.message}
                </Text></View>
          }
          <Text
            style={{
              color: item.from === this.state.sender_uid ? "#fff" : "#000",
              padding: 5,
              fontSize: 12,
              alignItems: "center",
              justifyContent: 'center',
              alignSelf: 'flex-end',
              textAlign: "center"
            }}
          >
            {this.convertTime(item.time)} {"  "}

            <Text
              style={{
                color: item.from === this.state.sender_uid ? "#fff" : "#000",
                padding: 5,
                fontSize: 12,
                alignItems: "center",
                justifyContent: 'center',
                alignSelf: 'flex-end',
                textAlign: "center"
              }}
            >

              {this.convertDate(
                item.time
              )}
            </Text>
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {

    // console.log([...this.All_Message], 'bhaibhai')
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
        {
          this.state.isConnect === true ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner color='blue' />
              <MaterialCommunityIcons name='reload' spin color="blue" size={width / 15} style={{ marginTop: 60, }} onPress={() => this.check_internet()} />
              <Text style={{}}>No internet connection Try again</Text>
            </View>
            // : null
            : <FlatList
              // ref={ref => (this.flatList = ref)}
              ref={(ref) => { this.myFlatListRef = ref }}
              style={{ padding: 10, height: height * 0.6 }}
              data={this.state.messageList}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}
              initialNumToRender={this.state.messageList.length}
              onContentSizeChange={() => { this.myFlatListRef.scrollToEnd({ animated: true }) }}
              onLayout={() => { this.myFlatListRef.scrollToEnd({ animated: true }) }}
            />
        }
        <View style={{
          padding: 5,
          margin: 0
        }}>
          <KeyboardAvoidingView behavior="padding">
            <View style={{
              flexDirection: 'row',
              backgroundColor: '#eee',
            }}>
              <TextInput
                value={this.state.textMessage}
                onChangeText={textMessage => this.setState({ textMessage })}
                style={{
                  color: "#000",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  fontSize: 18,
                  flex: 1,
                }}
                underlineColorAndroid="transparent"
                placeholder="Type Message..."
                multiline={true}
                numberOfLines={0}
              />
              <TouchableOpacity onPress={this.sendMessage}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'lightseagreen',
                    fontSize: 16,
                    fontWeight: 'bold',
                    padding: 10,
                  }}
                > <Ionicons
                    name="ios-send"
                    size={width / 10}
                    color="#2892de"
                    style={{ marginLeft: 5, marginTop: 5 }}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.flatten({
  ThumbnailStyle: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0071CE',
    padding: 10,
    margin: 'auto',
    textAlign: 'center',
    // paddingTop:5
  },
  groupName: {
    color: '#0071CE',
    textAlign: 'center',
    fontSize: width / 20,
    fontWeight: 'bold'

  }
});
function mapStateToProps(state) {
  return {
    phoneNumber: state.authReducer.phoneNumber,
    userID: state.authReducer.userID,
    All_Message: state.appReducer.All_Message,
    userDetail: state.appReducer.userDetail,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    // Get_All_Message1: (group_detail) => {
    //   dispatch(All_Message_Action1(group_detail));
    // },
    // Get_All_Message1:group_detail => {
    //   dispatch(All_Message_Action1(group_detail))
    // } 
    // Get_All_Message1: obj =>{ dispatch(All_Message_Action1(obj))}

  }
}
connect(mapStateToProps, mapDispatchToProps)(ChattingGroup);