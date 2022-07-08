import { lazy } from "react";

const referentialRoutes = [
  {
    path: "/dashboard/referential",
    component: lazy(() => import("../../../../containers/dashboard/referential")),
    exact: true
  },
  {
    path: "/dashboard/referential/basic",
    component: lazy(() => import("../../../../containers/dashboard/referential/basic-referential")),
    exact: true
  },
  {
    path: "/dashboard/referential/geographic",
    component: lazy(() => import(
      "../../../../containers/dashboard/referential/geographic-referential"
    )),
    exact: true
  },
  {
    path: "/dashboard/referential/resources",
    component: lazy(() => import("../../../../containers/dashboard/referential/documents")),
    exact: true
  },
  {
    path: "/dashboard/referential/data-actors",
    component: lazy(() => import("../../../../containers/dashboard/referential/data-actors")),
    exact: true
  },
  {
    path: "/dashboard/referential/basic-data",
    component: lazy(() => import("../../../../containers/dashboard/referential/basic-data")),
    exact: true
  },
  {
    path: "/dashboard/referential/tables",
    component: lazy(() => import("../../../../containers/dashboard/referential/referentail-tables")),
    exact: true
  }
];

export default referentialRoutes;
