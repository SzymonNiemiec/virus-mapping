import React, { useEffect } from "react";
import SidebarView from "./SidebarView";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/modules/authentication";
import { questionChange } from "../../redux/modules/survey";

import axios from "axios";

const SidebarContainer = ({ survey, logoutUser, user }) => {
  const coronavirusFound = () => {
    console.log("coronavirusFound");
    axios.patch(`http://localhost:5050/api/user/${user._id}/illness`, {
      "name": "COVID-19",
      "illnessDate": new Date()
    })
  };
  useEffect(() => {
    async function getLastSurvey() {
      const response = await axios.get(
        `http://localhost:5050/api/survey/user/5e80dee8e7466b1f0837f5e7/last`
      );
      const { data } = response;
      if (new Date(data.date).toDateString() === new Date().toDateString()) {
        if (data.cough) {
          questionChange(5, 6);
        } else {
          questionChange(4, 5);
        }
      }
    }
    getLastSurvey()
  }, []);
  return (
    <SidebarView
      logoutUser={logoutUser}
      percentage={survey.percentage}
      questionsCount={survey.questionsCount}
      questionsAnswered={survey.questionsAnswered}
      coronavirusFound={coronavirusFound}
    />
  );
};

const mapStateToProps = state => ({
  survey: state.survey,
  user: state.authentication.user
});

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    questionChange: (questionNumber, questionsCount) =>
      dispatch(questionChange(questionNumber, questionsCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
