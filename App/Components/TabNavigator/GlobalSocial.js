import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Item, Input, Icon, Button } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");
import { getAllUser } from '../../Store/Actions/AppAction'
import { connect } from "react-redux";
import firebase from "react-native-firebase";
import RNTextDetector from "react-native-text-detector";
import ImagePicker from 'react-native-image-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Demo from './Demo'

const numColumns = 3;
const optionss = {
  title: 'Select Business Card',
  // chooseFromLibraryButtonTitle: "Choose Photo from Library",
  // takePhotoButtonTitle: null,
  quality: 0.8,
  skipProcessing: true,

  // maxWidth: 100,
  // maxHeight: 100,
  // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    // path: 'images',
  },
};
class GlobalSocial extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      text: '',

      dataSource: [],
      notFound: "no data found",
      users: [],
      all_friend: [],
      getText: '',
      errorMessage: null,
      extractedText: '',
      errorMessage: '',
      hasErrored: false,
      imageSource: null,
      isLoading: false,
      array: null,
      detect_Email: '',
      phone: '',
      name: ''

    };
  }
  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    // const data = Array.prototype.reverse.call(data)


    return data;
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Public Profiles",
      headerStyle: {
        backgroundColor: "#0071CE"
      },
      headerTintColor: "#fff",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          {/* <Image
            source={require("../../../assets/Setting.png")}
            resizeMode="contain"
            style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
          /> */}
          <Icon name="menu" style={{ color: "#fff", marginLeft: 18, fontSize: width / 9 }} />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        // textAlign: "center",
        flex: 1,
        marginLeft: 12
      },
      headerRight: (
        <View style={{ flexDirection: "row" }}>

          < TouchableOpacity
            onPress={navigation.getParam("saveProfile")}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/Filter.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>




          {/* < Demo /> */}

          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={{ marginRight: width / 28 }}
          >
            <Image
              source={require("../../../assets/Back.png")}
              resizeMode="contain"
              style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
            />
          </TouchableOpacity>
        </View >
      )
    };
  };
  selectImage = () => {

    ImagePicker.showImagePicker(optionss, (response) => {
      if (response !== null) {

        console.log('Response = ', response.path);
        const uri = response.uri
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({
            imageSource: uri
          })
          this.detectText(uri)
        }
      } else {
      }

    });
  }

  detectText = (path) => {
    RNTextDetector.detectFromUri(path)
      .then((result) => {
        console.log('visionResp', result); /// an array having 2 object name text{} and bounding text have all text and bounding have height width left  top
        console.log("visionRespr: ", result);
        // if (result !== null) {
        this.setState({
          array: result
        })

        // this.props.getTextDetector(result)
        // } else {
        // }
      })
      .catch((error) => {
        console.log("textDetector error: ", error);
      })

  }


  functionScanCard = () => {
    Alert.alert(
      'Scan Business Card With Only Mobile Number',
      '',
      [
        // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Scan', onPress: this.selectImage },
      ],
      { cancelable: false },
    );

  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentWillMount() {
    firebase
      .database()
      .ref("users")
      .on("child_added", value => {
        this.setState(prevState => {
          return {
            users: [...prevState.users, value.val()]
          };
        });
      });

    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        // console.log(user, "user available")
        // console.log(user._auth._user._user.uid, "uid")
        await AsyncStorage.setItem('User', user._auth._user._user.uid)

      } else {

      }
    });

    let currentUser = firebase.auth().currentUser
    this.setModalVisible(true)
    this.props.getAllUserComp()

  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.props.allUserListComp.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();

      if (textData === itemData.name) {
        return (

          item

        )
      } else if (text === item.email) {
        return item
      } else if (text === item.company) {
        return item
      } else if (text === item.city) {
        return item
      } else if (text === item.phoneNumber) {
        return item
      }
      return itemData.indexOf(textData) > -1;
      return newData
    });

    this.setState({

      dataSource: newData,
      text: text,

    });
  }
  SearchFilter(text) {

    console.log(text, "mmmmm")
    const newData = this.props.allUserListComp.filter(function (item) {
      const itemData = item.phoneNumber ? item.phoneNumber.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();

      if (text === item.phoneNumber) {
        return item
      }

      return itemData.indexOf(textData) > -1;
      // return newData
    });

    this.setState({

      dataSource: newData,
      text: text,
      phone: text
    });
  }

  SearchText = () => {

    let arrayDetectText = this.state.array

    if (arrayDetectText !== null) {

      arrayDetectText.map((data) => {
        let text = data.text
        this.SearchFilter(text)

      })



    } else {

    }

  }

  componentDidMount() {
    this.props.navigation.setParams({

      saveProfile: this.functionScanCard,

    });


  }



  renderItem = ({ item, index }) => {
    if (item.empty === true || item.uid === this.props.userID.uid) {
      return (
        <View

          style={{
            backgroundColor: "#4D243D",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            margin: 1,
            height: Dimensions.get("window").width / numColumns,
            backgroundColor: "transparent"
          }}
        />
      );
    }



    return (
      <TouchableOpacity
        // keyExtractor={(item, index) => index.toString()}
        style={{
          flex: 1,
          margin: 1,
          padding: 2
        }}

        onPress={() => this.props.navigation.navigate('PublicProfileDetail', {
          detailUser: item
        })}
      >
        <View

          style={{ flex: 0.4 }}
        >
          <Image
            source={{ uri: item.url }}
            style={{ width: width / 3.2, height: height / 6 }}
          />
        </View>
        <View
          style={{
            flex: 0.6,
            backgroundColor: "#0071ce",
            paddingLeft: width / 28
          }}
        >
          <Text
            style={{ fontSize: width / 24, color: "#fff", fontWeight: "bold" }}
          >
            {item.name}
          </Text>
          <View style={{ lineHeight: 1 }}>
            <Text style={{ fontSize: width / 36, color: "#fff" }}>
              {item.occupation}
            </Text>

            <Text style={{ fontSize: width / 36, color: "#fff" }}>
              {item.city}, {item.pakistan}
            </Text>

            <Text style={{ fontSize: width / 36, color: "#fff" }}>
              {item.email}
            </Text>
            <View style={{ flexDirection: "row", marginTop: width / 36 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: width / 24,
                    color: "#fff",
                    fontWeight: "bold",
                    // marginRight:width/38
                  }}
                >


                </Text>
                {/* <Image
                  source={require("../../../assets/addContact.png")}
                  resizeMode="contain"
                  style={{ width: width / 30, height: height / 30 }}
                /> */}
              </View>
              <View>
                <Text style={{ color: '#fff' }}></Text>
              </View>
            </View>
          </View>
        </View>

      </TouchableOpacity>

    );



  };


  render() {
    // console.log(this.props.allUserListComp)
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* <KeyboardAvoidingView contentContainerStyle={{
          height: height - 20,
          width,
          backgroundColor: "#272727"
        }}
        behavior="position"> */}

        <View
          style={{
            flex: 0.3,
            backgroundColor: "#0071CE",
            flexDirection: "row"
            // height:height
          }}
        >

          <View style={{ paddingTop: width / 14 }}>
            <Item
              rounded
              style={{
                backgroundColor: "#fff",
                width: width / 2,
                height: height / 18
              }}
            >
              <Input placeholder="Name"
                onChangeText={text => this.SearchFilterFunction(text)}

              />
              <Icon active name="search" size={width / 6} style={{ color: "#0033a0", paddingRight: 10, }} />
            </Item>
            <Item
              rounded
              style={{
                backgroundColor: "#fff",
                width: width / 2,
                height: height / 18,
                marginTop: width / 14
              }}
            >
              <Input placeholder="Company Name"
                onChangeText={text => this.SearchFilterFunction(text)}

              />
              <Icon active name="search" size={width / 6} style={{ color: "#0033a0", paddingRight: 10, }} />
            </Item>
          </View>

          <View style={{ paddingTop: width / 14 }}>
            <Item
              rounded
              style={{
                backgroundColor: "#fff",
                width: width / 2,
                height: height / 18
              }}
            >
              <Input placeholder="Phone number"
                onChangeText={text => this.SearchFilterFunction(text)}
                keyboardType="number-pad"
                value={this.state.phone === '' ? null : this.state.text}
              />

              {
                this.state.array !== null ?

                  <View style={{ flexDirection: "row" }}>

                    <MaterialCommunityIcons name="credit-card-scan"
                      onPress={() => { this.SearchText() }}
                      size={width / 18}
                      style={{ color: "#0033a0", paddingRight: 10, }} />


                    <MaterialCommunityIcons name="close"
                      onPress={() => { this.setState({ array: null, phone: '', text: '' }) }}
                      size={width / 18}
                      style={{ color: "#0033a0", paddingRight: 10, }} />

                  </View>


                  : <Icon active name="search" size={width / 6} style={{ color: "#0033a0", paddingRight: 10, }} />
              }
            </Item>
            <Item
              rounded
              style={{
                backgroundColor: "#fff",
                width: width / 2,
                height: height / 18,
                marginTop: width / 14
              }}
            >
              <Input
                placeholder="E-mail"
                onChangeText={text => this.SearchFilterFunction(text)}
                value={this.state.email}
              />
              <Icon active name="search" size={width / 6} style={{ color: "#0033a0", paddingRight: 10, }} />
            </Item>
          </View>

        </View>

        <View style={{ flex: 0.7 }}>
          {this.props.allUserListComp.length !== 0 ?
            <FlatList
              data={(this.state.text === '' || this.state.dataSource === null) ? this.formatData(this.props.allUserListComp, numColumns) : this.formatData(this.state.dataSource, numColumns)}
              style={{ flex: 1 }}
              // ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={this.renderItem}
              // enableEmptySections={true}
              numColumns={numColumns}
              keyExtractor={(item, index) => index.toString()}
            />
            : null
          }
        </View>

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={require("../../../assets/backgroundmodal.png")}
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: width / 12,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Say hi, to the world{"\n"}with public profiles.{"\n"}Use filters
                and find{"\n"}ideal professionals{"\n"}from anywhere!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(false);
                }}
                style={{ marginTop: width / 6 }}
              >
                <Image
                  source={require("../../../assets/dont.png")}
                  resizeMode="contain"
                  style={{
                    width: width / 2,
                    height: height / 12
                  }}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </Modal>


      </View>
    );
  }
}
function mapStateToProps(state) {
  // console.log(state.appReducer.getTextDetected, "Array of detected text")
  return {
    allUserListComp: state.appReducer.allUserPublicList,
    userID: state.authReducer.userID,
    getTextDetected: state.authReducer.getTextDetected
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getAllUserComp: () => dispatch(getAllUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalSocial);