import React from "react";
import { Route, Redirect } from "react-router-dom";
import Loader from "../Shared/Loader";

export default ({ component: C, isAuthenticated, loading, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
        <Loader/>
        ) : isAuthenticated ? (
            <C {...props} isAuthenticated {...rest}/>
          ) : (
            <Redirect to={`/login`}/>
            // <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>
          )}
  />
);