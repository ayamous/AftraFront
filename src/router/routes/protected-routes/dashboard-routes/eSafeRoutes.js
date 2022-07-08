import { lazy } from "react";

const eSafeRoutes = [
  {
    path: "/dashboard/e-safe",
    component: lazy(() => import("../../../../containers/dashboard/e-safe")),
    exact: true
  }
];

export default eSafeRoutes;
