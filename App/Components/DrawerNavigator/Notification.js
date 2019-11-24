// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import Icon from "react-native-vector-icons/Ionicons";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// export default class Notification extends Component {

//     // static navigationOptions = {
//     //     drawerIcon: ({ tintColor }) => (
//     //         <MaterialCommunityIcons name="bell" size={25} style={{ color: '#0071ce' }}

//     //         />
//     //     ),


//     // }
//     static navigationOptions = {
//         drawerLabel: 'Notification',
//         drawerIcon: ({ tintColor }) => (
//             <MaterialCommunityIcons name="bell" size={25} style={{ color: '#0071ce' }}

//             />
//         ),
//     };


//     render() {
//         return (
//             <View style={{
//                 flex: 1, justifyContent: "center",
//                 textAlign: "center",
//                 alignContent: "center",
//                 backgroundColor: "white",
//             }}>
//                 <Text style={{
//                     textAlign: "center",

//                 }}>
//                     Notification</Text>
//             </View>
//         )
//     }
// }

import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
const { width, height } = Dimensions.get("window");
import { Card, CardItem, Icon, Container, Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { NotificationAction } from '../../Store/Actions/AppAction';

class Notification extends Component {
    static navigationOptions = {
        headerTitle: 'Notification',
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="bell" size={25} style={{ color: '#0071ce', }}

            />
        ),
        headerStyle: {
            backgroundColor: "#0071CE"
        },
        headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            flex: 1,
            marginLeft: -10
        }
        // headerTitle:"Notification"
    };


    componentWillMount() {
        // this.props.GetAllNotification();
    }
    render() {
        return (
            <View style={{}}>




                <Header
                    style={{ backgroundColor: '#0071CE' }}
                    androidStatusBarColor="#0071CE">
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                            <Icon name="arrow-back" style={{ color: "#fff", marginLeft: 10 }} />
                        </TouchableOpacity>

                    </Left>
                    <Body style={{ flex: 1 }}>
                        <Title
                            style={{ alignSelf: "center" }}
                        // style={{ alignSelf: 'center', alignContent: "center", textAlign: 'center', justifyContent: 'center' }}
                        >Notifications</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {/* <Icon name='menu' /> */}
                    </Right>

                </Header>

                <ScrollView
                    contentContainerStyle={{
                        // height: height,
                        width,
                        backgroundColor: "#eee"
                    }}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                >
                    <View>


                        <CardItem header bordered style={{ flex: 0.1, backgroundColor: '#282828' }}>
                            <AntDesign name="notification" size={25} color="#fff" />

                            <Text style={{ textAlign: 'center', fontSize: width / 20, color: "#fff", marginLeft: 10 }}>
                                Notification for upgrade vizkard app
                            </Text>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24, }}>
                                    vizkard is going to more professional app and you can use and find more valueable people

                                </Text>

                            </Body>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24 }}>

                                    vizkard is going to more professional app and you can use and find more valueable people
                                </Text>

                            </Body>
                        </CardItem>
                    </View>
                    <View>


                        <CardItem header bordered style={{ flex: 0.1, backgroundColor: '#282828' }}>
                            <AntDesign name="notification" size={25} color="#fff" />

                            <Text style={{ textAlign: 'center', fontSize: width / 20, color: "#fff", marginLeft: 10 }}>
                                Notification for upgrade vizkard app
                            </Text>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24, }}>
                                    vizkard is going to more professional app and you can use and find more valueable people

                                </Text>

                            </Body>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24 }}>

                                    vizkard is going to more professional app and you can use and find more valueable people
                                </Text>

                            </Body>
                        </CardItem>
                    </View>
                    <View>


                        <CardItem header bordered style={{ flex: 0.1, backgroundColor: '#282828' }}>
                            <AntDesign name="notification" size={25} color="#fff" />

                            <Text style={{ textAlign: 'center', fontSize: width / 20, color: "#fff", marginLeft: 10 }}>
                                Notification for upgrade vizkard app
    </Text>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24, }}>
                                    vizkard is going to more professional app and you can use and find more valueable people

        </Text>

                            </Body>
                        </CardItem>
                        <CardItem bordered style={{ flex: 0.8, padding: width / 36 }}>
                            <Body>
                                <Text style={{ fontSize: width / 24 }}>

                                    vizkard is going to more professional app and you can use and find more valueable people
        </Text>

                            </Body>
                        </CardItem>
                    </View>

                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state.authReducer.UserList, "+++++++++++++++USERMERAJ++++++++++++++++")
    // console.log(state.authReducer.Notification, "+++++++++++++++CURRENT USER++++++++++++++++")
    return {
        // UserList: state.authReducer.UserList,
        // currentUser: state.authReducer.currentUser,
        // Notification: state.authReducer.Notification
    }
}
function mapDispatchToProps(dispatch) {
    return {

        GetAllNotification: () => {
            // dispatch(NotificationAction())

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification)