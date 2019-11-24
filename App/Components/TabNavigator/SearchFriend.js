import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  FlatList,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Item, Input, Icon, List, ListItem, Thumbnail, Right, Left, Body } from "native-base";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import Demo from './Demo'
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



class SearchFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      text: '',
      dataSource: [],
      NoData: "Not found!",
      Loading: false
    }
  }


  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: "#0071CE"
      },
      headerTitle: "Friend List",

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
      headerRight: (
        <View style={{ flexDirection: "row" }}>

          {/* <Demo /> */}

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


  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.users.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();

      if (text === item.name) {
        return item
      }


      return itemData.indexOf(textData) > -1;
      return newData
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,

    });
  }

  componentWillMount() {
    // let userPhone = await AsyncStorage.getItem('user')
    // let userPhone =this.props.phoneNumber;
    let uid = this.props.userID.uid
    let dbRef = firebase.database().ref(`users/${uid}/FriendList`);

    dbRef.on("child_added", val => {

      let person = val.val();
      // console.log(person, "all users")
      person.phone = val.key;
      // console.log(person.phone, "user phone")

      if (person.phone === uid) {

      } else {
        // console.log(person, "own user");
        this.setState({
          Loading: true
        })
        this.setState(prevState => {
          return {
            users: [...prevState.users, person]
          };
        });


      }

    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Item
          success
          style={{
            backgroundColor: "#fff",
            width: width,
            height: height / 18,

          }}
        >
          <Input placeholder="  Search..."
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.text}
            style={{
              paddingLeft: 10, padding: 10,
              paddingBottom: 15
            }}
          />
          {
            (this.state.text === '') ?
              <Icon active name="search" size={width / 6} style={{ color: "#0033a0", paddingRight: 10, }} />
              :
              <MaterialCommunityIcons name="close"
                onPress={() => { this.setState({ text: '' }) }}
                size={width / 18}
                style={{ color: "#0033a0", paddingRight: 10, }} />
          }
        </Item>
        {
          !this.state.Loading ?
            <View style={{
              padding: 10, alignContent: 'center', alignItems: 'center', justifyContent: 'center'
            }}>
              <Text>Loading...</Text>
            </View>

            : <FlatList
              data={this.state.users}
              data={(this.state.text === '' || this.state.dataSource === null) ? this.state.users : this.state.dataSource}

              renderItem={({ item }) => (
                item ?
                  <List >
                    <ListItem avatar
                      onPress={() => this.props.navigation.navigate('AllFriendDetails', {
                        detailUser: item
                      })}
                    >
                      <Left>
                        <Thumbnail
                          square
                          style={{ borderRadius: 30 / 4 }}
                          source={{ uri: item.url }}
                        />
                      </Left>
                      <Body>
                        <Text style={{ fontSize: width / 20, }}>{item.name}</Text>
                        <Text note  > {item.occupation} / {item.company}</Text>
                        <Text note > {item.email} /{item.phoneNumber} </Text>

                      </Body>
                      {/* <Right>
                    <Icon active style={{ color: "blue", paddingTop: 15 }} name="share" />
                  </Right> */}
                      <Right>
                        <Icon active style={{ color: "#000", paddingTop: 15 }} name="arrow-forward" />
                      </Right>

                    </ListItem>
                  </List>
                   : null
              )}
              keyExtractor={item => item.phone}
            />
        }
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    userID: state.authReducer.userID,
    phoneNumber: state.authReducer.phoneNumber
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createProfile: obj => dispatch(createProfileAction(obj))
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFriend);

