// import React, { Component } from 'react';
// const { width, height, scale, fontScale } = Dimensions.get("window");
// import { StyleSheet, View, Platform, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
// import { Icon } from "native-base";
// // import { WebView } from 'react-native-webview';
// import Video from 'react-native-video';

// // import {WebViewAndroid} from '@privageapp/react-native-webview-android';


// export default class Videos extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//       List: [
//         "https://www.youtube.com/embed/e2ohD4DSmZE?autoplay=1",
//         "https://www.youtube.com/embed/aT-51cfUm0A",
//         "https://www.youtube.com/embed/S2Tcq_aOLM8",
//         "https://www.youtube.com/embed/jHxMAptvetc",
//         "https://www.youtube.com/embed/dnR4V6sz8N0"


//       ],
//       video: [
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),
//         require("../../../../assets/video/video.mp4"),


//       ],


//     }
//   }
//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: "Videos",
//       headerStyle: {
//         backgroundColor: "#0071CE"
//       },
//       headerTintColor: "#fff",
//       headerLeft: (
//         <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//           {/* <Image
//             source={require("../../../assets/Setting.png")}
//             resizeMode="contain"
//             style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
//           /> */}
//           <Icon name="menu" style={{ color: "#fff", marginLeft: 18, fontSize: width / 9 }} />
//         </TouchableOpacity>
//       ),
//       headerTitleStyle: {
//         // textAlign: "center",
//         flex: 1,
//         marginLeft: 12
//       },
//       headerRight: (
//         <View style={{ flexDirection: "row" }}>
//           {/* <TouchableOpacity
//             onPress={() => navigation.toggleDrawer()}
//             style={{ marginRight: width / 28 }}
//           >
//             <Image
//               source={require("../../../assets/groupChat.png")}
//               resizeMode="contain"
//               style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
//             />
//           </TouchableOpacity> */}
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Profile")}
//             style={{ marginRight: width / 28 }}
//           >
//             <Image
//               source={require("../../../assets/Back.png")}
//               resizeMode="contain"
//               style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
//             />
//           </TouchableOpacity>
//         </View>
//       )
//     };
//   };

//   render() {


//     return (





//       <View style={{
//         flex: 1, flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         backgroundColor: "#000",

//       }}>
//         <Text>123</Text>
//         {/* {
//         this.state.video.map((value, key) => {
//           return <View key={key} style={{ height: 0 }}>


//             <Video source={require(value)}
//               resizeMode="cover"
//               style={styles.backgroundVideo}
//             />
//           </View>
//         })
//       } */}

//         {/* <Video source={require("../../../assets/video/video.mp4")}   // Can be a URL or a local file.
//           ref={(ref) => {
//             this.player = ref
//           }}
//           resizeMode="cover"                            // Store reference

//           style={styles.backgroundVideo} /> */}



//       </View>




//     );
//   }
// }

// const styles = StyleSheet.create({

//   WebViewContainer: {
//     flex: 1
//     // marginTop: (Platform.OS == 'ios') ? 20 : 0,

//   },
//   backgroundVideo: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },

// });


import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import Video from 'react-native-video';
import { Icon } from "native-base";
const { width, height, scale, fontScale } = Dimensions.get("window");

export default class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
        require("../../../assets/video/video.mp4"),
      ],
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Videos",
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
          {/* <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={{ marginRight: width / 28 }}
              >
                <Image
                  source={require("../../../assets/groupChat.png")}
                  resizeMode="contain"
                  style={{ width: width / 12, marginLeft: 8, marginRight: -6 }}
                />
              </TouchableOpacity> */}
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
        </View>
      )
    };
  };
  render() {
    return (
      // <ScrollView>

      <View style={{
        flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        backgroundColor: "#000",
      }}>
        {/* {
            this.state.video.map((value, index) => {
              return <Video
                key={index}
                 resizeMode="cover"
                source={value}
              />
            })
          } */}
        <Video

          // resizeMode="cover"
          source={require("../../../assets/video/Zameen.mp4")}
          resizeMode="contain"
          style={styles.backgroundVideo}

        />
        {/* <Video

          // resizeMode="cover"
          source={require("../../../assets/video/Zameen.mp4")}
          resizeMode="cover"
          style={styles.backgroundVideo}

        /> */}
        {/* <Video

          resizeMode="cover"
          source={require("../../../assets/video/video.mp4")}
          resizeMode="contain"
          style={styles.backgroundVideo}

        /> */}
      </View>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.flatten({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});