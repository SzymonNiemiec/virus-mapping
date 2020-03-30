import React, { useState, useRef, useEffect } from "react";
import Modal from "../../Shared/Modal";
import styled from "styled-components";
import Button from "../../Shared/Button";
import { Formik } from "formik";
import Input from "../../Shared/Input";
import axios from "axios";

const ContactPeopleModal = ({ isFriendModalOn, setFriendModal, user, addUserFriend }) => {
  const initialValues = {
    newUserName: "",
    newUserEmail: ""
  };

  return (
    <Modal
      title="Add Friend"
      show={isFriendModalOn}
      exitButton={true}
      onCancel={() => {
        setFriendModal(false);
      }}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async values => {
          const response = await axios.post("http://localhost:5050/api/user", {
            friends: [user._id],
            name: values.newUserName,
            email: values.newUserEmail,
            registered: false
          });
          const { data } = response;
          addUserFriend(data._id);
          axios.patch(`http://localhost:5050/api/user/${user._id}/friends`, [
            data._id
          ]);
          setFriendModal(false);
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
            <AddingNewWrapper>
              <Input
                name="newUserName"
                label="Friend name"
                value={values.newUserName}
                onChange={handleChange}
              />
              <Input
                name="newUserEmail"
                label="Friend E-mail"
                value={values.newUserEmail}
                onChange={handleChange}
              />

              <Button type="submit" variant="dark">
                Confirm
              </Button>
            </AddingNewWrapper>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ContactPeopleModal;

const Form = styled.form`
  padding-top: 20px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddingNewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 10px auto;
`;
