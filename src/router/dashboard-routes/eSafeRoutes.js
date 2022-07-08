import { lazy } from "react";

const eSafeRoutes = [
  {
    path: "/dashboard/e-safe",
    component: lazy(() => import("../../containers/dashboard/e-safe")),
    exact: true
  },
  {
    path: "/dashboard/e-safe/navigation/root",
    component: lazy(() => import("../../containers/dashboard/e-safe/navigation/rootNavigation")),
    exact: true
  },
  {
    path: "/dashboard/e-safe/navigation/sous-folder",
    component: lazy(() => import("../../containers/dashboard/e-safe/navigation/folderNavigation")),
    exact: true
  }
];

export default eSafeRoutes;
