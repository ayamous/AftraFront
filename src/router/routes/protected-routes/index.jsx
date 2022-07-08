import React, { lazy } from "react";
import { Route } from "react-router-dom";
import AuthWrapper from "./auth-wrapper";

const Dashboard = lazy(() => import("../../../containers/dashboard"));

function ProtectedRoutes() {
  return (
    <Route
      path="/dashboard"
      component={() => (<AuthWrapper><Dashboard /></AuthWrapper>)}
      exact={false}
    />
  );
}

export default ProtectedRoutes;
