import actionTypes from "../actionTypes";

let INITIAL_STATE = {
    isProgress: false,
    isError: false,
    errorTest: "",
    userDetail: {},
    allUserPublicList: [],
    All_Experience: null,
    All_Skill: null,
    All_Message: null,
    getTextDetected: null,
    GET_ALL_MESSAGE_LIST: null

};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PROFILE_PROGRESS:
            return { ...state, isProgress: true };
        case actionTypes.CREATE_PROFILE_SUCCESS:
            return { ...state, isProgress: false, userDetail: action.payload };
        case actionTypes.CREATE_PRIFILE_ERROR:
            return { ...state, isError: true, isProgress: false, errorTest: action.payload };
        case actionTypes.GET_PROFILE_PROGRESS:
            return { ...state, isProgress: true };
        case actionTypes.GET_PROFILE_SUCCESS:
            return { ...state, isProgress: false, userDetail: action.payload };
        case actionTypes.GET_PROFILE_ERROR:
            return { ...state, isError: true, isProgress: false, errorTest: action.payload };
        case actionTypes.GET_ALL_USER_PUBLIC_SUCCESS:
            return { ...state, allUserPublicList: action.payload };
        case actionTypes.GET_Experience_SUCCESS:
            return { ...state, All_Experience: action.payload };
        case actionTypes.GET_Skill_SUCCESS:

            return { ...state, All_Skill: action.payload };

        case actionTypes.GET_ALL_MESSAGES:

            return { ...state, All_Message: action.payload.reverse() };

        case actionTypes.GET_Skill_NEW_ARRAY:
            return { ...state, All_Skill: null };

        case actionTypes.GET_TEXT_SUCCESS:
            return { ...state, getTextDetected: action.payload };

        case actionTypes.GET_MESSAGE_LIST:
            return { ...state, GET_ALL_MESSAGE_LIST: action.payload };

        // case actionTypes.GET_HIDE_CITY:
        //     return { ...state, hide_city: action.payload };

        // case actionTypes.GET_HIDE_PHONE:
        //     return { ...state, hide_phone: action.payload };
        // case actionTypes.GET_PROFESSION_PHONE:
        //     return { ...state, hide_profession: action.payload };

        default:
            return state;
    }
};
