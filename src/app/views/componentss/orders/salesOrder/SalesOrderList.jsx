import React, { Component } from "react";
import { Table, Tab, Tabs, Row, Col,Card,Nav, Button } from "react-bootstrap";
import { getAllSalesOrder, deleteSalesOrder } from "./SalesOrderService";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import moment from "moment"
import { isMobile } from "@utils";
import { classList } from "@utils";
class SalesOrderList extends Component {
  state = {
    change: true,
    companyList: [],
    shouldShowConfirmationDialog: false,
    orderperpage:5,
    pageNumber: 0,
    count: null,
  };
  pageNumber= 0
  orderperpage= 5
  componentDidMount() {
    getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.change!==this.state.change){
      getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
    }

  if (prevProps.start_date !== this.props.start_date) {
    getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
  }
  if (prevProps.pending !== this.props.pending) {
    getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
  }
  if (prevProps.end_date !== this.props.end_date) {
    getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
  }
  if (prevProps.search !== this.props.search) {
    getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
  }
  if (prevState.pageNumber !== this.state.pageNumber) {
    getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
  }
  if (prevState.orderperpage !== this.state.orderperpage) {
    getAllSalesOrder(this.orderperpage,this.pageNumber,this.props.salesType, this.props.search, this.props.start_date, this.props.end_date, this.props.pending).then(res => this.setState({ companyList: res.data.results, count:res.data.count }));
  }
}
handlePageClick = data => {
    this.pageNumber=data.selected
    this.setState({pageNumber:data.selected})
  };
  handleSelectCount = data => {
    this.orderperpage=data.target.value
    if(this.orderperpage*this.pageNumber>=this.state.count){
      this.pageNumber=Math.ceil( this.state.count/this.orderperpage)-1
      this.setState({pageNumber:Math.ceil( this.state.count/this.orderperpage)-1,orderperpage:data.target.value})
    }else{
    this.setState({orderperpage:data.target.value})}
  }

  handeViewClick = invoiceId => {
    this.props.history.push(`/orders/sales/${invoiceId}`);
  };

  handleDeleteInvoice = invoice => {
    deleteSalesOrder(invoice).then(res => {
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
      <div>
        {isMobile()?
        <>
        {companyList?.map((item, index) => {
                          return (
                            <div key={item.id}>
                              <div
                                style={{backgroundColor:"primary"}}
                                elevation={0}
                                key={item.id}
                              >
                                <div className="row">
                                  <table className="table table-borderless" style={{ marginBottom: "0rem" }}>
                                    <tbody>
                                      <tr>
                                        <th style={{width:"45%"}}>Date</th>
                                        <td>{moment(new Date(item.date)).format("DD-MMM-YYYY")}</td>
                                      </tr>
                                      {item.broker_name?<tr>
                                        <th>Broker</th>
                                        <td className="text-capitalize">{item.broker_name}</td>
                                      </tr>:<></>}
                                      {item.party_name?<tr>
                                        <th>Party</th>
                                        <td className="text-capitalize">{item.party_name}</td>
                                      </tr>:<></>}
                                      <tr>
                                        <th>Total Quantity</th>
                                        <td className="text-capitalize">{item.quantity ? item.quantity : 0} {item.unit}</td>
                                      </tr>
                                      <tr>
                                        <th>Rate</th>
                                        <td className="text-capitalize">{item.rate ? item.rate : 0}</td>
                                      </tr>
                                      <tr>
                                        <th>Status</th>
                                        <td className={classList({
                                            "badge rounded-pill text-white": true,
                                            "bg-success": item.pending === 0,
                                            "bg-warning": item.pending !== 0,
                                          })}
                                        >
                                          {item.pending===0? "Completed":"Pending"}
                    
                                        </td>
                                      </tr>
                                      
                                      
                                        {item.pending!==0?<tr>
                                        <th>Pending Quanity</th>
                                        <td className="text-capitalize">{item.pending ? item.pending : 0} {item.unit}</td>
                                      </tr>:<></>}

                                      <tr>
                                        <td><Button variant="dark" onClick={() => this.handeViewClick(item.id)}>Details <i className="i-Arrow-Right mr-4 font-weight-900 cursor-pointer"></i> </Button></td>
                                        <td><Button variant="danger" className="text-white" onClick={() => {
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
                                                  this.handleDeleteInvoice(item.id);
                                                }
                                              });
                                            }}> Delete <i className="i-Folder-Trash font-weight-900 cursor-pointer text-white"></i></Button>
                                        </td>
                                      </tr>
                                      
                                    </tbody>
                                  </table>
                                </div>

                              </div>
                              <div className="mb-2"style={{ borderBottom: "1px dashed #003473" }}></div>
                            </div>
                          )
        })}  
        </>:
        <div className="w-100 overflow-auto">
          <Table style={{ minWidth: 750 }}>
            {this.props.salesType==="mandi-sales"?<thead>
              <tr>
                <th className="pl-0">Date</th>
                <th className="pl-0">Party</th>
                <th className="pl-0">Genes</th>
                <th className="pl-0">Quantity</th>
                {this.props.pending!=="pending=0"?<th className="pl-0">Pending</th>:<></>}
                <th className="pl-0">Rate</th>
                <th className="pl-0">Action</th>
              </tr>
            </thead>:
            <thead>
              <tr>
                <th className="pl-0">Date</th>
                <th className="pl-0">Broker</th>
                <th className="pl-0">Party</th>
                <th className="pl-0">Genes</th>
                <th className="pl-0">Quantity</th>
                {this.props.pending!=="pending=0"?<th className="pl-0">Pending</th>:<></>}
                <th className="pl-0">Rate</th>
                <th className="pl-0">Action</th>
              </tr>
            </thead>}
            <tbody>
              {companyList.map((company, index) => (
                this.props.salesType==="mandi-sales"?
                <tr key={company.id}>
                  <td className="pl-sm-24 text-capitalize" align="left">
                    {moment(new Date(company.date)).format("DD-MMMM-YYYY")}
                  </td>
                  <td className="pl-0 text-capitalize" align="left">
                    {company.party_name}
                  </td>
                  <td className="pl-0 text-capitalize" align="left">
                    {company.genes}
                  </td>
                  <td className="pl-sm-24 text-capitalize" align="left">
                    {company.quantity} {company.unit}
                  </td>
                  {this.props.pending!=="pending=0"?<td className="pl-sm-24 text-capitalize" align="left">
                    {company.pending} {company.unit}
                  </td>:<></>}
                  <td className="pl-0 text-capitalize" align="left">
                    {company.rate}
                  </td>
                  <td className="pl-0">
                    <Button className="p-1 mx-2" variant="primary" onClick={() => this.handeViewClick(company.id)}>
                      Details
                      <i className="i-Arrow-Right font-weight-900 text-white cursor-pointer"></i>
                    </Button>
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
                </tr>:<tr key={company.id}>
                  <td className="pl-sm-24 text-capitalize" align="left">
                    {moment(new Date(company.date)).format("DD-MMMM-YYYY")}
                  </td>
                  <td className="pl-0 text-capitalize" align="left">
                    {company.broker_name}
                  </td>
                  <td className="pl-0 text-capitalize" align="left">
                    {company.party_name}
                  </td>
                  <td className="pl-0 text-capitalize" align="left">
                    {company.genes}
                  </td>
                  <td className="pl-0 text-capitalize" align="left">
                    {company.quantity} {company.unit}
                  </td>
                  {this.props.pending!=="pending=0"?<td className="pl-0 text-capitalize" align="left">
                    {company.pending} {company.unit}
                  </td>:<></>}
                  
                  <td className="pl-0 capitalize" align="left">
                    {company.rate}
                  </td>
                  <td className="pl-0">
                    <Button className="p-1 mx-2" variant="primary" onClick={() => this.handeViewClick(company.id)}>
                      Details
                      <i className="i-Arrow-Right font-weight-900 text-white cursor-pointer"></i>
                    </Button>
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
  ))}
            </tbody>
          </Table>          
        </div>}
        <div className="row mt-3 mb-3">
          <div className="d-flex justify-content-center">
          <select
            id="picker1"
            className="form-control"
            name="select"
            value={this.orderperpage}
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
            pageCount={this.state.count/this.orderperpage}
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
      </div>
    );
  }
}

export default SalesOrderList;
