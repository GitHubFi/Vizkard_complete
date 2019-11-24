import Auth from "../actionTypes";
import firebase from "react-native-firebase";
import ActionTypes from '../actionTypes'
import { AsyncStorage, ToastAndroid } from 'react-native'
// export default class AuthAction {
//   static signInAc(obj) {
//     console.log(obj);
//     return {
//       type: Auth.SIGNIN_PROGRESS,
//       payload: obj
//     };
//   }
//   static signInSuccessFul(obj,uid) {
//     console.log(obj);
//     return {
//       type: Auth.SIGNIN_SUCCESSFUL,
//       payload: obj
//     };
//   }
//   static signInRejected(error) {
//     console.log(error);
//     return {
//       type: Auth.SIGNIN_REJECTED,
//       payload: error
//     };
//   }
//   static signInVerify(obj) {
//     console.log(obj)
//     return {
//       type: Auth.SIGNIN_PROGRESS_VERIFY,
//       payload: obj
//     }
//   }
//   static signInVerifySuccessful(obj) {
//     return {
//       type: Auth.SIGNIN_SUCCESSFUL_VERIFY,
//       payload: obj
//     }
//   }
//   static signInVerifyRejected(obj) {
//     return {
//       type: Auth.SIGNIN_REJECTED_VERIFY,
//       payload: obj
//     }
//   }
// }




export function signInAc(payload) {
  // console.log("SAAAAAAAAADDDD", payload)
  return dispatch => {
    dispatch(signUpRequest());
    let phoneNumber = payload.phoneNumber;
    this.history = payload.history;
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).
      then(() => {
        let user = firebase.auth().currentUser;
        // console.log("-..........-", user)
        // payload.history.navigate('Login');
        this.history.navigate("create_profile");



        // await AsyncStorage.setItem('User', phoneNumber);
        // firebase.database().ref(`users/${user.uid}`).child('userAuth').set(user.uid);
        dispatch(signUpSucceed(payload, user.uid, phoneNumber));
      })
      .catch(err => {
        dispatch(signUpError(err.message));
        // payload.history.navigate('signIn', err);
        this.history.navigate("signIn");
        // console.log("SAAAAAAAAADDDD", err)
      })

  }
}

function signUpRequest() {
  return {
    type: ActionTypes.SIGNUP_PROGRESS
  }
}

function signUpSucceed(payload, uid, phoneNumber) {
  // console.log(payload, uid, phoneNumber, "xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  return {
    type: ActionTypes.SIGNIN_SUCCESSFUL,
    payload: payload,
    uid,
    phoneNumber
  }
}
export function signUpError(message) {
  return {
    type: ActionTypes.SIGNUP_ERROR,
    message
  }
}

// export function signInAc(payload) {
// return  dispatch => {
//   // let phoneNumber = payload.phoneNumber;
//   // this.history = payload.history;
//   // let email = payload.email;
//   // let password = payload.password;
//   firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).
//     then(() => {
//       let user = firebase.auth().currentUser;
//        AsyncStorage.setItem('user', phoneNumber)
//       // firebase
//         .database()
//         .ref(`users/${phoneNumber}`).child('userAuth')
//         .set(user);

//       path.navigate('Login');
//     })
//     .catch(err => {
//       // dispatch(signUpError(err.message));
//       // path.navigate('SignUp');
//     })

// }
//   return dispatch => {
//     // dispatch(signUpRequest());
//     firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).
//       then(() => {
//         let user = firebase.auth().currentUser;
//         console.log("-..........-", user)
//         payload.history.navigate('Login');



//         //await AsyncStorage.setItem('User', user);
//         firebase.database().ref(`users/${phoneNumber}`).child('userAuth').set(user);
//         dispatch(signUpSucceed());
//       })
//       .catch(err => {
//         // dispatch(signUpError(err.message));
//         payload.history.navigate('signIn');
//       })
//   }
// }




// function getCurrentUser() {
//   var userId;
//   try {
//     firebase.auth().onAuthStateChanged(function (user) {
//       console.log(user)
//       userId = user.uid;

//     });

//     AsyncStorage.setItem('uid', userId);

//     //  Database.checkFirstLogin(userId, (firstLogin) => {
//     //   this.setState({
//     //     firstLogin: firstLogin
//     // });
//     //   if (this.state.firstLogin == null) {
//     //       Actions.userDetails({uid: userId});
//     //   }  else {
//     //       Actions.dashboard({uid: userId});
//     //     }
//     // });
//   } catch (error) {
//     console.log(error);
//   }
// }



// export function verifylogin(obj) {
//   console.log(obj,"verify data comming")
//   return dispatch => {
//     // if(obj.uid){

//     // // }else{
//     // obj.confirmResult
//     //   .confirm(obj.verifyCodeInput)
//     //   .then(user => {
//     //     console.log(user, 'verify check')
//     //     console.log(obj.uid,'verify user id')
//         this.history.navigate('app')
//       // }).catch((err) => {
//       //   console.log(err,'verify error')
//       // })
//     }
//   // }
// }



//   static verifylogin = action$ =>
//     action$.ofType(Auth.SIGNIN_PROGRESS_VERIFY).switchMap(({ payload }) => {
//       console.log(payload);

//       // console.log(payload)

//       return payload.confirmResult
//         .confirm(payload.verifyCodeInput)
//         .then(user => {
//           // console.log(user)
//           // firebase
//           return AuthActions.signInVerifySuccessful(payload.uid);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//       // return payload
//       // console.log(payload)
//     });
//   // 03402041054
//   // 3102556867
//   //03472197728
// }




export function verifylogin(payload, path) {
  return dispatch => {
    dispatch(signInRequest());
    // this.history = payload.history;
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.Password)
      .then(() => {
        let user = firebase.auth().currentUser;
        // await AsyncStorage.setItem('User', user.uid)

        let obj = {
          // name: name,
          uid: user.uid,
          email: user.email
        }
        // if (user) {
        //   // User is signed in.
        //   firebase.auth().onAuthStateChanged(async function (user) {
        //     if (user) {
        //       console.log(user, "user available")
        //       console.log(user._auth._user._user.uid, "uid")
        //       await AsyncStorage.setItem('User', user._auth._user._user.uid)

        //       // ...
        //     } else {
        //       // ...
        //       console.log('errorss')
        //     }
        //   });
        // } else {
        //   // No user is signed in.
        // }


        path.navigate("app");
        dispatch(signInSucced(obj));  //done
        // console.log(user, "///////////////////////////////////////////////////////////////////////")


      })

      .catch((err) => {
        dispatch(signInError(err.message));
        path.navigate("Login");
        // console.log("1234455667789900----", err.message)
      })
  }
}

function signInRequest() {
  return {
    type: ActionTypes.SIGNIN_PROGRESS
  }
}
function signInSucced(payload) { //add this line and this line include phoneNumebr
  // console.log(payload, "Signin User PHONE NUMBER FOR SHOW the data in profile")
  return {
    type: ActionTypes.SIGNIN_SUCCESSFUL_VERIFY,
    payload
  }
}

// function signInError(me) {
//   return {
//     type: ActionTypes.SIGNIN_REJECTED,
//     paylod: me
//   }
// }
function signInError(error) {
  return {
    type: ActionTypes.SIGNIN_REJECTED,
    error
  }
}
// export function signUpErrorAlert() {
//   return {
//     type: actionTypes.SIGNUP_ERROR_ALERT
//   }
// }





























///////////////////////////////////////////////// Public Profile Page /////////////////////////////////////
