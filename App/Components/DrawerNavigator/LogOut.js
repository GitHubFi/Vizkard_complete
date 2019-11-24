import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import { Input, Button, Spinner, Form, Item, Picker, Label, Text } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import LogoutFunction from './LogoutFunction'


import Icon from "react-native-vector-icons/Ionicons";

export default class LogOut extends Component {


    play = () => {

        Alert.alert(
            "Log out",
            "Do you want to logout?",
            [
                {
                    text: "Cancel",
                    // onPress: () => {
                    //   return null;
                    // }
                },
                {
                    text: "Confirm",
                    // onPress: () => {
                    //   // AsyncStorage.clear();
                    //   firebase.auth().signOut().then(async () => {
                    //     props.navigation.navigate("Login");
                    //     console.log('SIgn out successfull')

                    //     await AsyncStorage.removeItem('User', (err => {
                    //       console.log(err, "logout hw")
                    //     }))
                    //     await AsyncStorage.removeItem('state', (err => {
                    //       console.log(err, "remove state")

                    //     }))
                    //     await AsyncStorage.removeItem('persist:root', (err => {
                    //       console.log(err, "remove state persist")

                    //     }))
                    //     // store.dispatch({

                    //     // })
                    //     props.navigation.navigate('Login');
                    //   }).catch((err) => {
                    //     console.log(err)
                    //   })
                    // }
                }
            ],
            { cancelable: false }
        )
    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="cloud-upload" size={25} style={{ color: '#0071ce' }}
                onPress={() => this.play} />
        ), header: "Logout"
    }
    render() {
        return (
            //    <LogoutFunction/>
            <View />
        )
    }
}