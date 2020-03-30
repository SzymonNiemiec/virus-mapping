import axios from "axios";
import moment from 'moment';
//ACTION TYPES---------------------------------
const GET_USER_FRIENDS_REQUEST = "GET_USER_FRIENDS_REQUEST";
const GET_USER_FRIENDS_SUCCESS = "GET_USER_FRIENDS_SUCCESS";
const GET_USER_FRIENDS_FAIL = "GET_USER_FRIENDS_FAIL";

//ACTIONS-------------------------------------

export const getLastSurvey = friendId => async dispatch => {
    dispatch(getLastSurveyRequest())
    try{
        const response = await axios.get(`http://localhost:5050/api/survey/user/${friendId}/last`);
        if(response.data.date){
            dispatch(getLastSurveySuccess({friendId: friendId, surveyMade: true, daysPast : moment().diff(response.data.date, 'days') }))
        } else {
            dispatch(getLastSurveySuccess({friendId: friendId, surveyMade: false, daysPast : -1 }))
        }
    } catch (error){
        dispatch(getLastSurveyFail(error))
    }
}

const GET_LAST_SURVEY_REQUEST = "GET_LAST_SURVEY_REQUEST"
const GET_LAST_SURVEY_SUCCESS = "GET_LAST_SURVEY_SUCCESS"
const GET_LAST_SURVEY_FAIL = "GET_LAST_SURVEY_FAIL"

const getLastSurveyRequest = () => ({
    type: GET_LAST_SURVEY_REQUEST
})

const getLastSurveySuccess = (lastSurvey) => ({
    type: GET_LAST_SURVEY_SUCCESS,
    payload: lastSurvey
})

const getLastSurveyFail = (error) => ({
    type: GET_LAST_SURVEY_FAIL,
    payload: error
})

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
  friends: [],
  surveyMade: []
};
//AUTH REDUCER--------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    //authenticate user call
    case GET_LAST_SURVEY_SUCCESS:
        return {
            ...state,
            surveyMade : [...state.surveyMade, {friendId: action.payload.friendId, surveyMade: action.payload.surveyMade, daysPast: action.payload.daysPast}]
        }
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