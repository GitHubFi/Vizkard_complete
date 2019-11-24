// import React, { Component } from 'react';
// import { Text, StyleSheet, View, Alert, Dimensions, ScrollView, Modal, TouchableHighlight } from 'react-native';
// import { Container, Header, Content, Left, Body, Right, Button, Icon, Title, Item, Input, Label, Spinner } from 'native-base';
// import { connect } from 'react-redux';
// import firebase from "react-native-firebase";
// const { width, height } = Dimensions.get("window");
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import Edit_Experience from "./Edit_Experience";



// class ShowExperience extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             total_skills: [],

//             Edit_Skill: null,
//             modalVisible: false,
//             modalVisible1: false,
//             modalVisibleTagline: false,
//             total_experience: [],
//             modalVisibleEdit: false,
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


//     setModalVisible(visible) {
//         this.setState({ modalVisible: visible });
//     }
//     setModalVisible1(visible) {
//         this.setState({ modalVisible1: visible });
//     }

//     setModalVisible3(visible, value, Experience) {
//         this.setState({ modalVisibleEdit: visible, exp: value, Experience: Experience });
//         // Alert.alert(value, "Edit experience ")
//     }


//     render() {

//         return (
//             <ScrollView>
//                 <View
//                     style={{ marginTop: 0, justifyContent: "center", textAlign: "center", padding: 10, margin: 0 }}>

//                     {
//                         this.state.total_experience.slice(0).reverse().map((value, id) => {
//                             return <View key={id} >


//                                 <Text
//                                     // onPress={() => this.props.navigation.navigate('Edit_Experience')}
//                                     onPress={() => {
//                                         this.setModalVisible3(true, value.Company, value.Experience);
//                                     }}
//                                     style={{
//                                         fontSize: width / 22,
//                                         paddingTop: 5,
//                                         paddingBottom: 10,
//                                         fontWeight: "bold"
//                                     }}
//                                 >
//                                     {value.Company}
//                                 </Text>


//                                 <Text
//                                     // onPress={() => Alert.alert("edit Experience", value.Experience)}
//                                     style={{
//                                         fontSize: width / 22,
//                                         paddingTop: 0,
//                                         paddingBottom: 10,
//                                         fontWeight: "normal"
//                                     }}>{value.Experience}
//                                 </Text>
//                                  <Modal
//                                     animationType="fade"
//                                     transparent={false}
//                                     style={{ backgroundColor: "black" }}
//                                     visible={this.state.modalVisibleEdit}
//                                     onRequestClose={() => {
//                                         // Alert.alert('Modal has been closed.');
//                                         console.log("cancel")
//                                     }}
//                                 >
//                                     <View style={{ marginTop: 22, padding: 10 }}>
//                                         <View>
//                                             <TouchableHighlight
//                                                 onPress={() => {
//                                                     this.setModalVisible3(!this.state.modalVisibleEdit);
//                                                 }}
//                                             >
//                                                 {/* <Text style={{ fontSize: width / 20, fontWeight: "bold" }}>
//                         Cancel
//                         </Text> */}
//                                                 <MaterialCommunityIcons
//                                                     name="keyboard-backspace"
//                                                     size={width / 15}
//                                                     color="#000"
//                                                     style={{}}
//                                                 />
//                                             </TouchableHighlight>
//                                         </View>
//                                     </View>
//                                     <Edit_Experience name={this.state.exp} Experience={this.state.Experience} />
//                                 </Modal>
//                             </View>
//                         })
//                     }

//                 </View>
//             </ScrollView>
//         );
//     }
// }

// const styles = StyleSheet.flatten({});
// function mapStateToProps(state) {
//     return {
//         userID: state.authReducer.userID,
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         // verifyCode: (payload, path) => {
//         //     dispatch(verifylogin(payload, path));
//         // }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ShowExperience);