// import React, { Component } from 'react';
// import { Text, StyleSheet, View, Alert, AsyncStorage } from 'react-native';
// import firebase from 'react-native-firebase';

// export default class LogoutFunction extends Component {
//     constructor(props) {
//         super(props);
//     }
    
//      static navigationOptions = {
//         title: "Title"
//     }
//    goBack =()=>{
//     this.props.navigation.navigate("app");
//    }

//     componentWillMount() {

//         Alert.alert(
//             "Log out",
//             "Do you want to logout?",
//             [
//                 {
//                     text: "Cancel",
//                     onPress:() => { this.props.navigation.navigate('app') }
//                 },
//                 {
//                     text: "Confirm",
//                     onPress: () => {
//                         // AsyncStorage.clear();
//                         firebase.auth().signOut().then(async () => {
//                             props.navigation.navigate("Login");
//                             console.log('SIgn out successfull')

//                             await AsyncStorage.removeItem('User', (err => {
//                                 console.log(err, "logout hw")
//                             }))
//                             await AsyncStorage.removeItem('state', (err => {
//                                 console.log(err, "remove state")

//                             }))
//                             await AsyncStorage.removeItem('persist:root', (err => {
//                                 console.log(err, "remove state persist")

//                             }))
//                             // store.dispatch({

//                             // })
//                             this.props.navigation.navigate('Login');
//                         }).catch((err) => {
//                             console.log(err)
//                         })
//                     }
//                 }
//             ],
//             { cancelable: false }
//         )
//     }


//     render() {
//         return (
//             <View>
//                 <Text>hi</Text>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.flatten({});