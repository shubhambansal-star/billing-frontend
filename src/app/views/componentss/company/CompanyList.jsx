import React, { Component } from "react";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { getAllCompany, deleteCompany } from "./CompanyService";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
class CompanyList extends Component {
  state = {
    companyList: [],
    shouldShowConfirmationDialog: false
  };

  componentDidMount() {
    getAllCompany().then(res => this.setState({ companyList: res.data }));
  }

  handeViewClick = companyId => {
    this.props.history.push(`/invoice/company/${companyId}`);
  };

  componentDidUpdate(prevProps, prevState) {
  if (prevState.change !== this.state.change) {
    getAllCompany().then(res => this.setState({ companyList: res.data }));
  }
}

  handleDeleteInvoice = invoice => {
    deleteCompany(invoice).then(res => {
      swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        type: "success",
        icon: "success",
        timer: 1500
      });

      this.setState({
        change: !this.state.change,
        shouldShowConfirmationDialog: false
      });
    });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowConfirmationDialog: false });
  };

  render() {
    let { companyList } = this.state;
    return (
      <Row>
            <Col>
            <Card elevation={6} className="invoice-details w-100 overflow-auto">
                <div className="row mt-4 ms-3 me-3 mb-2 justify-content-between">
                  <div className="col-md-2">
                    <h4 className="fw-bold">Company List</h4>
                  </div>
                  <div className="col-md-2">
                    <div className="justify-content-end">
                      <div className="mb-4">
                        <Link to="/company/create">
                          <Button className="mb-3" variant="primary">
                            Add Company
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
          <Table style={{ minWidth: 750 }}>
            <thead>
              <tr>
                <th className="pl-sm-24">Company Name</th>
                <th className="px-0">GSTIN</th>
                <th className="px-0">Address</th>
                <th className="px-0">Mobile</th>
                <th className="px-0">Alternate Mobile No</th>
                <th className="px-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {companyList.map((company, index) => (
                <tr key={company.id}>
                  <td className="pl-sm-24 capitalize" align="left">
                    {company.name}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.address}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.gstin}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.mobile1}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.mobile2}
                  </td>
                  
                  <td className="pl-0">
                    <i
                      className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                      onClick={() => this.handeViewClick(company.id)}
                    ></i>
                    <i
                      className="i-Folder-Trash font-weight-900 text-danger cursor-pointer"
                      onClick={() => {
                        swal
                          .fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            type: "question",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No"
                          })
                          .then(result => {
                            if (result.value) {
                              this.handleDeleteInvoice(company.id);
                            }
                          });
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </Card>
        </Col>
            </Row>
    );
  }
}

export default CompanyList;
