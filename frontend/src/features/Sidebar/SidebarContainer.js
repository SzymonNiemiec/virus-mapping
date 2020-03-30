import React, { useState } from "react";
import SidebarView from './SidebarView'
import { connect } from "react-redux";
import {logoutUser} from '../../redux/modules/authentication'

const SidebarContainer = ({survey,logoutUser}) => {
    return (
        <SidebarView logoutUser={logoutUser} percentage={survey.percentage} questionsCount={survey.questionsCount} questionsAnswered={survey.questionsAnswered} />
    )
}


const mapStateToProps = state => ({
    survey: state.survey
  });
  
  const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
  };


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidebarContainer);
