import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    ToastAndroid,
    AsyncStorage,
    ActivityIndicator,
    Alert
} from "react-native";
import { Input, Button, Spinner, Form, Item, Picker, Label } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { connect } from 'react-redux';
// import validator from "validator";
import { verifylogin } from '../../Store/Actions/AuthAction'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Password: '',
            user: ''
        }

    }

    static navigationOptions = {
        header: null
    }

    verifyFunc = () => {

        let { email, Password } = this.state;

        if (email === '') {
            ToastAndroid.show('Enter your Email', ToastAndroid.SHORT)
        } else if (Password === '') {
            ToastAndroid.show('Enter Your Password', ToastAndroid.SHORT)
        } else {


            this.props.verifyCode(this.state, this.props.navigation)
        }

        if (this.props.errorTest) {
            Alert.alert(
                '',
                this.props.errorTest,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            )

        } else {
            console.log("noting")
        }


    }

    Register = () => {
        this.props.navigation.navigate('signIn')
    }




    render() {


        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#008ace",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text style={{ fontSize: width / 4, color: "#fff", fontWeight: "bold", letterSpacing: -10 }}>hi</Text>
                <Text
                    style={{
                        fontSize: width / 18,
                        color: "#fff",
                        marginBottom: 5,
                        textAlign: "center"
                    }}
                >
                    Login Your Account
            </Text>

                <View style={{ width: width / 2, marginTop: 10 }}>
                    <Item style={{ borderColor: "transparent", paddingBottom: 10 }}>
                        <Input
                            style={{ backgroundColor: "#fff", borderRadius: 10 }}
                            placeholder="Enter Your Email"
                            // placeholder={"Enter Your Email"}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}

                        />
                    </Item>
                    <Item style={{ width: width / 2, borderColor: "transparent", paddingBottom: 10 }}>
                        <Input
                            style={{ backgroundColor: "#fff", borderRadius: 10, fontSize: width / 24, width: width / 3 }}
                            placeholder="Enter Your Password"
                            keyboardType={"default"}
                            autoCapitalize={"none"}
                            secureTextEntry={true}
                            onChangeText={Password => this.setState({ Password })}
                            value={this.state.Password}
                        />
                    </Item>
                </View>

                {
                    this.props.isProgress === true ?
                        <View style={[styles.container, styles.horizontal]}>

                            <ActivityIndicator size="small" color="#ffffff" />

                        </View>
                        : null

                }



                <Button
                    rounded
                    style={{
                        alignSelf: "center",
                        marginTop: 10,
                        backgroundColor: "#fff"
                    }}
                    onPress={this.verifyFunc}
                >
                    <Text
                        style={{
                            width: width / 2,
                            color: "#000",
                            // fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >
                        Login
              </Text>
                </Button>
                <Text
                    style={{
                        fontSize: width / 24,
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: "200",
                        paddingTop: 20,

                    }}
                    // onPress={this.props.navigation.navigate('Login')}
                    onPress={() => { this.props.navigation.navigate('signIn') }}
                // onPress={this.verifyFunc}
                >

                    New User? Register Now
          </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 2
    }
})

function mapStateToProps(state) {
    return {
        verifyCode: state.authReducer.currentUser,
        phoneNumber: state.authReducer.phoneNumber,


        userID: state.authReducer.userID,

        isProgress: state.authReducer.isProgress,

        isError: state.authReducer.isError,

        errorTest: state.authReducer.errorTest,


    }
}
function mapDispatchToProps(dispatch) {
    return {
        verifyCode: (payload, path) => {
            dispatch(verifylogin(payload, path));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);