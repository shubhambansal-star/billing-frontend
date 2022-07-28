import React, { Component } from "react";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { getAllPurchaseOrder, deletePurchaseOrder } from "./PurchaseOrderService";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

class SalesOrderList extends Component {
  state = {
    companyList: [],
    shouldShowConfirmationDialog: false
  };

  componentDidMount() {
    getAllPurchaseOrder().then(res => this.setState({ companyList: res.data }));
  }

  handeViewClick = companyId => {
    this.props.history.push(`/orders/purchase/${companyId}`);
  };

  handleDeleteInvoice = id => {
    deletePurchaseOrder(id).then(res => {
      swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        type: "success",
        icon: "success",
        timer: 1500
      });

      this.setState({
        companyList: res.data,
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
                    <h4 className="fw-bold">Purchase Order List</h4>
                  </div>
                  <div className="col-md-2">
                    <div className="justify-content-end">
                      <div className="mb-4">
                        <Link to="/orders/broker/create">
                          <Button className="mb-3" variant="primary">
                            Add Purchase Order
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
          <Table style={{ minWidth: 750 }}>
            <thead>
              <tr>
                <th className="pl-0">Date</th>
                <th className="pl-0">Purchase Type</th>
                <th className="pl-0">Broker</th>
                <th className="pl-0">Party</th>
                <th className="pl-0">Genes</th>
                <th className="pl-0">Quantity</th>
                <th className="pl-0">Rate</th>
                <th className="pl-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {companyList.map((company, index) => (
                <tr key={company.id}>
                  <td className="pl-sm-24 capitalize" align="left">
                    {company.date}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.purchase_type}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.broker}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.party}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.genes}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.quantity}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.rate}
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

export default SalesOrderList;
