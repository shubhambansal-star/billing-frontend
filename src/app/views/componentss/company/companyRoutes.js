import CompanyDetails from "./CompanyDetails"
import CompanyList from "./CompanyList"
const companyRoutes = [
  {
    path: "/invoice/company/list",
    component: CompanyList
  },
  {
    path: "/invoice/company/:id(\\d+)",
    component: CompanyDetails
  },
  {
    path: "/invoice/company/:id(create)",
    component: CompanyDetails
  }
];

export default companyRoutes;
