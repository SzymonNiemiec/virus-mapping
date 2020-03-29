import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styled from "styled-components";
import Input from "../Shared/Input";
import { Formik } from 'formik';
import Button from "../Shared/Button";

const QuestionnaireView = ({ innerCurSlide, setInnerCurSlide,questionChange }) => {
    
    return (
        <Wrapper>
            <Formik
                initialValues={{
                    temperature: 36.6,
                    breathingProblems: false,
                    cough: false,
                    coughType: false,
                    tired: false,
                    hasContact: false
                }}
                enableReinitialize
                // validationSchema={}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({
                    values,
                    errors,
                    setFieldValue,
                    setFieldError,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => {
                    const isDisabled = ((!values.cough && innerCurSlide === 4) || (values.cough && innerCurSlide === 5));
                    return(
                        <Form onSubmit={handleSubmit}>
                            <CarouselProvider
                                naturalSlideWidth={500}
                                naturalSlideHeight={500}
                                totalSlides={6}
                                dragEnabled={false}
                            >
                                <StyledSlider>
                                    <StyledSlide index={0}>
                                        <QuestionCounter>Question 1/6</QuestionCounter>
                                        <Question>What is your body temperature?</Question>
                                        <Input name="temperature" type="number" min="30" max="45" step="0.1" value={values.temperature} onChange={handleChange} />

                                    </StyledSlide>
                                    <StyledSlide index={1}>
                                        <QuestionCounter>Question 2/6</QuestionCounter>
                                        <Question>Do you have breathing problems?</Question>
                                        <ButtonWrapper>
                                            <DecisionButton type="button" active={values.breathingProblems ? true : false} onClick={() => setFieldValue('breathingProblems', true)}>Yes</DecisionButton>
                                            <DecisionButton type="button" active={values.breathingProblems ? false : true} onClick={() => setFieldValue('breathingProblems', false)}>No</DecisionButton>
                                        </ButtonWrapper>

                                    </StyledSlide>
                                    <StyledSlide index={2}>
                                        <QuestionCounter>Question 3/6</QuestionCounter>
                                        <Question>Do you have a cough?</Question>
                                        <ButtonWrapper>
                                            <DecisionButton type="button" active={values.cough ? true : false} onClick={() => setFieldValue('cough', true)}>Yes</DecisionButton>
                                            <DecisionButton type="button" active={values.cough ? false : true} onClick={() => setFieldValue('cough', false)}>No</DecisionButton>
                                        </ButtonWrapper>
                                    </StyledSlide>
                                    {values.cough && <StyledSlide index={3}>
                                        <QuestionCounter>Question 4/6</QuestionCounter>
                                        <Question>What type of cough do you have?</Question>
                                        <ButtonWrapper>
                                            <DecisionButton type="button" active={values.coughType ? true : false} onClick={() => setFieldValue('coughType', true)}>dry</DecisionButton>
                                            <DecisionButton type="button" active={values.coughType ? false : true} onClick={() => setFieldValue('coughType', false)}>wet</DecisionButton>
                                        </ButtonWrapper>
                                    </StyledSlide>}
                                    <StyledSlide index={4}>
                                        <QuestionCounter>Question 5/6</QuestionCounter>
                                        <Question>Do you feel tired?</Question>
                                        <ButtonWrapper>
                                            <DecisionButton type="button" active={values.tired ? true : false} onClick={() => setFieldValue('tired', true)}>Yes</DecisionButton>
                                            <DecisionButton type="button" active={values.tired ? false : true} onClick={() => setFieldValue('tired', false)}>No</DecisionButton>
                                        </ButtonWrapper>
                                    </StyledSlide>
                                    <StyledSlide index={5}>
                                        <QuestionCounter>Question 6/6</QuestionCounter>
                                        <Question>Did you have contact with someone during your day?</Question>
                                        <ButtonWrapper>
                                            <DecisionButton type="button" active={values.hasContact ? true : false} onClick={() => setFieldValue('hasContact', true)}>Yes</DecisionButton>
                                            <DecisionButton type="button" active={values.hasContact ? false : true} onClick={() => setFieldValue('hasContact', false)}>No</DecisionButton>
                                        </ButtonWrapper>
                                    </StyledSlide>
                                </StyledSlider>
                                <ButtonWrapper>
                                    <StyledButtonBack onClick={() => {setInnerCurSlide(innerCurSlide - 1);  innerCurSlide === 3 ? values.cough ? questionChange(innerCurSlide - 1) : questionChange(innerCurSlide - 2) : questionChange(innerCurSlide - 1) }}>Back</StyledButtonBack>
                                    <StyledButtonNext
                                        onClick={() => {
                                            setInnerCurSlide(innerCurSlide + 1);
                                            console.log(values.cough)
                                            questionChange(innerCurSlide + 1)
                                        }}
                                        disabled={isDisabled ? true : false}>Next</StyledButtonNext>
                                </ButtonWrapper>

                            </CarouselProvider>
                            <CenterBox isDisabled={isDisabled}>
                            <StyledButton type="submit" variant="primary" >Submit Questionnaire</StyledButton>
                            </CenterBox>
                        </Form>
                    )}
                }
            </Formik>
        </Wrapper>
    )
}

export default QuestionnaireView;

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`


const QuestionCounter = styled.p`
color: #C4C4C4;
`

const Question = styled.p`
color: ${({ theme }) => theme.primary};
font-size: 1.8rem;
text-align: center;
margin-bottom: 30px;
`
const SimpleButton = `
background-color: #FFF8F8;
border: 2px solid #FFF8F8;
padding: 10px 15px;
border-radius: 10px;
`;

const StyledButtonBack = styled(ButtonBack)`
${SimpleButton};
`;

const StyledButtonNext = styled(ButtonNext)`
${SimpleButton};
`;

const StyledSlider = styled(Slider)`
width: 500px;
height: 500px;
`
const StyledSlide = styled(Slide)`
> div {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

`

const ButtonWrapper = styled.div`
display: flex;
justify-content: space-around;
width: 100%;
`

const Form = styled.form`
    padding-top: 20px;
    width:450px;
`;

const DecisionButton = styled.button`
padding: 10px 20px;
    border-radius: 10px;
    background-color: #dadce0;
    border: 1px solid #dadce0;
${({ active }) => active && `
color: red;
`}
`

const CenterBox = styled.div`
    text-align:center;
    ${({isDisabled}) => isDisabled === true ? `
visibility: visible;
` : `
visibility: hidden;
`}
`;

const StyledButton = styled(Button)`
margin-top: 20px;

`