import React from "react";
import { Redirect } from "react-router-dom";
import sessionsRoutes from "./views/sessions/sessionsRoutes";
import AuthGuard from "./auth/AuthGuard";
import invoiceRoutes from "./views/app/invoice/invoiceRoutes";
import companyRoutes from "./views/componentss/company/companyRoutes"
import partyRoutes from "./views/componentss/party/PartyRoutes"
import brokerRoutes from "./views/componentss/orders/broker/BrokerRoutes"
import orderPartyRoutes from "./views/componentss/orders/party/PartyRoutes"
import salesOrderRoutes from "./views/componentss/orders/salesOrder/SalesOrderRoutes"
import purchaseOrderRoutes from "./views/componentss/orders/purchase/PurchaseOrderRoutes"
import LoadingRoutes from "./views/componentss/orders/loading/LoadingRoutes";
import unloadingRoutes from "./views/componentss/orders/unloading/UnloadingRoutes";
const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/invoice/invoice/create" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionsRoutes,
  {
    path: "/",
    component: AuthGuard,
    routes: [
      ...invoiceRoutes,
      ...companyRoutes,
      ...partyRoutes,
      ...brokerRoutes,
      ...salesOrderRoutes,
      ...LoadingRoutes,
      ...unloadingRoutes,
      ...orderPartyRoutes,
      ...purchaseOrderRoutes,
      ...redirectRoute,
      ...errorRoute
    ]
  }
];

export default routes;
