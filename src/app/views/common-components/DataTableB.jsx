import React, { Component } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { getAllCompany, deleteCompany } from "../componentss/company/CompanyService";
import { Link } from "react-router-dom";
import { classList } from "@utils";
import swal from "sweetalert2";

class TableS extends Component {
  state = {
    companyList: [],
    headers:[
        "OrderNo","abc","bcd","cde","efd"
    ],
    shouldShowConfirmationDialog: false
  };

  componentDidMount() {
    getAllCompany().then(res => this.setState({ companyList: res.data }));
  }

  handeViewClick = invoiceId => {
    this.props.history.push(`/invoice/${invoiceId}`);
    // getInvoiceById(invoiceId).then(res => console.log(res.data));
  };

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
        companyList: res.data,
        shouldShowConfirmationDialog: false
      });
    });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowConfirmationDialog: false });
  };

  render() {
    let { companyList,headers } = this.state;
    return (
      <div>
        <Link to="/invoice/create">
          <Button className="mb-3" variant="primary">
            Add Invoice
          </Button>
        </Link>
        <Card elevation={6} className="w-100 overflow-auto">
          <Table style={{ minWidth: 750 }}>
              <thead>
                  {headers.map((header,index)=>(<th className="px-0">{header}</th>))}
              </thead>
            <tbody>
              {companyList.map((invoice, index) => (
                <tr key={invoice.id}>
                  <td className="pl-sm-24 capitalize" align="left">
                    {invoice.orderNo}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {invoice.seller.name}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {invoice.buyer.name}
                  </td>
                  <td className="pl-0 capitalize">
                    <small
                      className={classList({
                        "badge rounded-pill text-white px-8 py-2": true,
                        "bg-success": invoice.status === "delivered",
                        "bg-warning": invoice.status === "processing",
                        "bg-danger": invoice.status === "pending"
                      })}
                    >
                      {invoice.status}
                    </small>
                  </td>
                  <td className="pl-0">
                    <i
                      className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                      onClick={() => this.handeViewClick(invoice.id)}
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
                              this.handleDeleteInvoice(invoice);
                            }
                          });
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        {/* <ConfirmationDialog
          open={this.state.shouldShowConfirmationDialog}
          onConfirmDialogClose={this.handleDialogClose}
          onYesClick={this.handleDeleteInvoice}
          text="Are you sure to delete?"
        /> */}
      </div>
    );
  }
}

export default TableS;
