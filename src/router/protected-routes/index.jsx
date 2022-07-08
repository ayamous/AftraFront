import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Dashboard = lazy(() => import("../../containers/dashboard"));

function ProtectedRoutes() {
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
  return <Dashboard />;
}

export default ProtectedRoutes;
