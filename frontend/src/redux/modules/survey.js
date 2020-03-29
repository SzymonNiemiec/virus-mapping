import axios from "axios";
//ACTION TYPES---------------------------------
const CHANGE_QUESTION = "CHANGE_QUESTION";

//ACTIONS-------------------------------------

export const questionChange = (questionNumber) => ({
    type: CHANGE_QUESTION,
    payload: questionNumber
})


const initialState = {
  loading: false,
  error: null,
  percentage: 0,
  questionsCount: 6,
  questionsAnswered: 0
};
//AUTH REDUCER--------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    //authenticate user call
    case CHANGE_QUESTION:
      return {
        ...state,
        questionsAnswered: action.payload,
        percentage: Math.round(action.payload / state.questionsCount * 100)
      };
    default:
      return state;
  }
};