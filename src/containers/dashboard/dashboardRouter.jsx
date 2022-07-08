import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import dashboardRoutes from "../../router/dashboard-routes";
import Spinner from "../../components/spinner";
import DashboardHome from "./home";

function DashboardRouter() {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/dashboard" component={DashboardHome} exact />
        {dashboardRoutes.map(({ path, component, exact }) => (
          <Route key={path} path={path} component={component} exact={exact} />
        ))}
        <Redirect to="/not-found" />
      </Switch>
    </Suspense>
  );
}

export default DashboardRouter;
