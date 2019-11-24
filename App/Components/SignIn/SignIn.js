import React, { Component } from "react";
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
  Alert,
  ActivityIndicator
} from "react-native";
import { Input, Button, Spinner, Form, Item, Picker, Label } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import { signInAc } from '../../Store/Actions/AuthAction'
import User from "./User";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "Pakistan",
      phoneNumber: "",
      loading: false,
      code: "+92",
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
  static navigationOptions = {
    header: null
  };


  signIn = () => {
    // const { email, password, confirmPassword, name } = this.state;
    let { country, phoneNumber, code, email, password, confirmPassword } = this.state;
    console.log(this.state);
    // if (!validator.isEmail(email)) {
    //   ToastAndroid.show("Please fill the email correctly", ToastAndroid.SHORT);
    //   return;
    // } else if (password.toString().length < 8) {
    //   ToastAndroid.show("Password must be of 8 characters", ToastAndroid.SHORT);
    //   return;
    // }
    if (phoneNumber.length < 10) {
      Alert.alert("", "Enter valid phone number");
    } else if (phoneNumber === '') {
      Alert.alert("Please Enter Phone Number");
    } else if (email === '') {
      ToastAndroid.show('Enter your Email', ToastAndroid.SHORT)
    } else if (password === '') {
      ToastAndroid.show('Enter Your Password', ToastAndroid.SHORT)
    } else if (confirmPassword === '') {
      ToastAndroid.show('Enter Your Confirm Password', ToastAndroid.SHORT)
    } else if (confirmPassword !== password) {
      ToastAndroid.show('please enter same password', ToastAndroid.SHORT)
    } else {
      this.props.signInAction(
        {
          phoneNumber: phoneNumber,
          country: country,
          history: this.props.navigation,
          email: email,
          password: password
        }
      );
      console.log("Signup", this.state)
    }


    if (this.props.SignUpErrorMessage) {
      Alert.alert(
        '',
        this.props.SignUpErrorMessage,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      )
    } else {
      console.log("nothing")
    }
  };


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
          Select Your Country
        </Text>
        <View
          style={{
            color: "#fff",
            backgroundColor: "#fff",
            borderRadius: 10
          }}
        >
          <Item picker style={{ borderColor: "transparent" }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="md-arrow-down" />}
              style={{ width: width / 2 }}
              selectedValue={this.state.country}
              onValueChange={
                event => this.setState({ country: event })
                // this.onInputChange(event, "country")
              }
            >
              <Picker.Item label="Pakistan" value="ammar" />
              <Picker.Item label="India" value="junaid" />
              <Picker.Item label="America" value="hayat" />
              <Picker.Item label="Newzeland" value="hamza" />
              <Picker.Item label="France" value="arcmage" />
            </Picker>
          </Item>
        </View>
        <View style={{ width: width / 2, marginTop: 10, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10 }}>
          {/* <Item style={{ borderColor: "transparent", width: width / 6, backgroundColor: "#fff", borderRadius: 10 }}>
          
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="md-arrow-down" />}
              style={{ width: width / 4 }}
              selectedValue={this.state.code}
              onValueChange={event => this.setState({ code: event })}
            >
              <Picker.Item label="+92" value="+92" />
              <Picker.Item label="+91" value="+91" />
              <Picker.Item label="+43" value="+43" />
              <Picker.Item label="+45" value="+45" />
              <Picker.Item label="+30" value="+30" />
            </Picker>
          </Item> */}
          <Item style={{ width: width / 2, borderColor: "transparent" }}>
            <Input
              style={{ backgroundColor: "#fff", borderRadius: 10, fontSize: width / 24, width: width / 3 }}
              placeholder="Phone no. 0310-1234567"
              keyboardType={"numeric"}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
              value={this.state.phoneNumber}
            />
          </Item>


        </View>




        <View style={{ width: width / 2, marginTop: 10, }}>
          <Item style={{ width: width / 2, borderColor: "transparent", paddingBottom: 10 }}>
            <Input
              style={{ backgroundColor: "#fff", borderRadius: 10, fontSize: width / 24, width: width / 3 }}
              placeholder="Enter Your Email"
              placeholder={"Enter Your Email"}
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
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              autoCapitalize={"none"}
            />
          </Item>
          <Item style={{ width: width / 2, borderColor: "transparent" }}>
            <Input
              style={{ backgroundColor: "#fff", borderRadius: 10, fontSize: width / 24, width: width / 3 }}
              placeholder="Confirm  Password"
              keyboardType={"default"}
              secureTextEntry={true}
              autoCapitalize={"none"}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              value={this.state.phonconfirmPasswordeNumber}
            />
          </Item>
          {/* <Text
            style={{
              fontSize: width / 24,
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              paddingBottom: 10,

              paddingTop:10
            }}
          >
            Login Your Vizkard account
          </Text> */}

        </View>

        <Button
          rounded
          style={{
            alignSelf: "center",
            marginTop: 15,
            backgroundColor: "#fff",
            width: width / 2
          }}
          onPress={this.signIn}

        >
          <Text
            style={{
              width: width / 2,
              color: "#000",
              // fontWeight: "bold",
              textAlign: "center"
            }}
          // onPress={this.signIn}
          >
            Register
  </Text>
        </Button>
        {
          this.props.Signup_Progress === true ?
            <View style={[styles.container, styles.horizontal]}>

              <ActivityIndicator size="small" color="#ffffff" />

            </View>
            : null

        }

        <Text
          style={{
            fontSize: width / 24,
            color: "#fff",
            textAlign: "center",
            fontWeight: "200",
            paddingTop: 20,

          }}
          // onPress={this.props.navigation.navigate('Login')}
          onPress={() => { this.props.navigation.navigate('Login') }}
        // onPress={this.Login}
        // onPress={this.signIn}
        >

          Already have account? Login Now
          </Text>
      </View>
    );
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
  console.log(state.authReducer)
  return {
    loader: state.authReducer.isProgress,
    errorAc: state.authReducer,
    Signup_Progress: state.authReducer.Signup_Progress, //progress
    SignUpErrorMessage: state.authReducer.SignUpErrorMessage, //error message
    SignUPError: state.authReducer.SignUPError  //error boolean
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signInAction: payload => {
      dispatch(signInAc(payload));
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
