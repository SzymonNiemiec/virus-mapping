import axios from "axios";
//ACTION TYPES---------------------------------
const CHANGE_QUESTION = "CHANGE_QUESTION";

//ACTIONS-------------------------------------

export const questionChange = (questionNumber, questionsCount) => ({
    type: CHANGE_QUESTION,
    questionNumber: questionNumber,
    questionsCount: questionsCount
})


const initialState = {
  loading: false,
  error: null,
  percentage: 0,
  questionsCount: 5,
  questionsAnswered: 0
};
//AUTH REDUCER--------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    //authenticate user call
    case CHANGE_QUESTION:
      return {
        ...state,
        questionsAnswered: action.questionNumber,
        percentage: Math.round(action.questionNumber / action.questionsCount * 100),
        questionsCount: action.questionsCount,
      };
    default:
      return state;
  }
};