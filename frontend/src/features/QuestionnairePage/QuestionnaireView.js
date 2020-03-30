import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import styled from "styled-components";
import Input from "../Shared/Input";
import { Formik } from "formik";
import Button from "../Shared/Button";
import axios from "axios";
import ContactPeopleModal from "./Modals/ContactPeopleModal";

const QuestionnaireView = ({
  innerCurSlide,
  setInnerCurSlide,
  questionChange,
  setContactPeopleModal,
  isContactPeopleModalOn,
  survey
}) => {
  return (
    <Wrapper>
      <ContactPeopleModal
        isContactPeopleModalOn={isContactPeopleModalOn}
        setContactPeopleModal={setContactPeopleModal}
      />
      <Formik
        initialValues={{
          temperature: 36.6,
          breathingProblems: false,
          cough: false,
          coughType: "dry",
          tiredness: false,
          hasContact: false,
          date: new Date()
        }}

        // validationSchema={}
        onSubmit={values => {
          delete values.hasContact;
          //user mockup
          values.user = "5e80dee8e7466b1f0837f5e7";
          console.log(values);
          axios.post(`http://localhost:5050/api/survey`, values);
        }}
      >
        {({
          values,
          errors,
          setFieldValue,
          setFieldError,
          handleChange,
          handleBlur,
          handleSubmit
        }) => {
          const isDisabled =
            (!values.cough && innerCurSlide === 4) ||
            (values.cough && innerCurSlide === 5);
          return (
            <Form onSubmit={handleSubmit}>
              <CarouselProvider
                naturalSlideWidth={500}
                naturalSlideHeight={500}
                totalSlides={6}
                dragEnabled={false}
              >
                <StyledSlider>
                  <StyledSlide index={0}>
          <QuestionCounter>Question {survey.questionsAnswered+1}/{survey.questionsCount}</QuestionCounter>
                    <Question>What is your body temperature?</Question>
                    <Input
                      name="temperature"
                      type="number"
                      min="30"
                      max="45"
                      step="0.1"
                      value={values.temperature}
                      onChange={handleChange}
                    />
                  </StyledSlide>
                  <StyledSlide index={1}>
                    <QuestionCounter>Question {survey.questionsAnswered+1}/{survey.questionsCount}</QuestionCounter>
                    <Question>Do you have breathing problems?</Question>
                    <ButtonWrapper>
                      <DecisionButton
                        type="button"
                        active={values.breathingProblems ? true : false}
                        onClick={() => setFieldValue("breathingProblems", true)}
                      >
                        Yes
                      </DecisionButton>
                      <DecisionButton
                        type="button"
                        active={values.breathingProblems ? false : true}
                        onClick={() =>
                          setFieldValue("breathingProblems", false)
                        }
                      >
                        No
                      </DecisionButton>
                    </ButtonWrapper>
                  </StyledSlide>
                  <StyledSlide index={2}>
                    <QuestionCounter>Question {survey.questionsAnswered+1}/{survey.questionsCount}</QuestionCounter>
                    <Question>Do you have a cough?</Question>
                    <ButtonWrapper>
                      <DecisionButton
                        type="button"
                        active={values.cough ? true : false}
                        onClick={() => {
                            setFieldValue("cough", true)}}
                      >
                        Yes
                      </DecisionButton>
                      <DecisionButton
                        type="button"
                        active={values.cough ? false : true}
                        onClick={() => {
                            setFieldValue("cough", false)}}
                      >
                        No
                      </DecisionButton>
                    </ButtonWrapper>
                  </StyledSlide>
                  {values.cough && (
                    <StyledSlide index={3}>
                      <QuestionCounter>Question {survey.questionsAnswered+1}/{survey.questionsCount}</QuestionCounter>
                      <Question>What type of cough do you have?</Question>
                      <ButtonWrapper>
                        <DecisionButton
                          type="button"
                          active={values.coughType === "dry" ? true : false}
                          onClick={() => setFieldValue("coughType", "dry")}
                        >
                          dry
                        </DecisionButton>
                        <DecisionButton
                          type="button"
                          active={values.coughType === "dry" ? false : true}
                          onClick={() => setFieldValue("coughType", "wet")}
                        >
                          wet
                        </DecisionButton>
                      </ButtonWrapper>
                    </StyledSlide>
                  )}
                  <StyledSlide index={4}>
                    <QuestionCounter>Question {survey.questionsAnswered+1}/{survey.questionsCount}</QuestionCounter>
                    <Question>Do you feel tired?</Question>
                    <ButtonWrapper>
                      <DecisionButton
                        type="button"
                        active={values.tiredness ? true : false}
                        onClick={() => setFieldValue("tiredness", true)}
                      >
                        Yes
                      </DecisionButton>
                      <DecisionButton
                        type="button"
                        active={values.tiredness ? false : true}
                        onClick={() => setFieldValue("tiredness", false)}
                      >
                        No
                      </DecisionButton>
                    </ButtonWrapper>
                  </StyledSlide>
                  <StyledSlide index={5}>
                    <QuestionCounter>Question {survey.questionsAnswered+1}/{survey.questionsCount}</QuestionCounter>
                    <Question>
                      Did you have contact with someone during your day?
                    </Question>
                    <ButtonWrapper>
                      <DecisionButton
                        type="button"
                        active={values.hasContact ? true : false}
                        onClick={() => setFieldValue("hasContact", true)}
                      >
                        Yes
                      </DecisionButton>
                      <DecisionButton
                        type="button"
                        active={values.hasContact ? false : true}
                        onClick={() => setFieldValue("hasContact", false)}
                      >
                        No
                      </DecisionButton>
                    </ButtonWrapper>
                    <ContactButton
                      type="button"
                      variant="primary"
                      hasContact={values.hasContact}
                      onClick={() => {setContactPeopleModal(true)}}
                    >
                      Sign your friends or add email addresses of people with
                      whom you had contact
                    </ContactButton>
                  </StyledSlide>
                </StyledSlider>
                <ButtonWrapper>
                    <div onClick={() => questionChange(innerCurSlide - 1, !values.cough ? 5 : 6)}>
                  <StyledButtonBack
                    onClick={() => {
                      setInnerCurSlide(innerCurSlide - 1, 6);
                    }}
                  >
                    Back
                  </StyledButtonBack></div>
                  <div onClick={() => questionChange(innerCurSlide + 1, !values.cough ? 5 : 6)}>
                  <StyledButtonNext
                    onClick={() => {
                      setInnerCurSlide(innerCurSlide + 1, 6);
                    }}
                    disabled={isDisabled ? true : false}
                  >
                    Next
                  </StyledButtonNext>
                  </div>
                </ButtonWrapper>
              </CarouselProvider>
              <CenterBox isDisabled={isDisabled}>
                <StyledButton type="submit" variant="secondary">
                  Submit Questionnaire
                </StyledButton>
              </CenterBox>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default QuestionnaireView;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const QuestionCounter = styled.p`
  color: #c4c4c4;
`;

const Question = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 500;
`;
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
  .carousel__slide-focus-ring {
    display: none;
  }
`;
const StyledSlide = styled(Slide)`
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Form = styled.form`
  padding-top: 20px;
  width: 450px;
`;

const DecisionButton = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #dadce0;
  border: 1px solid #dadce0;
  ${({ active }) =>
    active &&
    `
color: red;
`}
`;

const CenterBox = styled.div`
  text-align: center;
  ${({ isDisabled }) =>
    isDisabled === true
      ? `
visibility: visible;
`
      : `
visibility: hidden;
`}
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const ContactButton = styled(Button)`
  max-width: 200px;
  margin-top: 10px;
  ${({ hasContact }) =>
    hasContact ? `visibility: visible;` : `visibility: hidden;`}
`;
