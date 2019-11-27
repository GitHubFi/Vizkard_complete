import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  TextInput,
  Button,
  StatusBar,
  Image,
  PixelRatio,
  YellowBox,
  AsyncStorage,
  NetInfo,
  Alert,
  ToastAndroid,
  Dimensions,
  Animated, Easing,
  Text
} from "react-native";
// import { NetInfo } from '@react-native-community'
import { Container, Header, Content, Spinner, Icon } from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationActions, StackActions } from "react-navigation";
import SignIn from "../SignIn/SignIn";
const { width, height } = Dimensions.get("window");

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionInfo: '',
      // spinAnim: new Animated.Value(0)
    }
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.check_internet();

    // NetInfo.isConnected.fetch().then((info) => {
    //   if (info === true) {
    //     setTimeout(() => {
    //       //this.reset('signIn')
    //       this.loadApp();

    //     }, 800)
    //   } else {
    //     this.setState({
    //       connectionInfo: info
    //     });
    //   }

    //   console.log(info, "internet connection")
    // })


  }

  check_internet = () => {


    NetInfo.isConnected.fetch().then((info) => {
      if (info === true) {
        setTimeout(() => {
          //this.reset('signIn')
          this.loadApp();

        }, 800)
      } else {
        this.setState({
          connectionInfo: info
        });
        ToastAndroid.show("check internet connection", ToastAndroid.BOTTOM);

      }
    })
  }


  loadApp = async () => {

    const userToken = await AsyncStorage.getItem("User");
    await AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiGet(keys)
      .then((result) => {

      }));

    if (userToken !== null) {
      this.props.navigation.navigate("app");
    } else {
      this.props.navigation.navigate("Login");

    }
  };


  render() {
    // const spin = this.state.spinAnim.interpolate({
    //   inputRange: [0, ],
    //   outputRange: ['0deg', '360deg']
    // });
    return (
      <View style={[styles.container]}>
        {/* <StatusBar hidden /> */}

        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={require("../../../assets/logo.png")}
        />
        {
          this.state.connectionInfo === false ?
            <View style={{ position: 'absolute', top: "60%", left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Spinner color='blue' />
              <MaterialCommunityIcons name='reload' spin color="blue" size={width / 15} style={{ marginTop: 60, }} onPress={() => this.check_internet()} />
              <Text style={{}}>No internet connection Try again</Text>
            </View>
             : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  img: {
    width: "100%",
    height: "100%"
  }
});
