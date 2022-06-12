import { lazy } from "react";
const CompanyDetails = lazy(()=>import("./CompanyDetails"))
const CompanyList = lazy(()=>import("./CompanyList"))
const companyRoutes = [
  {
    path: "/company/list",
    component: CompanyList
  },
  {
    path: "/company/:id",
    component: CompanyDetails
  }
];

export default companyRoutes;
