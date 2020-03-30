import React,{useEffect} from 'react';
import { theme } from "./features/Shared/theme";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import AppRouter from './features/AppRouter/AppRouter';
import {checkToken} from './redux/modules/authentication';
import {connect} from 'react-redux';

function App({checkToken}) {
  useEffect(()=>{
    checkToken()
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Virus mapping Application</title>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800|Roboto:400,500,700&display=swap" rel="stylesheet"/>
      </Helmet>
      <AppRouter/>
    </ThemeProvider>
  );
}
const mapStateToProps = state => ({
  
})

const mapDispatchToProps = dispatch => {
  return{
    checkToken : () => dispatch(checkToken(sessionStorage.getItem("jwtToken")))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
