import PartyDetails from "./PartyDetails"
import OrderPartyList from "./PartyListWithTab"
const orderPartyRoutes = [
  {
    path: "/orders/party/list",
    component: OrderPartyList
  },
  {
    path: "/orders/party/:id(\\d+)",
    component: PartyDetails
  },
  {
    path: "/orders/party/:id(create)",
    component: PartyDetails
  }
];

export default orderPartyRoutes;
