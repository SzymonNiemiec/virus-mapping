import React from "react";
import styled from 'styled-components';
import Input from "../Shared/Input";
import { Formik } from 'formik';
import Button from "../Shared/Button";
import MedicalResearchImg from "../Shared/assets/medical-research.svg";
import { theme } from "../Shared/theme";

const LoginView = () => (
    <Wrapper>
        <Column image>
        <MedicalResearchImage src={MedicalResearchImg}/> 
        </Column>
        <Column>
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
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
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Title>Hello,<br/> Welcome back</Title>
                        <Input name="email" type="email" label="E-mail" value={values.email} onChange={handleChange} />
                        <Input name="password" type="password" label="Password" value={values.password} onChange={handleChange} />
                        <CenterBox>
                            <StyledButton type='submit' variant='primary'>Login</StyledButton>
                        </CenterBox>

                        <SignInText>or sign in with</SignInText>
                    </Form>
                )
            }
        </Formik>
            </Column>


    </Wrapper>
)


export default LoginView;


const Wrapper = styled.div`
width: 100%;
display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
`

const CenterBox = styled.div`
    text-align:center;
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
${({image}) => image && `
display: none;`
}
${theme.mq.tablet} {
    ${({image}) => image && `
display: block;`
}
    }

`

const Title = styled.h1`
font-size: 3rem;
`

const StyledButton = styled(Button)`
width: 100%;
font-weight: 700;
`
const SignInText = styled.p`
text-align: center;
    margin: 20px auto;
`

const MedicalResearchImage = styled.img`
margin: 0 auto;
width: 80%;
display: block;
`