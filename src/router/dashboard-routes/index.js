import repositoriesRoutes from "./repositoriesRoutes";
import eSafeRoutes from "./eSafeRoutes";

const dashboardRoutes = [...repositoriesRoutes, ...eSafeRoutes];

export default dashboardRoutes;
