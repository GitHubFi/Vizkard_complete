import actionTypes from "../actionTypes";

let INITIAL_STATE = {
  isProgress: false,
  isError: false,
  errorTest: null,
  currentUser: {},
  userID: {},
  phoneNumber: "",
  FriendReqUser: [],
  ADDFRIEND: false,
  userRegister_Uid:null,

  Signup_Progress: false,
  SignUpErrorMessage: null,
  SignUPError: false

  // SignPhoneNumber:''
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //
    case actionTypes.SIGNIN_PROGRESS://
      return { ...state, isProgress: true, };

    case actionTypes.SIGNIN_SUCCESSFUL_VERIFY://
      return { ...state, isError: false, isProgress: false, userID: action.payload, }

    case actionTypes.SIGNIN_REJECTED://////////////////
      return { ...state, isProgress: false, isError: true, errorTest: action.error }



    case actionTypes.SIGNIN_PROGRESS_VERIFY:
      return { ...state, isProgress: false };
    //


    case actionTypes.SIGNIN_REJECTED_VERIFY:
      return { ...state, isError: true, isProgress: false, errorTest: action.payload }

    case actionTypes.Get_USER_REQ:
      return { ...state, FriendReqUser: action.payload, ADDFRIEND: false }

    case actionTypes.SIGNUP_PROGRESS://
      return { ...state, Signup_Progress: true, };

    case actionTypes.SIGNIN_SUCCESSFUL:// register action
      return { ...state, Signup_Progress: false, currentUser: action.payload, userID: action.uid,userRegister_Uid:action.uid, phoneNumber: action.phoneNumber, SignUPError: false }
    //

    case actionTypes.SIGNUP_ERROR://////////////////
      return { ...state, Signup_Progress: false, SignUPError: true, SignUpErrorMessage: action.message }






    default:
      return state;
  }
};
