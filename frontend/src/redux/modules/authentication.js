import axios from "axios";
//ACTION TYPES---------------------------------
const AUTHENTICATE_USER_REQUEST = "AUTHENTICATE_USER_REQUEST";
const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
const AUTHENTICATE_USER_FAIL = "AUTHENTICATE_USER_FAIL";
const TOKEN_AUTH_FAILED = "TOKEN_AUTH_FAILED";
const TOKEN_AUTH_REQUEST = "TOKEN_AUTH_REQUEST";
const TOKEN_AUTH_SUCCESS = "TOKEN_AUTH_SUCCESS";
const LOGOUT_USER = "LOGOUT_USER";

export const logoutUser = () => ({
    type: LOGOUT_USER
  });

export const checkToken = token => async dispatch => {
    dispatch(tokenAuthRequest());
    if (!token || token === "") {
      dispatch(tokenAuthFailed());
    }
    console.log('token przed wysylka : ',token)
    try {
      const userResponse = await axios.get("/user/token",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      dispatch(tokenAuthSuccess(userResponse.data))  
    } catch (error) {
      dispatch(tokenAuthFailed(error));
    }
};

const tokenAuthFailed = (error) => ({
    type: TOKEN_AUTH_FAILED,
    payload: error
  });
  
  const tokenAuthRequest = () => ({
    type: TOKEN_AUTH_REQUEST
  });
  
  const tokenAuthSuccess = user => ({
    type: TOKEN_AUTH_SUCCESS,
    payload: user
  });

export const authenticateUser = user => async dispatch => {
    dispatch(requestAuthentication());
    try {
      const response = await axios.post("/user/login", user);
      dispatch(authenticatedSuccess(response.data.user));
      sessionStorage.setItem("jwtToken", response.data.token);
    } catch (error) {
      dispatch(authenticationFail(error));
      throw error.response.data.message;
    }
  };
  
  const requestAuthentication = () => ({
    type: AUTHENTICATE_USER_REQUEST
  });
  
  const authenticatedSuccess = user => ({
    type: AUTHENTICATE_USER_SUCCESS,
    payload: user
  });
  
  const authenticationFail = error => ({
    type: AUTHENTICATE_USER_FAIL,
    payload: error
  });

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: true,
  error: null,
};
//AUTH REDUCER--------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
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

      case TOKEN_AUTH_REQUEST:
        return {
          ...state,
          loading: true
        };
      case TOKEN_AUTH_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          error: null
        };
      case TOKEN_AUTH_FAILED:
        return {
          ...state,
          error: action.payload,
          loading: false,
          isAuthenticated: false,
          user: {}
        }
        case LOGOUT_USER:
            return {
              ...state,
              error: action.payload,
              loading: false,
              isAuthenticated: false,
              user: {}
            };
    default:
      return state;
  }
};