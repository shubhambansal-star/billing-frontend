import SalesOrderDetails from "./PurchaseOrderDetails"
import LoadingList from "./LoadingListTab"
const loadingRoutes = [
  {
    path: "/orders/unload/list",
    component: LoadingList
  },
  {
    path: "/orders/unload/:id(\\d+)",
    component: SalesOrderDetails
  },
  {
    path: "/orders/unload/:id(create)",
    component: SalesOrderDetails
  },
];

export default loadingRoutes;
