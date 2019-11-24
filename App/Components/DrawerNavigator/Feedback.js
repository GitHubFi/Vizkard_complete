import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Image, Text, ToastAndroid, AsyncStorage, TouchableOpacity } from "react-native";
const { width, height } = Dimensions.get("window");
// import { Input, Textarea, Button, Form } from "native-base";
import { Card, CardItem, Input, Textarea, Icon, Container, Header, Left, Body, Right, Title, Subtitle, Button } from 'native-base';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Icon from "react-native-vector-icons/Ionicons";
import Mailer from 'react-native-mail';
import { connect } from 'react-redux';
class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            contactNo: '',
            subject: '',
            description: ''


        }
    }


    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="file-document-box" size={25} style={{ color: '#0071ce' }} />
        ),
        title: "Feedback",
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


    submit = async () => {
        const { name, email, contactNo, subject, description } = this.state;
        if (name === '') {
            ToastAndroid.show('Please Enter Your Name', ToastAndroid.SHORT);
            return
        } else if (email === '') {
            ToastAndroid.show('Please Enter Your Email Address', ToastAndroid.SHORT);
            return

        }
        else if (contactNo === '') {

            ToastAndroid.show('Please Enter Your Contact No', ToastAndroid.SHORT);
            return

        }
        else if (subject === '') {
            ToastAndroid.show('Please Enter Your Subject', ToastAndroid.SHORT);
            return

        }
        else if (description === '') {
            ToastAndroid.show('Please Enter Your Description', ToastAndroid.SHORT);
            return

        }
        // let user = await AsyncStorage.getItem('User');
        // console.log(user, 'xxx')
        // let contactProperties = {
        //     name,
        //     email,
        //     contactNo,
        //     subject,
        //     description,
        //     user
        // }
        // this.props.contactComponent(contactProperties);
        // ToastAndroid.show('Thank You', ToastAndroid.SHORT);
        // this.props.navigation.navigate('dashBoard')

        Mailer.mail({
            subject: `${subject}`,
            recipients: ['vizkardapp@gmail.com'],
            // ccRecipients: ['arcmage321CC@gmail.com'],
            // bccRecipients: ['arcmage321BCC@gmail.com'],
            body: `<b>Name : ${name}<b/> <br/>
                    <b>Email : ${ email}</b> <br/>
                    <b>Mobile Numner: ${ contactNo}</b> <br/>
                     <p>Description : "<i> ${ description}</i> "</p>`,
            isHTML: true,
            // attachment: {
            //     path: '',  // The absolute path of the file from which to read data.
            //     type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            //     name: '',   // Optional: Custom filename for attachment
            // }
        }, (error, event) => {
            Alert.alert(
                error,
                event,
                [
                    { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
                    { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
                ],
                { cancelable: true }
            )
        });
        ToastAndroid.show('Thank You For Feedback', ToastAndroid.LONG);
        this.props.navigation.navigate('Profile');
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    height: height,
                    width,
                    backgroundColor: "#eeeeee"
                }}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
            >
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
                        >Feedback</Title>
                    </Body>
                    <Right style={{ flex: 1 }}>
                        {/* <Icon name='menu' /> */}
                    </Right>

                </Header>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={require("../../../assets/logo.png")}
                            style={{
                                width: width / 2,
                                // height: height/2,
                                marginTop: 20,
                                resizeMode: "contain"
                                // color:'rgba(208, 164, 135, 1)'
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 0.2,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ textAlign: 'center' }}>
                           Hi, Please tell us how  we  can improve.{"\n"}
                            Your feedback is important for us. {"\n"}
                           
             </Text>
                    </View>
                    <View style={{ flex: 0.6, backgroundColor: '#eeeeee', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36
                            }}
                        >
                            <MaterialCommunityIcons name="account" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Full Name"}
                                placeholder="Full Name"
                                style={{ color: "#24516e" }}
                                // keyboardType={"email-address"}
                                onChangeText={name => this.setState({ name })}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36
                            }}
                        >
                            <MaterialCommunityIcons name="email" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Your Email"}
                                placeholder="Your Email"
                                style={{ color: "#24516e" }}
                                keyboardType={"email-address"}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36
                            }}
                        >
                            <MaterialCommunityIcons name="phone" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Contact No"}
                                placeholder="Contact No"
                                keyboardType={"numeric"}
                                style={{ color: "#24516e" }}
                                onChangeText={contactNo => this.setState({ contactNo })}
                            />
                        </View>
                        <View
                            style={{
                                flex: 0.2,
                                flexDirection: "row",
                                alignItems: "center",
                                borderColor: "#fff",
                                borderWidth: 1,
                                backgroundColor: "#fff",
                                height: width / 18,
                                margin: width / 36

                            }}
                        >
                            <MaterialCommunityIcons name="pencil" size={25} color="#24516e" />
                            <Input
                                placeholderTextColor={"#24516e"}
                                placeholder={"Subject"}
                                placeholder="Subject"
                                style={{ color: "#24516e" }}
                                // secureTextEntry
                                onChangeText={subject => this.setState({ subject })}
                            />
                        </View>
                        {/* <View style={{marginRight:5}}> */}

                        <Textarea rowSpan={5} value={this.state.description} bordered placeholder="Your Message"
                            onChangeText={description => this.setState({ description })}
                            keyboardType={'email-address'}
                            style={{ margin: width / 36, color: "#24516e", width: width, backgroundColor: "#fff" }} />

                        {/* </View> */}


                        <View
                            style={{
                                flex: 0.2,
                                justifyContent: "center",
                                alignItems: "center",

                            }}
                        >
                            <Button
                                style={{
                                    // marginTop: height / 10,
                                    height: width / 14,
                                    width: width * 0.9,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#24516e",
                                    alignSelf: "center",
                                    // borderRadius: width / 12
                                }}
                                onPress={this.submit}
                            >
                                <Text style={{ color: "#fff" }}>SEND MESSAGE</Text>
                            </Button>
                        </View>
                    </View>
                    {/* <View style={{ flex: 0.4 }}>
            <Text>Get In Touch</Text>
          </View> */}
                </View>
            </ScrollView>
        )
    }
}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        // contactComponent: obj => dispatch(contactAction(obj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
{/* <MaterialCommunityIcons name={"account-badge"} size={25} style={{color:'#0071ce'}} /> */ }