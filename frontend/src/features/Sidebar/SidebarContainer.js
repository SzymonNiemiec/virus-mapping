import React from "react";
import SidebarView from "./SidebarView";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/modules/authentication";
import axios from "axios";

const SidebarContainer = ({ survey, logoutUser, user }) => {
  const coronavirusFound = () => {
    console.log("coronavirusFound");
    axios.patch(`http://localhost:5050/api/user/${user._id}/illness`, {
      "name": "COVID-19",
      "illnessDate": new Date()
    })
  };

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
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
