import React, { useState } from "react";
import QuestionnaireView from "./QuestionnaireView";
import { questionChange } from "../../redux/modules/survey";
import { connect } from "react-redux";

const QuestionnaireContainer = ({ questionChange, survey }) => {
  const [innerCurSlide, setInnerCurSlide] = useState(0);
  const [isContactPeopleModalOn, setContactPeopleModal] = useState(false);
  return (
    <QuestionnaireView
      questionChange={questionChange}
      innerCurSlide={innerCurSlide}
      setInnerCurSlide={setInnerCurSlide}
      isContactPeopleModalOn={isContactPeopleModalOn}
      setContactPeopleModal={setContactPeopleModal}
      survey={survey}
    />
  );
};

const mapStateToProps = state => ({
  survey: state.survey
});

const mapDispatchToProps = dispatch => {
  return {
    questionChange: (questionNumber,questionsCount) => dispatch(questionChange(questionNumber, questionsCount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireContainer);
