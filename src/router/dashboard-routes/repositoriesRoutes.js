import { lazy } from "react";

const repositoriesRoutes = [
  {
    path: "/dashboard/repositories",
    component: lazy(() => import("../../containers/dashboard/repositories")),
    exact: true
  },
  {
    path: "/dashboard/repositories/basic-repositories",
    component: lazy(() => import("../../containers/dashboard/repositories/basic-repositories")),
    exact: true
  },
  {
    path: "/dashboard/repositories/geographic-repositories",
    component: lazy(() => import("../../containers/dashboard/repositories/geographic-repositories")),
    exact: true
  },
  {
    path: "/dashboard/repositories/documents",
    component: lazy(() => import("../../containers/dashboard/repositories/documents")),
    exact: true
  },
  {
    path: "/dashboard/repositories/data-actors-and-access",
    component: lazy(() => import("../../containers/dashboard/repositories/data-actors")),
    exact: true
  },
  {
    path: "/dashboard/repositories/basic-data",
    component: lazy(() => import("../../containers/dashboard/repositories/basic-data")),
    exact: true
  },
  {
    path: "/dashboard/repositories/tables",
    component: lazy(() => import("../../containers/dashboard/repositories/repositories-tables")),
    exact: true
  }
];

export default repositoriesRoutes;
