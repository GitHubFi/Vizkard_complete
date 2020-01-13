import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class LogOut extends Component {
    play = () => {

        Alert.alert(
            "Log out",
            "Do you want to logout?",
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Confirm",

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