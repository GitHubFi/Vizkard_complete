/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator
} from "react-navigation";
import AppDrawerNavigator from "./Route";
import Splash from "./Splash/Splash.js";
import SignIn from "./SignIn/SignIn.js";
import SignUp from "./SignUp/SignUp.js";
import VerifySignIn from "./SignIn/Verify";
import ChatScreen from './TabNavigator/ChatScreen'
import { Provider } from "react-redux";                              //2
import Profile from './TabNavigator/Profile'
import { store, persistor } from "../Store/index";
import { PersistGate } from 'redux-persist/integration/react'        //1
import Icon from "react-native-vector-icons/Ionicons";
import Login from "./SignIn/Login"
import LogOut from './DrawerNavigator/LogOut'
import Edit_Experience from './TabNavigator/Edit_Experience'
import CreateProfile from './DrawerNavigator/CreateProfile';
import Manage_Profile from "./TabNavigator/Manage_Profile"
import ManageAccount from './DrawerNavigator/ManageAccount'

const AuthStackNavigator = createStackNavigator(
  {
    signIn: SignIn,
    Login: Login,
    Profile: Profile,
    LogOut: LogOut,
    create_profile: CreateProfile,
  },
  {
    initialRouteName: "Login"
  }
);

const Switch = createSwitchNavigator({
  splash: Splash,
  auth: AuthStackNavigator,
  app: AppDrawerNavigator,
});

export default class App extends Component {
  renderLoading = () => {
    <View>
      <ActivityIndicator size="large" />
    </View>
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <Switch />
        </PersistGate>
      </Provider>
    );
  }
}