import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllUser, getTextDetectorAction } from '../../Store/Actions/AppAction'
import RNTextDetector from "react-native-text-detector";
import ImagePicker from 'react-native-image-picker';
const { width, height } = Dimensions.get("window");

const options = [
  'Cancel',

  <Text style={{ color: '#000', fontSize: 18 }}>Scan Card</Text>,
  // <Text style={{ color: '#000', fontSize: 18, }}>QR Code</Text>,
  // 'Watermelon',
]

const tessOptions = {
  whitelist: null,
  blacklist: null,

  // blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};

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

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      extractedText: '',
      errorMessage: '',
      hasErrored: false,
      imageSource: null,
      isLoading: false,
      array: null
    };

  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }

  functionQR = () => {
    Alert.alert(
      'QR Code',
      '',
      [
        // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );

  }
  functionScanCard = () => {
    Alert.alert(
      'Scan Business Card',
      '',
      [
        // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: this.selectImage },
      ],
      { cancelable: false },
    );

  }

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
          // this.GetPath(response.path);
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

        this.props.getTextDetector(result)
        // } else {

        // }
      })
      .catch((error) => {
        console.log("textDetector error: ", error);
      })

  }

  // GetPath = (imgPath) => {
  //   console.log("PATH", imgPath);
  //   RNTesseractOcr.recognize(imgPath, 'LANG_ENGLISH', tessOptions)

  //     .then((result) => {
  //       this.setState({ extractedText: result });
  //       Alert.alert(result)
  //       if(result.includes("New Program")){
  //         console.log("new programF is include in string")
  //       }
  //       console.log("OCR Result: ", result);
  //     })
  //     .catch((err) => {
  //       this.setState({ errorMessage: err.message });
  //       console.log("OCR Error: ", err);
  //     });


  // }



  render() {
    // console.log(this.state.imageSource, "state uri")
    // console.log(this.state.errorMessage, "OCR Error:");
    console.log(this.state.array, "array from state:");

    return (
      <View>
        <TouchableOpacity
          onPress={this.showActionSheet}
        >

          <Image
            source={require("../../../assets/Filter.png")}
            resizeMode="contain"
            style={{ width: width / 12, marginLeft: 8, marginRight: 10 }}
          />
        </TouchableOpacity>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={<Text style={{ color: '#000', fontSize: 22 }}>Search People With Business Card?</Text>}
          options={options}
          cancelButtonIndex={0}
          // destructiveButtonIndex={4}
          onPress={(index) => {
            if (index === 1) {
              this.functionScanCard()

            } else if (index === 2) {
              this.functionQR()
            }
            else {
              console.log("nothing to select")
            }
          }

          }
        />
      </View>
    )
  }
}


function mapStateToProps(state) {
  // console.log(state.appReducer.allUserListComp, "FRIENDLST DATA CHEKNG")
  return {
    allUserListComp: state.appReducer.allUserPublicList,
    userID: state.authReducer.userID,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getTextDetector: (result) => dispatch(getTextDetectorAction(result))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Demo);