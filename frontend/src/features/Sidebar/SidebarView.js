import React, { useState } from "react";
import styled from 'styled-components';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FriendsIcon from "../Shared/assets/network.svg";
import SurveyIcon from "../Shared/assets/survey.svg";





const SidebarView = ({percentage,questionsAnswered,questionsCount}) => {
    return (
        <SidebarWrapper>
            <SidebarProgressTitle>Today Progress</SidebarProgressTitle>
            <ProgressRingContainer>
                <CircularProgressbarWithChildren value={percentage} >
                    <InsideRingContainer>
                        <PercentageText>{percentage}%</PercentageText>
    <QuestionsCountText>{questionsAnswered}/{questionsCount}</QuestionsCountText>
                    </InsideRingContainer>
                </CircularProgressbarWithChildren>
            </ProgressRingContainer>
            <NavigationList>
                <a href="./questionnaire"><NavigationItem><NavIcon src={SurveyIcon} /><NavText>Survey</NavText></NavigationItem></a>
                <a href="./friends"><NavigationItem><NavIcon src={FriendsIcon} /><NavText>Friends</NavText></NavigationItem></a>
            </NavigationList>
        </SidebarWrapper>
    )
}

export default SidebarView;

const NavigationList = styled.ul`
width: 100%;
margin-top: 20px;
`

const NavigationItem = styled.li`
height: 50px;
display: flex;
justify-content: center;
align-items: center;
`

const NavText = styled.span`
    font-size: 18px;
    font-weight: bold;
`

const SidebarProgressTitle = styled.h2`
text-align: center;
`

const SidebarWrapper = styled.div`

`

const ProgressRingContainer = styled.div`
    width: 200px;
    margin: 0 auto;
`

const PercentageText = styled.div`
    font-size: 48px;
    font-weight: bold;
    color: #F24338;
`

const QuestionsCountText = styled.div`
    font-size: 16px;
    color: #C4C4C4;
`
const InsideRingContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

const NavIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`