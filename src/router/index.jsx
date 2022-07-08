import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ErrorBoundary from "./errorBoundary";
import ProtectedRoutes from "./protected-routes";
import Spinner from "../components/spinner";

const Landing = lazy(() => import("../containers/landing"));
const Login = lazy(() => import("../containers/login"));
const ForgotPassword = lazy(() => import("../containers/forgot-password"));
const ResetPassword = lazy(() => import("../containers/reset-password"));
const NotFound = lazy(() => import("../containers/not-found"));

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/forgot-password" component={ForgotPassword} exact />
            <Route
              path="/reset-password/:token"
              component={ResetPassword}
              exact
            />
            <ProtectedRoutes path="/dashboard" />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
