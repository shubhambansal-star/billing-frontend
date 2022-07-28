import InvoiceDetails from "./InvoiceDetails"
import InvoiceListTab from "./InvoiceListWithTab"

const invoiceRoutes = [
  {
    path: "/invoice/invoice/list",
    component: InvoiceListTab
  },
  {
    path: "/invoice/invoice/:id(\\d+)",
    component: InvoiceDetails
  },
  {
    path: "/invoice/invoice/:id(create)",
    component: InvoiceDetails
  },
];

export default invoiceRoutes;
