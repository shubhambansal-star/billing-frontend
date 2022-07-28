import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getDetailedUnloadingByID, deleteBroker } from "./PurchaseOrderService";
import { withRouter } from "react-router-dom";
import swal from "sweetalert2";
import { format } from "date-fns";
import { classList } from "@utils";
import moment from "moment"
class BrokerViewer extends Component {
  state = {
    broker:{}
  };
  sum = 0
  sum_q=0
  async componentDidMount() {
    if(this.props.match.params.id!=="create")
    getDetailedUnloadingByID(this.props.match.params.id).then((res) => {
      this.setState({ broker: res.data });
    });
  }
handleDeleteInvoice = invoice => {
    deleteBroker(invoice).then(res => {
      swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        type: "question",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Okay",
        icon: "success",
      }).then(result=>{if(result.value){ this.props.history.push(`/orders/sales/list`)}});
    });
  };
  render() {
    return (
      <div 
      className={classList({
        "invoice-viewer py-16": true,
        
      })}>
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link to="/orders/loading/list">
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
            <Button
              className="mr-3 mx-2 py-2"
              variant="primary"
              onClick={() => this.props.toggleSalesOrderEditor()}
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
              <h3 className="font-weight-bold"><strong>Details <span className={classList({
                                            "badge rounded-pill text-white fw-bold": true,
                                            "bg-success": this.state?.broker?.unloaded ,
                                            "bg-warning": !this.state?.broker?.unloaded
                                          })}
                                        >
                                          {this.state?.broker?.unloaded? "Unloaded":"Pending"}
                    
                                        </span></strong></h3>
              <p>#{this.state?.broker?.id} </p>
            </div>
            <div className="col-md-6 text-right">
              <div className="text-capitalize">
                <strong> Road :</strong> {this.state?.broker?.bill_or_builty==="bill"
                    ? "Bill"
                    : this.state?.broker?.bill_or_builty}
              </div>
              <div>
                <strong>Vehicle Number: </strong>
                <span>
                  {this.state?.broker?.vehicle_number}
                </span>
              </div>
              <div>
                <strong>Genes: </strong>
                <span>
                  {this.state?.broker?.genes}
                </span>
              </div>
            </div>
          </div>
          <div className="mb-2 border-bottom"></div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <h4><strong>Loading Details</strong></h4>
                <div>
                <strong>Loading From :- &nbsp; </strong>{this.state?.broker?.loading_from_name?.map((obj)=>{return obj.label}).join(', ')}
                </div>
                <div>
                <strong>Date :- &nbsp; </strong>{this.state?.broker?.date
                    ? format(new Date(this.state?.broker?.date).getTime(), "dd MMMM, yyyy")
                    : ""}
                </div>
                <div>
                <strong>Load Weight :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.quantity + " QTL": null}
                </div>
                <div>
                <strong>Advance :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.frieght_paid_at_loading : null}
                </div>
                <div>
                <strong>Remarks :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.remarks : null}
                </div>
            </div>
            {this.state?.broker?.unloaded?
            <div className="col-md-6 text-right">
              <h4><strong>Unloading Details</strong></h4>
                <div>
                <strong>Unloaded To :- &nbsp; </strong>{this.state?.broker?.unloading_from_name?.map((obj)=>{return obj.label}).join(', ')}
                </div>
                <div>
                <strong>Date :- &nbsp; </strong> {this.state?.broker?.unloading_date
                    ? format(new Date(this.state?.broker?.unloading_date).getTime(), "dd MMMM, yyyy")
                    : ""}
                </div>
                <div>
                <strong>Unload Weight :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.unloaded_quantity + " QTL": null}
                </div>
                <div>
                <strong>Advance :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.frieght_at_unloading : null}
                </div>
                <div>
                <strong>Remarks :- &nbsp; </strong>{this.state?.broker ? this.state?.broker?.unloading_remarks : null}
                </div>
            </div>:
            <div className="col-md-6 text-right">
          {this.state.broker?.loadings?.length===0 || this.state.broker?.loadings===undefined ? <></>:<>
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table className="table mb-4">
                <thead className="bg-gray-300">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Party Name</th>
                    <th scope="col">Broker Name</th>
                    <th scope="col">Weight Slip</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.broker?.loadings?.map((item,index)=>{
                    this.sum_q = this.sum_q + item.quantity_loaded
                    return(
                    <tr key={index+1}>
                    <td className="text-capitalize">{index+1}</td>
                    <td className="text-uppercase">{item.party}</td>
                    <td className="text-uppercase">{item.broker}</td>
                    <td className="text-capitalize">{item.quantity_loaded} QTL</td>
                  </tr>
                  )})}
                  
                </tbody>
                <tfoot>
                  <tr className="bg-gray-300">
                    <td></td>
                    <td></td>
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-uppercase">{this.sum_q} QTL</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div></>}
          </div>}
            
          </div>
          {this.state?.broker?.unloaded?
          <div className="row">
            <div className="col-md-6">
          {this.state.broker?.loadings?.length===0 || this.state.broker?.loadings===undefined ? <></>:<>
          <div className="mb-1 mt-2">
          <h5><strong>loading Details</strong></h5>
          <div className="mb-2 border-bottom"></div>
          </div>
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table className="table mb-4">
                <thead className="bg-gray-300">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Party Name</th>
                    <th scope="col">Broker Name</th>
                    <th scope="col">Weight Slip</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.broker?.loadings?.map((item,index)=>{
                    this.sum_q = this.sum_q + item.quantity_loaded
                    return(
                    <tr key={index+1}>
                    <td className="text-capitalize">{index+1}</td>
                    <td className="text-uppercase">{item.party}</td>
                    <td className="text-uppercase">{item.broker}</td>
                    <td className="text-capitalize">{item.quantity_loaded} QTL</td>
                  </tr>
                  )})}
                  
                </tbody>
                <tfoot>
                  <tr className="bg-gray-300">
                    <td></td>
                    <td></td>
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-uppercase">{this.sum_q} QTL</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div></>}
          </div>
          
          {this.state?.broker?.unloaded?
          <div className="col-md-6 text-right">
          {this.state.broker?.unloadings?.length===0 || this.state.broker?.unloadings===undefined ? <></>:<>
          <div className="mb-1 mt-2">
          <h5><strong>Unloading Details</strong></h5>
          <div className="mb-2 border-bottom"></div>
          </div>
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table className="table mb-4">
                <thead className="bg-gray-300">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Party Name</th>
                    <th scope="col">Broker</th>
                    <th scope="col">Unload Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.broker?.unloadings?.map((item,index)=>{
                    
                    this.sum_q = this.sum_q + item.quantity_unloaded
                    return(
                    <tr key={index+1}>
                    <td className="text-capitalize">{index+1}</td>
                    <td className="text-uppercase">{item.party}</td>
                    <td className="text-uppercase">{item.broker}</td>
                    <td className="text-capitalize">{item.quantity_unloaded} QTL</td>
                  </tr>
                  )})}
                  
                </tbody>
                <tfoot>
                  <tr className="bg-gray-300">
                    <td></td>
                    <td></td>
                    
                    <td className="fw-bold">Total</td>
                    <td className="fw-bold text-uppercase">{this.sum_q} QTL</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div></>}
          </div>:<></>}
          </div>:<></>}
        </div>
      </div>
    );
  }
}

export default withRouter(BrokerViewer);
