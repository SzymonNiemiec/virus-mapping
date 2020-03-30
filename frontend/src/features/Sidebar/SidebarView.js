import React from "react";
import styled from "styled-components";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import FriendsIcon from "../Shared/assets/network.svg";
import SurveyIcon from "../Shared/assets/survey.svg";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Button from "../Shared/Button";
import Modal from '../Shared/Modal';

const SidebarView = ({
  logoutUser,
  percentage,
  questionsAnswered,
  questionsCount,
  history,
  coronavirusFound,
  setDragModal,
  isDragModalOn
}) => {
  return (



    <SidebarWrapper>
            <Modal
        type="SimpleQuestionModal"
        show={isDragModalOn}
        question="Are you sure about your ilness?"
        acceptText="Yes"
        cancelText="No"
        onAccept={() => {coronavirusFound()
          setDragModal(false);
        }}
        onCancel={() => setDragModal(false)}
      />
      <CoronaButton variant="primary" onClick={() => setDragModal(true)}>
        I was found to have a coronavirus
      </CoronaButton>
      <SidebarProgressTitle>Today Progress</SidebarProgressTitle>
      <ProgressRingContainer>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            // rotation: 0.25,
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
            // Colors
            pathColor: `rgba(0, 24, 76, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7"
          })}
        >
          <InsideRingContainer>
            <PercentageText>{percentage}%</PercentageText>
            <QuestionsCountText>
              {questionsAnswered + 1}/{questionsCount}
            </QuestionsCountText>
          </InsideRingContainer>
        </CircularProgressbarWithChildren>
      </ProgressRingContainer>
      <NavigationList>
        <NavigationItem>
          <Link to="/questionnaire">
            <NavIcon src={SurveyIcon} />
            <NavText>Survey</NavText>
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link to="/friends">
            <NavIcon src={FriendsIcon} />
            <NavText>Friends</NavText>
          </Link>
        </NavigationItem>
      </NavigationList>
      <LogoutButton
        variant="dark"
        onClick={() => {
          logoutUser();
          sessionStorage.removeItem("jwtToken");
          history.push("/login");
        }}
      >
        Logout
      </LogoutButton>
    </SidebarWrapper>
  );
};

export default withRouter(SidebarView);

const NavigationList = styled.ul`
  width: 100%;
  margin-top: 20px;
`;

const NavigationItem = styled.li`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const NavText = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const SidebarProgressTitle = styled.h2`
  text-align: center;
`;

const SidebarWrapper = styled.div``;

const ProgressRingContainer = styled.div`
  width: 200px;
  margin: 0 auto;
`;

const PercentageText = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #f24338;
`;

const QuestionsCountText = styled.div`
  font-size: 16px;
  color: #c4c4c4;
`;
const InsideRingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const NavIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const LogoutButton = styled(Button)`
  margin: 10px auto;
  display: block;
`;

const CoronaButton = styled(Button)`
  display: block;
  margin: 20px auto;
`;
