
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';

import { Input, Button, Spinner, Thumbnail, Header, Left, Body, Right, Title, Icon } from "native-base";
const { height, width } = Dimensions.get('window');
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default class Help extends Component {
    static navigationOptions = {
        headerTitle: "Help",
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="alert-circle-outline" size={25} style={{ color: '#0071ce' }} />
        ),
        title: "Help ",
        headerStyle: {
            backgroundColor: "#8b6e4b"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            alignSelf: "center",
            textAlign: "center",
            flex: 1,
            marginLeft: -10
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
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

                        >Help</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>

                    </Right>

                </Header>

                <View style={{  justifyContent: "center", alignItems: "center", textAlign: 'center', padding: 30, }}>
                    <Text style={{ color: '#05527c', fontSize: width / 16, fontWeight: 'bold', paddingBottom: 15 }}>
                        Vizkard FAQ
                            </Text>

                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold', paddingBottom: 8 }}>
                            Is Vizkard a social platform?
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            Yes, Vizkard is a professional social platform, aimed at connecting professionals across industries so they can connect on the basis of their skills, their specialization and their careers.
                            </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold', paddingBottom: 8 }}>
                            Is Vizkard free to use for everyone?
                        </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            Yes, Vizkard is a free to use platform, with the ability to promote your profile, or your business via a paid feature.
                            </Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold', paddingBottom: 8 }}>
                            Has Vizkard been developed locally? (In Pakistan)
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            Yes, Vizkard is a pure local development project, headed by professionals working {'&'} living in Karachi.
                            </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold', paddingBottom: 8 }}>
                            Will Vizkard direct ads towards me?
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                            Yes, Vizkard aims to direct ads to you based on your interests - that too, in a non-intrusive manner.
                            </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", textAlign: 'center', paddingBottom: 25 }}>
                        <Text style={{ color: '#000', justifyContent: 'flex-start', textAlign: 'left', fontWeight: 'bold', paddingBottom: 8 }}>
                            Will Vizkard evolve and grow as a platform for professional?
                            </Text>
                        <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center", paddingBottom: 35 }}>
                            Absolutely, we have long development roadmap planned for this product.
                            </Text>
                    </View>
                    <Text style={{ color: '#000', justifyContent: "center", alignItems: "center", textAlign: "center", fontStyle: 'italic' }}>
                        For any further queries, feel free to get in touch via the 'Feedback' form in the app drawer menu.
                            </Text>


                </View>



            </View>

        )
    }
}