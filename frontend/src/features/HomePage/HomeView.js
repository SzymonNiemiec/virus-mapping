import React from 'react';
import styled from "styled-components";
import HeaderImg from "../Shared/assets/header-img.svg";
import Button from '../Shared/Button';
import { theme } from "../Shared/theme";
import FoodImg from "../Shared/assets/eating-together.svg";
import AirImg from "../Shared/assets/air.svg";
import HumansImg from "../Shared/assets/hang-out.svg";
import {Link } from "react-router-dom";


const HomeView = () => (<Wrapper>
    <Section header>
        <Column>
        <HeadingTop>COVID-19</HeadingTop>
        <HeadingMain>Keep Yourself Home Quarantined</HeadingMain>
        <HeadingSub>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet gravida felis a venenatis. Nullam ut posuere erat, vel auctor mauris. Curabitur eu auctor lore</HeadingSub>
        <StyledLink to="login"><HeaderButton variant="primary" size="big">Help to track virus</HeaderButton></StyledLink>
        </Column>
        <Column>
        <HeaderImage src={HeaderImg} />
        </Column>
       
    </Section>

    <Section spreadTitle>
        <HeadingTitle>How Can It Spreads</HeadingTitle>
        <HeadingDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet gravida felis a venenatis. Nullam ut posuere erat, vel auctor mauris. Curabitur eu auctor lore</HeadingDesc>
    </Section>
    <Section spreadContent>
        <Column>
        <SpreadImage src={FoodImg}/>
        <SpreadTitle>Contaminated Objects & Substances</SpreadTitle>
        <SpreadDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet gravida felis a venenatis.</SpreadDesc>
        </Column>
        <Column>
        <SpreadImage src={AirImg}/>
        <SpreadTitle>Air Transmission of Droplets</SpreadTitle>
        <SpreadDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet gravida felis a venenatis.</SpreadDesc>
        </Column>
        <Column>
        <SpreadImage src={HumansImg}/>
        <SpreadTitle>Transmission Among Humans</SpreadTitle>
        <SpreadDesc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet gravida felis a venenatis.</SpreadDesc>
        </Column>
    </Section>
    </Wrapper>
)   


export default HomeView;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Section = styled.div`
display: flex;
margin: 0 auto;
max-width: 1140px;
flex-direction: column;
margin: 20px;

 ${theme.mq.tablet} {
   flex-direction: row;
   margin: 2rem auto 0;
   ${({spreadTitle}) => spreadTitle && `
flex-direction: column;
`}
 };

`
const Column = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
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
    font-size: 1.2rem;
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

const HeadingTitle = styled.h2`
text-align: center;
`

const HeadingDesc = styled.p`
text-align: center;
width: 80%;
margin: 0 auto;
`

const SpreadImage = styled.img`
width: 150px;
    height: 150px;
    margin: 0 auto;
`

const SpreadTitle = styled.h4`
text-align: center;
color: ${theme.secondary};
`

const SpreadDesc = styled.p`
text-align: center;
`
const StyledLink = styled(Link)`
text-decoration: none;
`