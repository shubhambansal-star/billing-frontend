import SalesOrderDetails from "./SalesOrderDetails"
import PurchaseOrderListTab from "./SalesOrderListTab"
const salesOrderRoutes = [
  {
    path: "/orders/sales/list",
    component: PurchaseOrderListTab
  },
  {
    path: "/orders/sales/:id(\\d+)",
    component: SalesOrderDetails
  },
  {
    path: "/orders/sales/:id(create)",
    component: SalesOrderDetails
  },
];

export default salesOrderRoutes;
