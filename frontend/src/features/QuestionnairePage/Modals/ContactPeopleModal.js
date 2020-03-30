import React, { useState, useRef, useEffect } from "react";
import Modal from "../../Shared/Modal";
import styled from "styled-components";
import Button from "../../Shared/Button";
import { Formik } from "formik";
import Select from "../../Shared/Select";
import Input from "../../Shared/Input";
import axios from "axios";

const ContactPeopleModal = ({
  isContactPeopleModalOn,
  setContactPeopleModal
}) => {
  const [isAddingNewPatient, setAddingNewPatient] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const patientInput = useRef();

  useEffect(async () => {
    const response = await axios.get(
      `http://localhost:5050/api/user/5e80dee8e7466b1f0837f5e7/friends`
    );
    const { data } = response;
    setFriendsList(data.friends);
  }, []);
  const patientNoOption = setFieldValue => (
    <AddPatientNoOption>
      Add new app user
      <AddPatientButton
        type="button"
        onClick={() => {
          //console.log(patientInput.current.state.inputValue)
          setFieldValue("newUserName", patientInput.current.state.inputValue);
          setAddingNewPatient(true);
        }}
      >
        {" "}
        +{" "}
      </AddPatientButton>
    </AddPatientNoOption>
  );

  const initialValues = {
    peoples: [],
    newUserName: "",
    newUserEmail: ""
    // patient: '',
  };

  return (
    <Modal
      title="People met today"
      show={isContactPeopleModalOn}
      exitButton={true}
      onCancel={() => {
        setContactPeopleModal(false);
        setAddingNewPatient(false);
      }}
    >
      <Formik
      enableReinitialize
        initialValues={initialValues}
        onSubmit={async values => {

            const response = await axios.post('http://localhost:5050/api/usermeeting', {
                user: "5e80dee8e7466b1f0837f5e7",
                meetings: contactList.map(user => {return {
                    metFriend: user._id,
                    meetingDate: new Date()
                }})
            })
            console.log(response)
          setContactPeopleModal(false);
          setContactList([]);
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
            <Select
              ref={patientInput}
              defaultValue={values.patient}
              name="peoples"
              placeholder="Choose peoples..."
              options={friendsList.map(friend => {
                return { label: friend.name, value: friend._id };
              })}
              onChange={({ label, value }) => {
                console.log(value)
                setContactList([...contactList, friendsList.find(el => el._id === value)])
                setFieldValue("peoples", value)}}
              noOptionsMessage={() => patientNoOption(setFieldValue)}
              error={errors.peoples}
            />
            {contactList.map((person,i) => <UserWrapper key={i}>
            <UserInfo>{person.name}</UserInfo>
            <UserInfo>{person.email}</UserInfo>
            {console.log(person, contactList)}
            <DeleteButton onClick={() => setContactList(contactList.filter(el => el._id !== person._id))}>X</DeleteButton>
                </UserWrapper>)}
        
            {isAddingNewPatient && (
              <AddingNewWrapper>
                <Input
                name="newUserName"
                  label="New app user name"
                  value={values.newUserName}
                  onChange={handleChange}
                />
                <Input
                name="newUserEmail"
                  label="New app user email"
                  value={values.newUserEmail}
                  onChange={handleChange}
                />
                
                <Button
                  type="button"
                  variant="dark"
                  onClick={async () => {
                    setAddingNewPatient(false);
                    const response = await axios.post(
                      "http://localhost:5050/api/user",
                      {
                        friends: ["5e80dee8e7466b1f0837f5e7"],
                        name: values.newUserName,
                        email: values.newUserEmail,
                        registered: false
                      }
                    );
                    const {data} = response;
                    setFriendsList([...friendsList, data]);
                    axios.patch(`http://localhost:5050/api/user/5e80dee8e7466b1f0837f5e7/friends`, [data._id])
                  }}
                >
                  Add +
                </Button>
              </AddingNewWrapper>
            )}
            <CenterBox>
              <Button type="submit" variant="primary">
                Confirm
              </Button>
            </CenterBox>
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
const CenterBox = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 48%;
  }
`;
 const UserWrapper = styled.div`
     background-color: #c4c4c4;
    color: #fff;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px;
    margin: 5px 0;
    `
const UserInfo = styled.p`
color: #fff;
margin: 0 5px;
`

const AddPatientNoOption = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const AddPatientButton = styled.button`
  background-color: #cccccc;
  border: 1px solid #cccccc;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  padding: 0.25em 0.65em;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.p`
cursor: pointer;
    color: red;
    font-size: 16px;
`