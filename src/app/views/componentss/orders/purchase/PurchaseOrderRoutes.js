import SalesOrderDetails from "./PurchaseOrderDetails"
import SalesOrderList from "./InvoiceListWithTab"
const purchaseOrderRoutes = [
  {
    path: "/orders/purchase/list",
    component: SalesOrderList
  },
  {
    path: "/orders/purchase/:id(\\d+)",
    component: SalesOrderDetails
  },
  {
    path: "/orders/purchase/:id(create)",
    component: SalesOrderDetails
  }
];

export default purchaseOrderRoutes;
