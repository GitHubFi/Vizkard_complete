import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems
} from "react-navigation";
import { AppState } from "react-native";
import { Icon, Thumbnail } from "native-base";
import Profile from "./TabNavigator/Profile";
import MessageList from "./TabNavigator/MessageList";
import GlobalSocial from "./TabNavigator/GlobalSocial";
import Videos from "./TabNavigator/Videos";
import SearchFriend from "./TabNavigator/SearchFriend";
import Feedback from "./DrawerNavigator/Feedback";
import Help from "./DrawerNavigator/Help";
import ManageAccount from "./DrawerNavigator/ManageAccount";
import Notification from "./DrawerNavigator/Notification";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChatScreen from "./TabNavigator/ChatScreen";
import PublicProfileDetail from './TabNavigator/publicProfileDetail'
import AllFriendDetails from './TabNavigator/AllFriendDetails'
import CreateGroup from './TabNavigator/groups/CreateGroups'
import ChattingGroup from './TabNavigator/groups/ChattingGroup'
import MakeGroup from './TabNavigator/groups/MakeGroup'

const { width, height } = Dimensions.get("window");
import { store } from '../Store'
import firebase from 'react-native-firebase';
import {
  Image,
  Dimensions,
  TouchableOpacity,
  // Button,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Alert
} from "react-native";
import { Button } from "native-base";
const CustomDrawerComponent = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "#0071ce",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: width / 16, fontWeight: "bold", color: "#fff" }}>
        Hi, we are here to {"\n"}
        assist you.
      </Text>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Log out",
            "Do you want to logout?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  return null;
                }
              },
              {
                text: "Confirm",
                onPress: () => {
                  AsyncStorage.clear();
                  firebase.auth().signOut().then(async () => {
                    props.navigation.navigate("Login");
                    console.log('SIgn out successfull')

                    await AsyncStorage.removeItem('User', (err => {
                      console.log(err, "logout hw")
                    }))
                    await AsyncStorage.removeItem('state', (err => {
                      console.log(err, "remove state")

                    }))
                    await AsyncStorage.removeItem('persist:root', (err => {
                      console.log(err, "remove state persist")

                    }))
                    // store.dispatch({

                    // })
                    props.navigation.navigate('Login');
                  }).catch((err) => {
                    console.log(err)
                  })
                }
              }
            ],
            { cancelable: false }
          )
        }
      >
        <View style={{ paddingLeft: 18, }}>
          <MaterialCommunityIcons.Button name="logout-variant" size={25}
            backgroundColor="#fff" color="#0071ce"
            style={{ color: '#0071ce', marginRight: width / 2, }}
            onPress={() =>
              Alert.alert(
                "Log out",
                "Do you want to logout?",
                [
                  {
                    text: "Cancel",
                    onPress: () => {
                      return null;
                    }
                  },
                  {
                    text: "Confirm",
                    onPress: () => {
                      AsyncStorage.clear();
                      firebase.auth().signOut().then(async () => {
                        props.navigation.navigate("Login");
                        console.log('SIgn out successfull')

                        await AsyncStorage.removeItem('User', (err => {
                          console.log(err, "logout hw")
                        }))
                        await AsyncStorage.removeItem('state', (err => {
                          console.log(err, "remove state")

                        }))
                        await AsyncStorage.removeItem('persist:root', (err => {
                          console.log(err, "remove state persist")
                        }))
                        props.navigation.navigate('Login');
                      }).catch((err) => {
                        console.log(err)
                      })
                    }
                  }
                ],
                { cancelable: false }
              )
            }><Text style={{ fontFamily: 'Arial', fontSize: 15, color: "#000", fontWeight: "bold", }}
            > LogOut </Text>
          </MaterialCommunityIcons.Button>

        </View>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
);
const MessageStack = createStackNavigator({
  MessageList: {
    screen: MessageList
  },
  ChatScreen: {
    screen: ChatScreen
  },
  AllGroup: {
    screen: CreateGroup
  },
  ChattingGroup: {
    screen: ChattingGroup
  },
  MakeGroup: {
    screen: MakeGroup
  }


});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        drawerIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name="home"
            size={25}
            style={{ color: "#0071ce" }}
          />
        ),
        title: "Profile",
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
          textAlign: "center",
          flex: 1,
          marginLeft: -12
        }
      };
    }
  }
});
const SocialStack = createStackNavigator({
  Social: {
    screen: GlobalSocial
  },
  PublicProfileDetail: {
    screen: PublicProfileDetail
  }

});

const VideoStack = createStackNavigator({
  Videos: {
    screen: Videos,

  }
});
const SearchFriendStack = createStackNavigator({
  SearchFriend: {
    screen: SearchFriend
  },
  AllFriendDetails: {
    screen: AllFriendDetails
  }
});
const AppTabNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/myprofile.png")}
            resizeMode="contain"
            style={{ width: width / 7 }}
          />
        )
      }
    },
    MessageList: {
      screen: MessageStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/chat.png")}
            resizeMode="contain"
            style={{ width: width / 7 }}
          />
        )
      }
    },
    Social: {
      screen: SocialStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/social.png")}
            resizeMode="contain"
            style={{ width: width / 7 }}
          />
        )
      }
    },

    SearchFriend: {
      screen: SearchFriendStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/allcontacts.png")}
            // viewadds.png
            // ")}
            resizeMode="contain"
            style={{ width: width / 7 }}
          />
        )
      }
    },
    Videos: {
      screen: VideoStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../../assets/viewadds.png")}
            resizeMode="contain"
            style={{ width: width / 7 }}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Profile",
    order: ["Videos", "Social", "SearchFriend", "MessageList", "Profile"],
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#a0c0e8',
      inactiveTintColor: '#263238',
      style: {
        backgroundColor: "#c3d6ee"
      },
      activeBackgroundColor: "#a0c0e8"
    }
  }
);

AppTabNavigator.navigationOptions = {
  header: null
};

const AppStackNavigator = createStackNavigator({
  AppTabNavigator
});
export default (AppDrawerNavigator = createDrawerNavigator(
  {

    "           Go Home": AppStackNavigator,

    Notifications: {
      screen: Notification,
    },
    Feedback: Feedback,
    ManageProfile: ManageAccount,
    Help: Help,
  },
  {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "#0071ce",
      labelStyle: {
        alignSelf: "flex-start",
        textAlign: "left",
      }
    }
  }
));
