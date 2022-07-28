import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { getAllInvoicebyCompany, deleteInvoice } from "./InvoiceService";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import moment from "moment";

class InvoiceList extends Component {
  state = {
    invoiceList: [],
    shouldShowConfirmationDialog: false,
    pageNumber: 0,
    billperpage:1,
    change: false,
    year: "2021-2022",
    count: null,
  };
  pageNumber= 0
  billperpage= 5
  year="2021-2022"
  handlePageClick = data => {
    this.pageNumber=data.selected
    this.setState({pageNumber:data.selected})
  };
  handleSelectCount = data => {
    this.billperpage=data.target.value
    if(this.billperpage*this.pageNumber>=this.state.count){
      this.pageNumber=Math.ceil( this.state.count/this.billperpage)-1
      this.setState({pageNumber:Math.ceil( this.state.count/this.billperpage)-1,billperpage:data.target.value})
    }else{
    this.setState({billperpage:data.target.value})}
  }
  handleSelectYear = data => {
    this.year=data.target.value
    this.setState({year:data.target.value})
  }
  componentDidMount() {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber, this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count: res.data.count }));
  }
  componentDidUpdate(prevProps, prevState) {
  if (prevState.pageNumber !== this.state.pageNumber) {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber,this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count: res.data.count }));
  }
  if (prevState.change !== this.state.change) {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber,this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count: res.data.count }));
  }
  if (prevState.billperpage !== this.state.billperpage) {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber,this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count:res.data.count }));
  }
  if (prevProps.year !== this.props.year) {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber,this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count: res.data.count }));
  }
  if (prevProps.search !== this.props.search) {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber,this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count: res.data.count }));
  }
  if (prevProps.start_date !== this.props.start_date) {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber,this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count: res.data.count }));
  }
  if (prevProps.end_date !== this.props.end_date) {
    getAllInvoicebyCompany(this.props.companyId,this.billperpage,this.pageNumber,this.props.year, this.props.search,this.props.start_date,this.props.end_date).then(res => this.setState({ invoiceList: res.data.results, count: res.data.count }));
  }
}

  handeViewClick = invoiceId => {
    this.props.history.push(`/invoice/invoice/${invoiceId}`);
  };

  handleDeleteInvoice = invoice => {
    deleteInvoice(invoice).then(res => {
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
    let { invoiceList } = this.state;
    return (
      <div>
        <div className="w-100 overflow-auto">
          <Table style={{ minWidth: 750 }}>
            <thead>
              <tr>
                <th className="px-0">Invoice No.</th>
                <th className="px-0">Date</th>
                <th className="px-0">Vehicle No.</th>
                <th className="px-0">Party Name</th>
                <th className="px-0">UOM</th>
                <th className="px-0">Quantity</th>
                <th className="px-0">Grand Total</th>
                <th className="px-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice, index) => (
                <tr key={invoice.id}>
                  <td className="pl-sm-24 capitalize" align="left">
                    {invoice.invoice_no}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {moment(new Date(invoice.date)).format("DD-MMM-YYYY")}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {invoice.vehicle_no}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {invoice.party_name}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {invoice.total_uom}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {invoice.total_qty}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {invoice.total_bill_amount}
                  </td>
                  <td className="pl-0">
                    <i
                      className="i-Receipt-3 mr-6 font-weight-1200 text-primary cursor-pointer"
                      onClick={() => this.handeViewClick(invoice.id)}
                    ></i>
                    <span> </span>
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
                              this.handleDeleteInvoice(invoice.id);
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
      </div>
    );
  }
}

export default InvoiceList;
