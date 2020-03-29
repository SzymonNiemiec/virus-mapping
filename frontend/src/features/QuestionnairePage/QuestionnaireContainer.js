import React, { useState } from "react";
import QuestionnaireView from "./QuestionnaireView";
import {questionChange} from '../../redux/modules/survey';
import {connect} from 'react-redux';

const QuestionnaireContainer = ({questionChange}) => {
    const [innerCurSlide, setInnerCurSlide] = useState(0);
    return (
        <QuestionnaireView questionChange={questionChange} innerCurSlide={innerCurSlide} setInnerCurSlide={setInnerCurSlide} />
    )
}

const mapStateToProps = state => ({
    survey: state.survey
  });
  
  const mapDispatchToProps = dispatch => {
    return {
        questionChange: (questionNumber) => dispatch(questionChange(questionNumber))
    };
  };


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionnaireContainer);