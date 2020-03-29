import React, { useState, useRef, forwardRef} from 'react';
import Modal from '../../Shared/Modal';
import styled from 'styled-components';
import Button from '../../Shared/Button';
import { Formik } from 'formik';


const ContactPeopleModal = forwardRef(({ isCreateModalOn, setCreateModal, patients, doctors, addPatient, companyId, addVisit, currentHealthcenter, user, selectedEvent}) => {
    const [isAddingNewPatient, setAddingNewPatient] = useState(false);
    const patientInput = useRef();

    const patientNoOption = (setFieldValue) => <AddPatientNoOption>Dodaj pacjenta<AddPatientButton type="button" onClick={()=> {
        //console.log(patientInput.current.state.inputValue)
        setFieldValue('name', patientInput.current.state.inputValue);
        setAddingNewPatient(true);
      }}> + </AddPatientButton></AddPatientNoOption>


    const initialValues = {
        // patient: '',
        // start: moment(selectedEvent.start).format("YYYY-MM-DD HH:mm:ss"),
        // end: moment(selectedEvent.end).format("YYYY-MM-DD HH:mm:ss"),
        // doctorId: (!selectedEvent.roomsStatus && selectedEvent.resourceStatus) ? selectedEvent.resourceId  : '',
        // room: (selectedEvent.roomsStatus && selectedEvent.resourceStatus) ? selectedEvent.resourceId  : '',
        // description: '',
        // isConfirmed: false,
    }
    
    return (
        <Modal
            title='Dodawanie wydarzenia'
            show={isCreateModalOn}
            exitButton={true}
            onCancel={() => {
                setCreateModal(false);
                setAddingNewPatient(false);
            }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    // let patientData;
                    // if(isAddingNewPatient) {
                    //     const userData = {
                    //         companyId: companyId,
                    //         name: values.name,
                    //         tel: values.tel
                    //     }
                        
                    //     patientData = await addPatient(companyId,userData);
                    // }
                    // const visitData = {
                    //     patient: isAddingNewPatient ? patientData._id : values.patient,
                    //     doctor: values.doctorId,
                    //     healthcenterId: currentHealthcenter._id,
                    //     companyId: currentHealthcenter.companyId,
                    //     start: values.start,
                    //     end: values.end,
                    //     description: values.description,
                    //     room: values.room,
                    //     registeringPerson: user._id,
                    //     state: "PLANNED",
                    //     timeLogs: [{ type: "PLANNED", time: new Date().toISOString() }]
                    // }
                    // addVisit(visitData);
                    setCreateModal(false);
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
                        
                            <CenterBox>
                                <Button type='submit' variant='primary'>Dodaj wydarzenie</Button>
                            </CenterBox>
                        </Form>
                    )
                }
            </Formik>
        </Modal >
    )
}
)

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