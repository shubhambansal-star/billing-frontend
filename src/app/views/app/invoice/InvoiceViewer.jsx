import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getInvoiceById, getBillById } from "./InvoiceService";
import { format } from "date-fns";
import { withRouter } from "react-router-dom";
import print from 'print-js'
class InvoiceViewer extends Component {
  state = {};
  subTotalCost = 0
  componentDidMount() {
    getInvoiceById(this.props.match.params.id).then((res) => {
      this.setState({ bill: res.data, billitem: res.data.billitems });
    });
  }

  render() {
    this.subTotalCost = 0;
    
    return (
      <div className="invoice-viewer py-16">
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link to="/invoice/list">
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
            <Button
              className="mr-3 py-2"
              variant="primary"
              onClick={() => this.props.toggleInvoiceEditor()}
            >
              Edit Invoice
            </Button>
            <Button
              onClick={() => getBillById(this.props.match.params.id).then((res)=>{print("http://127.0.0.1:8000/media/invoices/invoice.pdf")})}
              className="py-2"
              variant="warning"
            >
              Print Invoice
            </Button>
          </div>
        </div>

        <div id="print-area" className="px-3">
          <div className="row">
            <div className="col-md-6">
              <h4 className="font-weight-bold"><strong>Invoice Number</strong></h4>
              <p>#{this.state?.bill?.invoice_no}</p>
            </div>
            <div className="col-md-6 text-sm-right">
              <p className="text-capitalize">
                <strong>Bill Type:</strong> {this.state?.bill?.bw}
              </p>
              <p>
                <strong>Invoice Date: </strong>
                <span>
                  {this.state?.bill?.date
                    ? format(new Date(this.state?.bill?.date).getTime(), "MMMM dd, yyyy")
                    : ""}
                </span>
              </p>
            </div>
          </div>
          <div className="mb-2 border-bottom"></div>
          <div className="row mb-2">
            <div className="col-md-6 mb-3 mb-sm-0">
              <h5><strong>Bill To</strong></h5>
              <p>
                <div>
                <strong>Name :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.name : null}
                </div>
                <div>
                <strong>Address :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.address : null}
                </div>
                <div>
                <strong>GSTIN :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.gstin : null}
                </div>
                <div>
                <strong>State :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.state : null}<strong> &nbsp; State Code :- </strong>{this.state?.bill?.bill_tos  ? this.state?.bill?.bill_tos.state_code : null}
                </div>
                </p>
            </div>
            <div className="col-md-6 text-sm-right">
              <h5><strong>Ship To</strong></h5>
              <p>
                <div>
                <strong>Name :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.ship_details.name : null}
                </div>
                <div>
                <strong>Address :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.ship_details.address : null}
                </div>
                <div>
                <strong>GSTIN :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.ship_details.gstin : null}
                </div>
                <div>
                <strong>State :- &nbsp; </strong>{this.state?.bill?.bill_tos ? this.state?.bill?.bill_tos.ship_details.state : null}<strong> &nbsp; State Code :- </strong>{this.state?.bill?.bill_tos  ? this.state?.bill?.bill_tos.ship_details.state_code : null}
                </div>
                </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table className="table table-hover mb-4">
                <thead className="bg-gray-300">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Bags</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Rate</th>
                    <th scope="col">PO Number</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state?.billitem?.map((item, index) => {
                    this.subTotalCost += item.qty * item.rate;
                    return (
                      <tr key={index}>
                        <td className="text-capitalize">{index + 1}</td>
                        <td className="text-uppercase">{item.item}</td>
                        <td className="text-capitalize">{item.uom}</td>
                        <td className="text-capitalize">{item.qty}</td>
                        <td className="text-capitalize">{item.rate}</td>
                        <td className="text-uppercase">{item.po_number}</td>
                        <td>{item.qty * item.rate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <table style={{ minWidth: 750 }} className="table table-bordered text-center table-sm table-striped">
                <thead>
                  <tr>
                  <th>Loading Charges</th>
                  <th>Dharmada</th>
                  <th>Tulai</th>
                  <th>Wages</th>
                  <th>Commision</th>
                  <th></th>
                  <th>Sub Total</th>
                  <td>{this.subTotalCost}</td>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                    <td>{this.state?.bill?.expenses.loading_charges*400}</td>
                    <td>{this.state?.bill?.expenses.dharmada*this.subTotalCost/100}</td>
                    <td>{this.state?.bill?.expenses.tulai*this.subTotalCost/100}</td>
                    <td>{this.state?.bill?.expenses.wages*300}</td>
                    <td>{this.state?.bill?.expenses.commision*this.subTotalCost/100}</td>
                    <th></th>
                    <th align="right">Frieght</th>
                    <td>{this.state?.bill?.frieght}</td>
                    </tr>
                    <tr>
                      <th>Mandi Shulk</th>
                      <th>Vikas Shulk</th>
                      <th>Sutli</th>
                      <th>Bardana</th>
                      <th>Others</th>
                      <th></th>
                      <th align="right">Expense Total</th>

                      <td>{this.subTotalCost}</td>
                    </tr>
                    <tr>
                    <td>{this.state?.bill?.expenses.mandi_shulk*this.subTotalCost/100}</td>
                    <td>{this.state?.bill?.expenses.vikas_shulk*this.subTotalCost/100}</td>
                    <td>{this.state?.bill?.expenses.sutli*400}</td>
                    <td>{this.state?.bill?.expenses.bardana*400}</td>
                    <td>{this.state?.bill?.expenses.others}</td>
                    <th></th>
                    <th align="right">GRAND TOTAL</th>
                    <th>{this.subTotalCost+this.subTotalCost}</th>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(InvoiceViewer);
