import axios from "axios";
//ACTION TYPES---------------------------------
const AUTHENTICATE_USER_REQUEST = "AUTHENTICATE_USER_REQUEST";
const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
const AUTHENTICATE_USER_FAIL = "AUTHENTICATE_USER_FAIL";

//ACTIONS-------------------------------------

export const authenticateUser = user => async dispatch => {
  dispatch(requestAuthentication());
  try {
    const response = await axios.post(
      "/user/login",
      user
    );
    dispatch(authenticatedSuccess(response.data.user));
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
})

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: true,
  error: null
};
//AUTH REDUCER--------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
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