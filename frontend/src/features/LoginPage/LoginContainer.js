import React,{useEffect} from 'react';
import LoginView from "./LoginView";
import {connect} from 'react-redux'
import {authenticateUser} from '../../redux/modules/authentication'
import { withRouter } from "react-router";


const LoginContainer = ({authenticateUser,user,history}) => {
    useEffect(()=>{
        //console.log('User : ', user);
        if(user.email) {
          history.push("/questionnaire")
        }
      },[user])



    return (
        <LoginView authenticateUser={authenticateUser}/>
    )

}
    



const mapStateToProps = state => ({
    user: state.authentication.user
  })

const mapDispatchToProps = dispatch => {
  return{
    authenticateUser : user => dispatch(authenticateUser(user))
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer));
