import React from "react";
import styled from "styled-components";
import Button from "../Shared/Button";

const SimpleQuestionModal = ({
  question,
  acceptText,
  cancelText,
  onAccept,
  onCancel,
  reverseButtonColors,
}) => (
  <Container>
    <Question>{question}</Question>
    <ButtonsContainer>
    <Button variant="danger" onClick={onAccept}>{acceptText}</Button>
    <Button variant="default" onClick={onCancel}>
      {cancelText}
    </Button>
    </ButtonsContainer>
    
  </Container>
);

export default SimpleQuestionModal;

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`;

const Question = styled.h2`
  font-size: 18px;
  margin: 0;
  width: 100%;
`;

const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-end;
margin-top: 2rem;
`