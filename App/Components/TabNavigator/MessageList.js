import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Text,
  Modal,
  Alert,
  StyleSheet
} from "react-native";
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button, Icon } from 'native-base';
const { width, height, scale, fontScale } = Dimensions.get("window");
import firebase from "react-native-firebase";
import { getAllMessageList } from '../../Store/Actions/AppAction'
import User from "../SignIn/User";
import { connect } from 'react-redux';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import Badge from './notification/Badge'


const options = [
  'Cancel',

  <Text style={{ color: '#000', fontSize: 18 }}>All Groups</Text>,
  <Text style={{ color: '#000', fontSize: 18, }}>Create Group</Text>,
  // 'Watermelon',
]
class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // person: {
      //   name: props.navigation.state.params.name,
      //   phone: props.navigation.state.params.uid,
      // },
      messageList: [],
      users: [],
      Loading: false,
      active: false
      // badge_count: null

    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerStyle: {
        backgroundColor: "#0071CE"
      },
      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" style={{ color: "#fff", marginLeft: 18, fontSize: width / 9 }} />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        flex: 1,
        marginLeft: 12
      },
      headerRight: (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={navigation.getParam("dropdown")}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/groupChat.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
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

  active_out_handle = () => {
    this.setState({
      active: false
    })
  }

  showActionSheet = () => { this.ActionSheet.show() }
  functionQR = () => { this.props.navigation.navigate('MakeGroup'); }
  functionScanCard = () => { this.props.navigation.navigate('AllGroup') }

  componentDidMount() {
    this.props.navigation.setParams({
      dropdown: this.showActionSheet
    });
  }

  async componentWillMount() {
    let userID = this.props.userID.uid;
    this.props.Get_Message_List(userID);
    let dbRef = firebase.database().ref(`users/${userID}/FriendList`);
    dbRef.on("child_added", async val => {
      let person = val.val();
      person.phone = val.key;
      if (person.uid === userID) {
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person]
          };
        });
        this.setState({ Loading: true })
      }
    });

    firebase
      .database()
      .ref("messages")
      .child(userID)
      .on("child_added", value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });


  }
  render() {
    // console.log(this.state.users)
    return (
      <View style={{
        backgroundColor: "#ffffff", flex: 1,
      }}>
        {
          !this.state.Loading ?
            <View style={{
              padding: 10, alignContent: 'center', alignItems: 'center', justifyContent: 'center'
            }}>
              <Text>Loading...</Text>
            </View>
            : <FlatList
              data={this.state.users}
              renderItem={({ item }) => (
                item ?
                  <List >
                    <ListItem avatar onPress={() =>
                      this.props.navigation.navigate("ChatScreen", item)
                    }>
                      <Left>
                        <Thumbnail
                          square style={{ borderRadius: 30 / 4 }}
                          source={{ uri: item.url }} />

                      </Left>
                      <Body>
                        <Text style={{ fontSize: width / 20, }}> {item.name}</Text>
                        <Text note> {item.email}</Text>
                      </Body>
                      <Right>
                        {/* <Badge count={15} /> */}
                      </Right>
                    </ListItem>
                  </List>
                  : null

              )}
              keyExtractor={item => item.uid}
            />


        }


        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{ color: '#000', fontSize: 22 }}>Group chat</Text>}
          options={options}
          cancelButtonIndex={0}
          // destructiveButtonIndex={4}
          onPress={(index) => {
            if (index === 1) {
              this.functionScanCard()

            } else if (index === 2) {
              this.functionQR()
            }
            else {
              // console.log("nothing to select")
            }
          }

          }
        />
      </View>
    );
  }
}


function mapStateToProps(state) {

  return {
    // userdDetail: state.appReducer.userdDetail,
    phoneNumber: state.authReducer.phoneNumber,
    userID: state.authReducer.userID,
    GET_ALL_MESSAGE_LIST: state.appReducer.GET_ALL_MESSAGE_LISTx

  }
}
function mapDispatchToProps(dispatch) {
  return {
    Get_Message_List: (userID) => {
      dispatch(getAllMessageList(userID));
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)