import axios from "axios";
//ACTION TYPES---------------------------------
const GET_USER_FRIENDS_REQUEST = "GET_USER_FRIENDS_REQUEST";
const GET_USER_FRIENDS_SUCCESS = "GET_USER_FRIENDS_SUCCESS";
const GET_USER_FRIENDS_FAIL = "GET_USER_FRIENDS_FAIL";

//ACTIONS-------------------------------------

export const getUserFriends = userId => async dispatch =>{
    dispatch(getUserFriendsRequest())
    try{
        const response = await axios.get(
            `http://localhost:5050/api/user/${userId}/friends`
          );
          const { data } = response;
          dispatch(getUserFriendsSuccess(data.friends));
    } catch (err){
        console.log(err)
    }
}

const getUserFriendsRequest = () => ({
    type: GET_USER_FRIENDS_REQUEST
})

const getUserFriendsSuccess = friends => ({
    type: GET_USER_FRIENDS_SUCCESS,
    payload:friends
})

const initialState = {
  loading: false,
  friends: []
};
//AUTH REDUCER--------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    //authenticate user call
    case GET_USER_FRIENDS_SUCCESS:
        return {
            ...state,
            loading: false,
            friends: action.payload
        }
case GET_USER_FRIENDS_REQUEST:
    return {
        ...state,
        loading: true
    }
    default:
      return state;
  }
};