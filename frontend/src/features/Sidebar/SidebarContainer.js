import React from "react";
import SidebarView from './SidebarView'
import { connect } from "react-redux";

const SidebarContainer = ({survey}) => {
    return (
        <SidebarView percentage={survey.percentage} questionsCount={survey.questionsCount} questionsAnswered={survey.questionsAnswered} />
    )
}


const mapStateToProps = state => ({
    survey: state.survey
  });
  
  const mapDispatchToProps = dispatch => {
    return {

    };
  };


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidebarContainer);
