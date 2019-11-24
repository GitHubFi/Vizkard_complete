import ActionTypes from "../actionTypes";
import firebase from "react-native-firebase";


export function createProfileAction(payload) {
  return dispatch => {
    this.history = payload.history;
    return firebase.database().ref(`users/${payload.uid}`).child('userDetail').set(payload

      , (err) => {
        if (err) {
          // console.log(err)
          dispatch(createProfileError(err))
          // return AppAction.createProfileError(err)
        } else {
          // console.log("successfull")
          // return firebase.database().ref(`${payload.uid}`).once("value", snapShot => {
          // console.log(snapShot.val())
          dispatch(createProfileSuccess(payload))
          this.history.navigate('Login');
          // return AppAction.createProfileSuccess("Success")
          // })
        }
      });
  }
}
export function profileAction(userID) {
  return dispatch => {
    // console.log(userID, 'phonennnnn')
    dispatch(GetProfileProgress());

    firebase.database().ref(`users`).child(userID).on('child_added', snapshot => {
      let user = snapshot.val();
      // console.log(user, 'data')

      dispatch(GetProfileSuccess(user))
    })
  }
}
// export default class AppAction {
//   // create profile //
//   static createProfileProgress(obj) {
// console.log(obj);
//     return {
//       type: ActionTypes.CREATE_PROFILE_PROGRESS,
//       payload: obj
//     };
//   }
//   static createProfileSuccess(obj) {
// console.log(obj);
//     return {
//       type: ActionTypes.CREATE_PROFILE_SUCCESS,
//       payload: obj
//     };
//   }
//   static createProfileError(obj) {
//     return {
//       type: ActionTypes.CREATE_PRIFILE_ERROR,
//       payload: obj
//     };
//   }

//   // Get Profile //
//   static GetProfileProgress() {
// console.log(obj);
//     return {
//       type: ActionTypes.GET_PROFILE_PROGRESS,
//       payload: "ammar"
//     };
//   }
//   static GetProfileSuccess(obj) {
//     console.log(obj);
//     return {
//       type: ActionTypes.GET_PROFILE_SUCCESS,
//       payload: obj
//     };
//   }
//   static GetProfileError(obj) {
//     return {
//       type: ActionTypes.GET_PROFILE_ERROR,
//       payload: obj
//     };
//   }
// }

function createProfileProgress() {
  return {
    type: ActionTypes.createProfileProgress
  }
}
function createProfileSuccess(obj) {
  return {
    type: ActionTypes.CREATE_PROFILE_SUCCESS,
    payload: obj
  }
}
function createProfileError(err) {
  return {
    type: ActionTypes.CREATE_PRIFILE_ERROR,
    payload: err
  }
}

function GetProfileProgress() {
  // console.log(obj);
  return {
    type: ActionTypes.GET_PROFILE_PROGRESS,
    // payload: "ammar"
  };
}
function GetProfileSuccess(obj) {
  // console.log(obj);
  return {
    type: ActionTypes.GET_PROFILE_SUCCESS,
    payload: obj
  };
}
function GetProfileError(obj) {
  return {
    type: ActionTypes.GET_PROFILE_ERROR,
    payload: obj
  };
}
















//////////////////////////////////////// chat /////////////////////////////////


export function UserList() {
  return dispatch => {

  }
}


/////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////// Public Profile Page /////////////////////////////////////
export function getAllUser() {
  return dispatch => {
    firebase.database().ref('users').on('value', (snapshot) => {
      let userList = snapshot.val(),

        userListKeys = Object.keys(userList);
      console.log(userListKeys, "9999999999999999999999999999999999999999999999999999999999")
      let arrList = [];

      userListKeys.map(i => {
        if (userList[i].userDetail) {
          let obj = {
            // uid: userList[i].userAuth,
            address: userList[i].userDetail.address,
            city: userList[i].userDetail.city,
            company: userList[i].userDetail.company,
            country: userList[i].userDetail.country,
            email: userList[i].userDetail.email,
            name: userList[i].userDetail.name,
            occupation: userList[i].userDetail.occupation,
            phoneNumber: userList[i].userDetail.phoneNumber,
            website: userList[i].userDetail.website,
            uid: userList[i].userDetail.uid,
            url: userList[i].userDetail.url
            // friend_list: userList[i].FriendList,

          }
          arrList.push(obj)
        }
      });


      // console.log(arrList, 'userList')
      dispatch(publicProfileSuccess(arrList))
    })
  }
}


function publicProfileSuccess(data) {
  return {
    type: ActionTypes.GET_ALL_USER_PUBLIC_SUCCESS,
    payload: data
  }
}

export function friendRequestAction(payload, CurrUser, friendUid) {
  return dispatch => {

    let msgId = firebase
      .database()
      .ref("Friend Request")
      .child(CurrUser)
      .child(friendUid)
      .push().key;

    let updates = {};

    let Friend_Request = {

      to: friendUid,
      from: CurrUser,
      status: "send request"
    };
    let Friend_Accept = {

      to: CurrUser,
      from: friendUid,
      status: "accept request"
    };
    updates[
      `Friend Request/${CurrUser}/${friendUid}/${msgId}`
    ] = Friend_Request;
    updates[
      `Friend Request/${friendUid}/${CurrUser}/${msgId}`
    ] = Friend_Accept;

    firebase
      .database()
      .ref()
      .update(updates);



    firebase.database().ref(`friend_requst_function/${CurrUser}`).push({
      sender_id: CurrUser,
      accepter_id: friendUid
    })

  }
}

