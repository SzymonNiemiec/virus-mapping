import React, { useState, useRef} from 'react';
import Modal from '../../Shared/Modal';
import styled from 'styled-components';
import Button from '../../Shared/Button';
import { Formik } from 'formik';
import Select from '../../Shared/Select';

const ContactPeopleModal = ({ isContactPeopleModalOn, setContactPeopleModal}) => {
    const [isAddingNewPatient, setAddingNewPatient] = useState(false);
    const patientInput = useRef();

    const patientNoOption = (setFieldValue) => <AddPatientNoOption>Add new app user<AddPatientButton type="button" onClick={()=> {
        //console.log(patientInput.current.state.inputValue)
        setFieldValue('name', patientInput.current.state.inputValue);
        setAddingNewPatient(true);
      }}> + </AddPatientButton></AddPatientNoOption>


    const initialValues = {
        peoples: []
        // patient: '',
    }
    
    return (
        <Modal
            title='People met today'
            show={isContactPeopleModalOn}
            exitButton={true}
            onCancel={() => {
                setContactPeopleModal(false);
                setAddingNewPatient(false);
            }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                 
                    setContactPeopleModal(false);
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
                            
                            <Select 
                        
                            defaultValue={values.patient}
                            name="peoples"
                            placeholder='Choose peoples...' 
                            // options={patients.map(patient => {return {label: patient.name, value: patient._id}})}
                            onChange={({ value }) => setFieldValue('peoples', value)}
                            noOptionsMessage={() => patientNoOption(setFieldValue)}
                            error={errors.peoples}
                             />
                            <CenterBox>
                                <Button type='submit' variant='primary'>Save</Button>
                            </CenterBox>
                        </Form>
                    )
                }
            </Formik>
        </Modal >
    )
}


const dot = (color = "#ccc") => ({
    alignItems: "center",
    display: "flex",
    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10
    }
  });
  const dotColorStyles = {
    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    option: (styles, { data }) => ({ ...styles, ...dot(data.color) })
  };
  
export default ContactPeopleModal;

const Form = styled.form`
    padding-top: 20px;
    width:450px;
`;

const CenterBox = styled.div`
    text-align:center;
`;

const InputRow = styled.div`
   display:flex;
   justify-content:space-between;
   >div{
       width: 48%;
   }
`;


const TodayDate = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 22px;
  width: 48%;
  text-align: center;
  align-self: flex-end;
`;


const AddPatientNoOption = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
`
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
`