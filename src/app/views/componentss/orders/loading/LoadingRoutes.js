import SalesOrderDetails from "./PurchaseOrderDetails"
import LoadingList from "./LoadingListTab"
const loadingRoutes = [
  {
    path: "/orders/loading/list",
    component: LoadingList
  },
  {
    path: "/orders/loading/:id(\\d+)",
    component: SalesOrderDetails
  },
  {
    path: "/orders/loading/:id(create)",
    component: SalesOrderDetails
  },
];

export default loadingRoutes;
