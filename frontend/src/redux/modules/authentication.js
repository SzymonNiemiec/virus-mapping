import axios from "axios";
//ACTION TYPES---------------------------------
const AUTHENTICATE_USER_REQUEST = "AUTHENTICATE_USER_REQUEST";
const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
const AUTHENTICATE_USER_FAIL = "AUTHENTICATE_USER_FAIL";

//ACTIONS-------------------------------------

// export const authenticateUser = user => async dispatch => {
//   dispatch(requestAuthentication());
//   try {
//     const response = await axios.post(
//       "/user/login",
//       user
//     );
//     dispatch(authenticatedSuccess(response.data.user));
//   } catch (error) {
//     dispatch(authenticationFail(error));
//     throw error.response.data.message;
//   }
// };

// const requestAuthentication = () => ({
//   type: AUTHENTICATE_USER_REQUEST
// });

// const authenticatedSuccess = user => ({
//   type: AUTHENTICATE_USER_SUCCESS,
//   payload: user
// });

// const authenticationFail = error => ({
//   type: AUTHENTICATE_USER_FAIL,
//   payload: error
// })
export const checkUserFromFacebook = user => async dispatch => {
    dispatch(checkUserFromFacebookRequest())
    try {
        const response = await axios.post("/user/checkFacebook" , user)
        dispatch(checkUserFromFacebookSuccess(response.data))
    } catch(error){
        dispatch(checkUserFromFacebookFail(error))
    } 
}

const CHECK_USER_FROM_FACEBOOK_REQUEST = "CHECK_USER_FROM_FACEBOOK_REQUEST";
const CHECK_USER_FROM_FACEBOOK_SUCCESS = "CHECK_USER_FROM_FACEBOOK_SUCCESS";
const CHECK_USER_FROM_FACEBOOK_FAIL = "CHECK_USER_FROM_FACEBOOK_FAIL";

const checkUserFromFacebookRequest = () => ({
    type: CHECK_USER_FROM_FACEBOOK_REQUEST
})

const checkUserFromFacebookSuccess = user => ({
    type: CHECK_USER_FROM_FACEBOOK_SUCCESS,
    payload: user
})

const checkUserFromFacebookFail = error => ({
    type: CHECK_USER_FROM_FACEBOOK_FAIL,
    payload: error
})


const SET_USER_FROM_FACEBOOK = "SET_USER_FROM_FACEBOOK"

export const setUserFromFacebook = user => ({
    type: SET_USER_FROM_FACEBOOK,
    payload: user
})

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: true,
  error: null,
  mongoUser: null
};
//AUTH REDUCER--------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_USER_FROM_FACEBOOK_REQUEST:
        return{
            ...state,
            loading: true
        }
    case CHECK_USER_FROM_FACEBOOK_SUCCESS:
        return{
            ...state,
            loading: false,
            mongoUser: action.payload
        }
    case CHECK_USER_FROM_FACEBOOK_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
    case SET_USER_FROM_FACEBOOK:
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
            loading: false
        } 
    //authenticate user call
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      };
    case AUTHENTICATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};