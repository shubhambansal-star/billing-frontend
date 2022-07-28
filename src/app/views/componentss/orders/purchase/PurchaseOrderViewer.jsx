import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDetailedPurchaseOrderByID, deletePurchaseOrder } from "./PurchaseOrderService";
import { withRouter } from "react-router-dom";
import swal from "sweetalert2";
import { format } from "date-fns";
import { classList } from "@utils";
class BrokerViewer extends Component {
  state = {};
  sum = 0
  sum_q=0
  componentDidMount() {
    if(this.props.match.params.id!=="create")
    getDetailedPurchaseOrderByID(this.props.match.params.id).then((res) => {
      this.setState({ broker: res.data });
    });
  }
handleDeleteInvoice = invoice => {
    deletePurchaseOrder(invoice).then(res => {
      swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        type: "question",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
        icon: "success",
      }).then(result=>{if(result.value){ this.props.history.push(`/orders/purchase/list`)}});
    });
  };
  render() {
    return (
      <div 
      className={classList({
        "invoice-viewer py-16": true,
        
      })}>
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link to="/orders/purchase/list">
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
            <Button
              className="mr-3 mx-2 py-2"
              variant="primary"
              onClick={() => this.props.togglePurchaseOrderEditor()}
            >
              Edit
            </Button>
            <Button
              className="mr-3 py-2"
              variant="danger text-white"
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
                      this.handleDeleteInvoice(this.state.broker?.id);
                    }
                  });
                }}
            >
              Delete
            </Button>
          </div>
        </div>

        <div id="print-area" className="px-3">
          <div className="row">
            <div className="col-md-6">
              <h3 className="font-weight-bold"><strong>Purchase Order <span className={classList({
                                            "badge rounded-pill text-white fw-bold": true,
                                            "bg-success": this.state?.broker?.pending === 0,
                                            "bg-warning": this.state?.broker?.pending !== 0,
                                          })}
                                        >
                                          {this.state?.broker?.pending===0? "Completed":"Pending"}
                    
                                        </span></strong></h3>
              <p>#{this.state?.broker?.id} </p>
            </div>
            <div className="col-md-6 text-right">
              <p className="text-capitalize">
                
                <strong>Purchase Type:</strong> {this.state?.broker?.purchase_type==="mandi-purchase"?"Mandi Purchase":"Purchase"}
              </p>
              <p>
                <strong>Purchase Date: </strong>
                <span>
                  {this.state?.broker?.date
                    ? format(new Date(this.state?.broker?.date).getTime(), "dd MMMM, yyyy")
                    : ""}
                </span>
                
              </p>
            </div>
          </div>
          <div className="mb-2 border-bottom"></div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <h4><strong>Party Details</strong></h4>
                <div>
                <strong>Name :- &nbsp; </strong>{this.state?.broker?.party_name ? this.state?.broker?.party_name : null}
                </div>
                <div>
                <strong>Contact Number :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.party_contact_number : null}
                </div>
            </div>
            {this.state?.broker?.broker_name?<div className="col-md-6 text-right">
              <h4><strong>Broker Details</strong></h4>
                <div>
                <strong>Name :- &nbsp; </strong>{this.state?.broker?.broker_name ? this.state?.broker?.broker_name : null}
                </div>
                <div>
                <strong>Contact Number :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.broker_contact_number : null}
                </div>
            </div>:<></>}
          </div>
          <div className="mb-2 border-bottom"></div>
          <h5><strong>Order Details</strong></h5>
          <div className="mb-1 border-bottom"></div>
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table className="table table-hover mb-4">
                <thead className="bg-gray-300">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Pending</th>
                    {this.state?.broker?.condition?<th scope="col">Condition</th>:<></>}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-capitalize">{1}</td>
                    <td className="text-uppercase">{this.state?.broker?.genes}</td>
                    <td className="text-uppercase">{this.state?.broker?.quantity} {this.state?.broker?.unit}</td>
                    <td className="text-capitalize">{this.state?.broker?.rate}</td>
                    <td className="text-uppercase">{this.state?.broker?.pending} {this.state?.broker?.unit}</td>
                    {this.state?.broker?.condition?<td scope="col" className="text-uppercase">{this.state?.broker?.condition}</td>:<></>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {this.state.broker?.loadings?.length===0? <></>:<>
          <div className="mb-1 mt-2">
          <h5><strong>Loading Details</strong></h5>
          <div className="mb-2 border-bottom"></div>
          </div>
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table className="table mb-4">
                <thead className="bg-gray-300">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Vehicle No.</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.broker?.loadings?.map((item,index)=>{
                    
                    this.sum = this.sum + item.quantity
                    this.sum_q = this.sum_q + item.quantity_loaded
                    return(
                    <tr key={index+1}>
                    <td className="text-capitalize">{index+1}</td>
                    <td className="text-uppercase">{format(new Date(item.date).getTime(), "dd MMMM, yyyy")}</td>
                    <td className="text-uppercase">{item.vehicle_number}</td>
                    <td className="text-capitalize">{item.quantity_loaded} QTL</td>
                    <td className="text-uppercase">{item.quantity} {this.state?.broker?.unit}</td>
                  </tr>
                  )})}
                  
                </tbody>
                <tfoot>
                  <tr className="bg-gray-300">
                    <td></td>
                    <td></td>
                    
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-uppercase">{this.sum_q} QTL</td>
                    <td className="fw-bold text-uppercase">{this.sum} {this.state?.broker?.unit}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div></>}
        </div>
      </div>
    );
  }
}

export default withRouter(BrokerViewer);
