// import React, { Component } from 'react';
// import { Text, StyleSheet, View, Dimensions } from 'react-native';
// const { width, height } = Dimensions.get("window");
// import { connect } from "react-redux";
// import firebase from "react-native-firebase";
// class Fetch_Experience extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             total_experience: []
//         }
//     }

//     componentWillMount() {
//         let userID = this.props.userID.uid;
//         firebase
//             .database()
//             .ref("users")
//             .child(userID)
//             .child('Experience')
//             .on("child_added", value => {

//                 this.setState(prevState => {
//                     return {
//                         total_experience: [...prevState.total_experience, value.val()]
//                     };
//                 });
//             });
//     }

//     render() {
//         return (
//             <View>
//                 {
//                     this.state.total_experience.slice(0).reverse().map((value, id) => {
//                         return <View key={id}>
//                             <Text

//                                 style={{
//                                     fontSize: width / 22,
//                                     paddingTop: 5,
//                                     paddingBottom: 10,
//                                     fontWeight: "bold"
//                                 }}
//                             >
//                                 {value.Company}
//                             </Text>
//                             <Text

//                                 style={{
//                                     fontSize: width / 22,
//                                     paddingTop: 0,
//                                     paddingBottom: 10,
//                                     fontWeight: "normal"
//                                 }}>{value.Experience}</Text>
//                         </View>


//                     })
//                 }
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.flatten({});
// function mapStateToProps(state) {

//     console.log();
//     return {
//         userID: state.authReducer.userID, //as object
//         userDetail: state.appReducer.userDetail,
//         phoneNumber: state.authReducer.phoneNumber,


//     };
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         //   profileData: (userID) => {
//         //     dispatch(profileAction(userID));
//         //   }
//     };
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Fetch_Experience);
