import React from "react";
import { Route } from "react-router-dom";
import basicRoutes from "./basicRoutes";

export default function OpenRoutes() {
  return (
    <>
      {basicRoutes.map(({ component, path, exact }) => (
        <Route key={path} component={component} path={path} exact={exact} />
      ))}
    </>
  );
}
