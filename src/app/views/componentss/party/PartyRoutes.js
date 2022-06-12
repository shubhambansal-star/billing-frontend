import { lazy } from "react";
const PartyDetails = lazy(()=>import("./PartyDetails"))
const PartyListTab = lazy(()=>import("./PartyListMain"))
const partyRoutes = [
  {
    path: "/party/list",
    component: PartyListTab
  },
  {
    path: "/party/:id",
    component: PartyDetails
  }
];

export default partyRoutes;
