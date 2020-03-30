import React from "react";
import styled from "styled-components";
import Input from "../Shared/Input";
import { Formik } from "formik";
import Button from "../Shared/Button";
import MedicalResearchImg from "../Shared/assets/medical-research.svg";
import { theme } from "../Shared/theme";
import { withRouter } from "react-router";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required")
});

const RegisterView = ({ signUp, history }) => (
  <Wrapper>
    <Column image>
      <MedicalResearchImage src={MedicalResearchImg} />
    </Column>
    <Column>
      <Formik
        initialValues={{
          email: "",
          name: ""
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          signUp({
            email: values.email,
            name: values.name
          });
          // authenticateUser(values)
          history.push("/login");
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Title>
              Hello,
              <br /> Nice to see you
            </Title>
            <Input
              name="email"
              type="email"
              label="E-mail"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
            />
            <Input
              name="name"
              type="name"
              label="Name"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
            />
            <CenterBox>
              <StyledButton type="submit" variant="primary">
                Sign up
              </StyledButton>
            </CenterBox>
          </Form>
        )}
      </Formik>
      <Info>The password will be sent to your email address</Info>
    </Column>
  </Wrapper>
);

export default withRouter(RegisterView);

const Info = styled.p`
  text-align: center;
  margin: 20px auto;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const CenterBox = styled.div`
  text-align: center;
`;

const Form = styled.form`
  padding-top: 20px;
  max-width: 450px;
  width: 100%;
  margin: 20px;
  ${theme.mq.tablet} {
    margin: 0 auto;
  }
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ image }) =>
    image &&
    `
display: none;`}
  ${theme.mq.tablet} {
    ${({ image }) =>
      image &&
      `
display: block;`}
  }
`;

const Title = styled.h1`
  font-size: 3rem;
`;

const StyledButton = styled(Button)`
  width: 100%;
  font-weight: 700;
`;
const SignInText = styled.p`
  text-align: center;
  margin: 20px auto;
`;

const MedicalResearchImage = styled.img`
  margin: 0 auto;
  width: 80%;
  display: block;
`;
