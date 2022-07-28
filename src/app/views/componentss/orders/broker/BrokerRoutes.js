import CompanyDetails from "./BrokerDetails"
import CompanyList from "./BrokerList"
const brokerRoutes = [
  {
    path: "/orders/broker/list",
    component: CompanyList
  },
  {
    path: "/orders/broker/:id(\\d+)",
    component: CompanyDetails
  },
  {
    path: "/orders/broker/:id(create)",
    component: CompanyDetails
  }
];

export default brokerRoutes;
