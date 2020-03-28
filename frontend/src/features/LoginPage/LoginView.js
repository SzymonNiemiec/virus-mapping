import React from "react";
import styled from 'styled-components';
import Input from "../Shared/Input";
import { Formik } from 'formik';
import Button from "../Shared/Button";

const LoginView = () => (
    <Wrapper>
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
                        <Input name="email" type="email" label="E-mail" value={values.email} onChange={handleChange} />
                        <Input name="password" type="password" label="Password" value={values.password} onChange={handleChange} />
                        <CenterBox>
                            <Button type='submit' variant='primary'>Zaloguj</Button>
                        </CenterBox>
                    </Form>
                )
            }
        </Formik>


    </Wrapper>
)


export default LoginView;


const Wrapper = styled.div``

const CenterBox = styled.div`
    text-align:center;
`;

const Form = styled.form`
    padding-top: 20px;
    width:450px;
`;