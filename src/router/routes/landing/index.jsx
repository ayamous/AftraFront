import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Landing() {
  const isAuthenticated = useSelector(
    ({ AuthReducer }) => AuthReducer.isAuthenticated
  );

  if (isAuthenticated) return <Redirect to={{ pathname: "/dashboard" }} />;

  return <Redirect to={{ pathname: "/login" }} />;
}

export default Landing;
