import React, { useState, useEffect } from "react";
import QuestionnaireView from "./QuestionnaireView";
import { questionChange } from "../../redux/modules/survey";
import { connect } from "react-redux";
import axios from "axios";

const QuestionnaireContainer = ({ questionChange, survey }) => {
  const [innerCurSlide, setInnerCurSlide] = useState(0);
  const [isContactPeopleModalOn, setContactPeopleModal] = useState(false);
  const [todaySurveyDone, setTodaySurvey] = useState(false);
  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:5050/api/survey/user/5e80dee8e7466b1f0837f5e7/last`
    );
    const { data } = response;
    if (new Date(data.date).toDateString() === new Date().toDateString()) {
      setTodaySurvey(true);
      if (data.cough) {
        questionChange(5, 6);
      } else {
        questionChange(4, 5);
      }
    }
  }, []);
  return (
    <QuestionnaireView
      questionChange={questionChange}
      innerCurSlide={innerCurSlide}
      setInnerCurSlide={setInnerCurSlide}
      isContactPeopleModalOn={isContactPeopleModalOn}
      setContactPeopleModal={setContactPeopleModal}
      survey={survey}
      todaySurveyDone={todaySurveyDone}
    />
  );
};

const mapStateToProps = state => ({
  survey: state.survey
});

const mapDispatchToProps = dispatch => {
  return {
    questionChange: (questionNumber, questionsCount) =>
      dispatch(questionChange(questionNumber, questionsCount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireContainer);
