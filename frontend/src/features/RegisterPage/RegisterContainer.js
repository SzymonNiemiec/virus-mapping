import React, { useEffect } from "react";
import RegisterView from "./RegisterView";
import { connect } from "react-redux";
import { signUp } from "../../redux/modules/authentication";
import { withRouter } from "react-router";

const RegisterContainer = ({ signUp, user, history }) => {
  useEffect(() => {
    //console.log('User : ', user);
    if (user.email) {
      history.push("/questionnaire");
    }
  }, [user]);

  return <RegisterView signUp={signUp} />;
};

const mapStateToProps = state => ({
  user: state.authentication.user
});

const mapDispatchToProps = dispatch => {
  return {
    signUp: user => dispatch(signUp(user)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
);
