import { lazy } from "react";

const basicRoutes = [
  {
    path: "/",
    component: lazy(() => import("../landing")),
    exact: true
  },
  {
    path: "/login",
    component: lazy(() => import("../../../containers/login")),
    exact: true
  },
  {
    path: "/forgot-password",
    component: lazy(() => import("../../../containers/forgot-password")),
    exact: true
  },
  {
    path: "/reset-password/:token",
    component: lazy(() => import("../../../containers/reset-password")),
    exact: true
  }
];

export default basicRoutes;
