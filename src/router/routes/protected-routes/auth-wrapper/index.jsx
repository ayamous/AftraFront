import { useSelector } from "react-redux";
import propTypes from "prop-types";
import { Redirect } from "react-router-dom";
import React from "react";

function AuthWrapper(props) {
  const isAuthenticated = useSelector(
    ({ AuthReducer }) => AuthReducer.isAuthenticated
  );
  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }
  const { children } = props;
  return <>{children}</>;
}

AuthWrapper.propTypes = {
  children: propTypes.element
};

AuthWrapper.defaultProps = {
  children: null
};

export default AuthWrapper;
