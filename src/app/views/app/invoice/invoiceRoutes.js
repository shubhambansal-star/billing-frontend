import { lazy } from "react";

const InvoiceDetails = lazy(() => import("./InvoiceDetails"));
const InvoiceListTab = lazy(()=>import("./InvoiceListWithTab"))

const invoiceRoutes = [
  {
    path: "/invoice/list",
    component: InvoiceListTab
  },
  {
    path: "/invoice/:id",
    component: InvoiceDetails
  }
];

export default invoiceRoutes;
