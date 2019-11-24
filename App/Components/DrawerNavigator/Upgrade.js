import React, { Component } from "react";
import { View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default class Upgrade extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <MaterialCommunityIcons
        name="jquery"
        size={25}
        style={{ color: "#0071ce" }}
      />
    )
  };
  render() {
    return (
      <View style={{
        flex: 1, justifyContent: "center",
        textAlign: "center",
        alignContent: "center",
        backgroundColor: "white",
    }}>
        <Text style={{
            textAlign: "center",

        }}>
            Faq</Text>
    </View>
    )
  }
}
