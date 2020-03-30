import React from "react";
import styled from "styled-components";
import Input from "../Shared/Input";
import { Formik } from "formik";
import Button from "../Shared/Button";
import MedicalResearchImg from "../Shared/assets/medical-research.svg";
import { theme } from "../Shared/theme";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
  });

const LoginView = ({ authenticateUser }) => (
  <Wrapper>
    <Column image>
      <MedicalResearchImage src={MedicalResearchImg} />
    </Column>
    <Column>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          authenticateUser(values);
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
              <br /> Welcome back
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
              name="password"
              type="password"
              label="Password"
              value={values.password}
              error={errors.password}
              onChange={handleChange}
            />
            <CenterBox>
              <StyledButton type="submit" variant="primary">
                Login
              </StyledButton>
            </CenterBox>
            <Divider>or</Divider>
           
            <Link to="sign-up"><StyledButton type="button">
            Create an account
              </StyledButton></Link>
          </Form>
        )}
      </Formik>
    </Column>
  </Wrapper>
);

export default LoginView;

const FacebookBtnContainer = styled.div`
  display: flex;
  justify-content: center;
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
const Divider = styled.p`
  text-align: center;
  margin: 20px 0;
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
