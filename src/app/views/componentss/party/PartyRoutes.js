import PartyDetails from "./PartyDetails"
import PartyListTab from "./PartyListMain"
const partyRoutes = [
  {
    path: "/invoice/party/list",
    component: PartyListTab
  },
  {
    path: "/invoice/party/:id(\\d+)",
    component: PartyDetails
  },
  {
    path: "/invoice/party/:id(create)",
    component: PartyDetails
  }
];

export default partyRoutes;
