import React, { Component } from "react";
import {  Row, Col, Button } from "react-bootstrap";
import { getAllLoadingUnloading, deleteBroker } from "./PurchaseOrderService";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import moment from "moment"
import { classList, isMobile } from "@utils";
class SalesOrderList extends Component {
  state = {
    companyList: [],
    pageNumber: 0,
    billperpage:5,
    count: null,
    shouldShowConfirmationDialog: false
  };
  pageNumber= 0
  billperpage= 5

  componentDidMount() {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
  componentDidUpdate(prevProps, prevState) {
  if (prevState.pageNumber !== this.state.pageNumber) {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
  if (prevState.change !== this.state.change) {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
  if (prevState.billperpage !== this.state.billperpage) {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
  if (prevProps.filter !== this.props.filter) {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
  if (prevProps.search_term !== this.props.search_term) {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
  if (prevProps.start_date !== this.props.start_date) {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
  if (prevProps.end_date !== this.props.end_date) {
    getAllLoadingUnloading(this.props.filter, this.props.search_term, this.props.start_date, this.props.end_date,this.billperpage,this.pageNumber).then(res => this.setState({ companyList: res.data.results, count: res.data.count }));
  }
}
  handleSelectCount = data => {
    this.billperpage=data.target.value
    if(this.billperpage*this.pageNumber>=this.state.count){
      this.pageNumber=Math.ceil( this.state.count/this.billperpage)-1
      this.setState({pageNumber:Math.ceil( this.state.count/this.billperpage)-1,billperpage:data.target.value})
    }else{
    this.setState({billperpage:data.target.value})}
  }
  handlePageClick = data => {
    this.pageNumber=data.selected
    this.setState({pageNumber:data.selected})
  };
  handeViewClick = companyId => {
    this.props.history.push(`/orders/unload/${companyId}`);
  };

  handleDeleteInvoice = id => {
    deleteBroker(id).then(res => {
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
            {isMobile()?
            <>
            <div className="mb-2"style={{ borderBottom: "1px dashed #003473" }}></div>
            {companyList.map((company, index) => (
              <div  key={company.id} className="invoice-details mt-2">
            <table  className="table table-borderless">
              <tbody className={classList({
                "text-uppercase":true,
                      })}>
                <tr>
                  <th>Loading Date</th>
                  <td className="pl-sm-24 capitalize" align="left">
                    {moment(new Date(company.date)).format("DD-MMM-YYYY")}
                  </td>
                </tr>
                <tr>
                  <th>Vehicle No</th>
                  <td className="pl-0 text-uppercase" align="left">
                    {company.vehicle_number}
                  </td>
                  </tr>
                <tr>
                  <th>Genes</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.genes}
                  </td>
                  </tr>
                <tr>
                  <th>Loading From</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.loading_from_name.map((obj)=>{return obj.label}).join(', ')}
                  </td>
                  </tr>
                <tr>
                  <th>Load Weight</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.quantity} Qtl
                  </td>
                  </tr>
                <tr>
                  <th>Unload Date</th>
                  <td className="pl-0 capitalize" align="left">
                    {moment(new Date(company.unloading_date)).format("DD-MMM-YYYY")}
                    
                  </td>
                  </tr>
                <tr>
                  <th>Unloaded To</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.unloading_from_name.map((obj)=>{return obj.label}).join(", ")}
                  </td>
                  </tr>
                <tr>
                  <th>Unload Weight</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.unloaded_quantity} Qtl
                  </td>
                  </tr>
                <tr>
                  <th>Freight/qtl</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.freight}
                  </td>
                  </tr>
                <tr>
                  <th>Freight Paid</th>
                  <td className="pl-0 capitalize" align="left">
                    {(company.frieght_paid_at_loading?company.frieght_paid_at_loading.toString():"0") + "+"+ (company.frieght_at_unloading?company.frieght_at_unloading.toString():"0")}
                  </td>
                  </tr>
                <tr>
                  <td className="pl-0">
                    <Button className="p-1 mx-2" variant="primary" onClick={() => this.handeViewClick(company.id)}>
                      Details
                      <i className="i-Arrow-Right font-weight-900 text-white cursor-pointer"></i>
                    </Button>
                    </td><td>
                    <Button variant="danger" className="p-1 text-white" onClick={() => {
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
                                            }}> Delete <i className="i-Folder-Trash font-weight-900 cursor-pointer text-white"></i></Button>
                  </td>
                </tr>

              </tbody>
            </table>
            <div className="mb-2"style={{ borderBottom: "1px dashed #003473" }}></div></div>))}
            </>:
            <div className="invoice-details w-100 overflow-auto">
          <table className="table table-bordered" style={{ minWidth: 750 }}>
            <thead className="text-center bg-grey-500">
              <tr>
                <th className="pl-sm-24">Date</th>
                <th className="px-0">Vehicle Number</th>
                <th className="px-0">Genes</th>
                <th className="px-0">Loading From</th>
                <th className="px-0">Quantity</th>
                <th className="px-0">Unloaded Date</th>
                <th className="px-0">Unloaded To</th>
                <th className="px-0">Quantity</th>
                <th className="px-0">Frieght</th>
                <th className="px-0">Frieght Paid</th>
                <th className="px-0">Type</th>
                <th className="px-0">Action</th>
              </tr>
            </thead>
            <tbody className="text-center text-capitalize">
              {companyList.map((company, index) => (
                <tr key={company.id}>
                  <td className="pl-sm-24 capitalize" align="left">
                    {moment(new Date(company.date)).format("DD-MMM-YYYY")}
                  </td>
                  <td className="pl-0 text-uppercase" align="left">
                    {company.vehicle_number}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.genes}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.loading_from_name.map((obj)=>{return obj.label}).join(', ')}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.quantity} Qtl
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {moment(new Date(company.unloading_date)).format("DD-MMM-YYYY")}
                    
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.unloading_from_name.map((obj)=>{return obj.label}).join(", ")}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.unloaded_quantity} Qtl
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.freight}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {(company.frieght_paid_at_loading?company.frieght_paid_at_loading:"0")+ "+"+ (company.frieght_at_unloading?company.frieght_at_unloading:"0")}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    <span 
                      className={classList({
                        "badge rounded-pill text-white fw-bold": true,
                        "bg-success": company.bill_or_builty==="bill",
                        "bg-danger": company.bill_or_builty!=="bill",
                      })}
                    >
                      {company.bill_or_builty==="bill"? "bill":"builty"}
                    </span>
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
          </table>
          
          </div>}
          <div className="row mb-3">
          <div className="d-flex justify-content-center">
          <select
            id="picker1"
            className="form-control"
            name="select"
            value={this.billperpage}
            onChange={this.handleSelectCount}
            style={{width: "4em", height:"2.5em"}}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <div className="mt-1">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.count/this.billperpage}
            marginPagesDisplayed={0}
            pageRangeDisplayed={2}
            onPageChange={(data) => {this.handlePageClick(data)}}
            containerClassName={"pagination pagination-lg"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            forcePage={this.pageNumber}
          />
          </div>
          </div>
        </div>
        </Col>
      </Row>
    );
  }
}

export default SalesOrderList;
