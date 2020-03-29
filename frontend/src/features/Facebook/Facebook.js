import React, { useState } from "react";
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux';
import {setUserFromFacebook} from '../../redux/modules/authentication'

const Facebook = ({setUserFromFacebook,auth}) => {

    const responseFacebook = response => {
        if(response.email){
            setUserFromFacebook(response)
        }
    }
    const componentClicked = () => {
        console.log('clicked')
    }

    return (
        !auth.isAuthenticated ?
            <FacebookLogin
            
            textButton="Facebook"
                appId="166155937788508"
                autoLoad={true}
                fields="name,email,picture,friends"
                scope="user_friends"
                onClick={componentClicked}
                callback={responseFacebook} />
            :
            <div>loggedIn</div>
    )

}

const mapStateToProps = state => ({
    auth: state.authentication
  });
  
  const mapDispatchToProps = dispatch => {
    return {
        setUserFromFacebook: user => dispatch(setUserFromFacebook(user))
    };
  };


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Facebook);