export function acceptRequestAction(payload, Current_User_Detail, CurrUser, friendUid) {
  return dispatch => {

    //accept request 
    //accept request
    firebase
      .database()
      .ref(`users/${CurrUser}`).child(`FriendList/${friendUid}`)
      .set(payload);

    firebase
      .database()
      .ref(`users/${friendUid}`).child(`FriendList/${CurrUser}`)
      .set(Current_User_Detail);
    //accept request
    //accept request
    // const BothAreFriend = "yes"

    firebase.database().ref(`Friend Request/${CurrUser}/${friendUid}/`).update({
      BothAreFriend: "yes"
    });
    firebase.database().ref(`Friend Request/${friendUid}/${CurrUser}/`).update({
      BothAreFriend: "yes"
    });

  }
}
export function declineRequestAction(payload, Current_User_Detail, CurrUser, friendUid, status) {
  return dispatch => {

    const ref = firebase.database().ref("Friend Request").child(CurrUser).child(friendUid)
    ref.orderByChild("status").equalTo(status.status).once("value", function (snapshot) {
      snapshot.forEach(function (employee) {
        employee.ref.remove({ status: status });
      })
    });

    const ref1 = firebase.database().ref("Friend Request").child(friendUid).child(CurrUser)
    ref1.orderByChild("status").equalTo("send request").once("value", function (snapshot) {
      snapshot.forEach(function (employee) {
        employee.ref.remove({ status: "send request" });
      })
    });
  }


}

export function FriendRequestList(payload) {
  return dispatch => {
    dispatch(GetRequestUser(payload));

  }
}


function GetRequestUser(payload) {
  return {
    type: ActionTypes.Get_USER_REQ,
    payload: payload
  }
}

export function All_Message_Action(user, user_ID) {
  return dispatch => {
    firebase
      .database()
      .ref("messages")
      .child(user)
      .child(user_ID)
      .on("value", snapshot => {
        let user = snapshot.val();
        if (user !== null) {
          let All_message = Object.values(user);
          // console.log("all message", All_message)
          let array = []
          array.push(All_message)

          dispatch(Get_All_Messsage(All_message));
        } else {

        }
      });
  }
}

function Get_All_Messsage(All_message) {
  return {
    type: ActionTypes.GET_ALL_MESSAGES,
    payload: All_message
  }
}


export function GetUserAction(userID) {
  return dispatch => {
    // console.log(userID, 'phonennnnn')
    dispatch(GetProfileProgress());

    firebase.database().ref(`users`).child(userID).child('Experience').on('value', snapshot => {
      let user = snapshot.val();
      if (user !== null) {
        let ExperienceList = Object.values(user)
        let array = []
        array.push(ExperienceList)


        dispatch(GetExperience(ExperienceList))
      }
      else { }

    })
  }
}


function GetExperience(array) {
  // console.log(array);
  return {
    type: ActionTypes.GET_Experience_SUCCESS,
    payload: array
  };
}

export function getSkillAction(userID) {
  return dispatch => {
    // console.log(userID, 'phonennnnn')
    dispatch(GetProfileProgress());

    firebase.database().ref(`users`).child(userID).child('Skills').on('value', snapshot => {
      let user = snapshot.val();
      if (user !== null) {
        let skillkeys = Object.values(user);
        console.log("add skill", skillkeys)
        let array = []
        array.push(skillkeys)

        dispatch(GetSkill(skillkeys));
      } else {

      }

    })
  }
}

function GetSkill(skillkeys) {
  // console.log(array);
  return {
    type: ActionTypes.GET_Skill_SUCCESS,
    payload: skillkeys
  };
}

export function getSkillnewarrayAction() {
  return dispatch => {
    dispatch(GET_Skill_NEW_ARRAY())
  }

}

function GET_Skill_NEW_ARRAY() {
  // console.log(array);
  return {
    type: ActionTypes.GET_Skill_NEW_ARRAY,

  };
}



export function getTextDetectorAction(TextDetector) {
  return dispatch => {

    dispatch(GetTextProgress());
    let array = []
    if (TextDetector !== null) {

      dispatch(GetTextSuccess(TextDetector));
    } else {
      // array.push(TextDetector)

    }

  }
}

function GetTextProgress() {
  // console.log(array);
  return {
    type: ActionTypes.GET_TEXT_PROGRESS,

  };
}

function GetTextSuccess(TextDetector) {
  // console.log(array);
  return {
    type: ActionTypes.GET_TEXT_SUCCESS,
    payload: TextDetector
  };
}


export function getAllMessageList(userID) {
  return dispatch => {


    let dbRef = firebase.database().ref(`users/${userID}/FriendList`);
    dbRef.on("child_added", async val => {
      let messageList = val.val();

      if (messageList !== null) {
        let messageKeys = Object.values(messageList);
        console.log("add messageKeys", messageKeys)
        let array = []
        array.push(messageKeys)

        dispatch(GetMessageList(messageKeys));
      } else {

      }



    });

  }
}

function GetMessageList(messageKeys) {
  // console.log(array);
  return {
    type: ActionTypes.GET_MESSAGE_LIST,
    payload: messageKeys
  };
}