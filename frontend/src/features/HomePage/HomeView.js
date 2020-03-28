import React from 'react';
import styled from "styled-components";
import HeaderImg from "../Shared/assets/header-img.svg";
import Button from '../Shared/Button';
import { theme } from "../Shared/theme";

const HomeView = () => (
    <Section header>
        <Column>
        <HeadingTop>COVID-19</HeadingTop>
        <HeadingMain>Keep Yourself Home Quarantined</HeadingMain>
        <HeadingSub>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet gravida felis a venenatis. Nullam ut posuere erat, vel auctor mauris. Curabitur eu auctor lore</HeadingSub>
        <HeaderButton variant="primary" size="big">Help to track virus</HeaderButton>
        </Column>
        <Column>
        <HeaderImage src={HeaderImg} />
        </Column>
       
    </Section>
)   


export default HomeView;

const Section = styled.div`
display: flex;
margin: 0 auto;
max-width: 1140px;
flex-direction: column;
margin: 20px;
${({header}) => header && `
 margin-top: 2rem;`}
 ${theme.mq.tablet} {
   flex-direction: row;
 }
`
const Column = styled.div`
width: 100%;
`

const HeadingTop = styled.h2`
color: ${({theme}) => theme.primary};
font-size: 1.5rem;
margin: 0;
${theme.mq.tablet} {
    font-size: 2.2rem;
}
`

const HeadingMain = styled.h1`
font-size: 2rem;
margin-top: 0;
${theme.mq.tablet} {
    font-size: 3rem;
}
`
const HeadingSub = styled.p`
line-height: 2;
font-size: 0.8rem;
${theme.mq.tablet} {
    font-size: 2rem;
}
`

const HeaderImage = styled.img`
width: 80%;
margin: 0 auto;
display: block;
`
const HeaderButton = styled(Button)`
margin: 20px auto;
display: block;
`