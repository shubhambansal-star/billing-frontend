import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { getAllParty, deleteParty } from "./PartyService";
import swal from "sweetalert2";
import ReactPaginate from "react-paginate";
class PartyList extends Component {
  state = {
    partyList: [],
    pageNumber: 0,
    billperpage:1,
    count: null,
    shouldShowConfirmationDialog: false
  };
  pageNumber= 0
  billperpage= 5

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

  componentDidMount() {
    getAllParty(this.billperpage,this.pageNumber,this.props.search).then(res => this.setState({ partyList: res.data.results, count: res.data.count }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pageNumber !== this.state.pageNumber) {
    getAllParty(this.billperpage,this.pageNumber,this.props.search).then(res => this.setState({ partyList: res.data.results, count: res.data.count }));
  }
  if (prevState.billperpage !== this.state.billperpage) {
    getAllParty(this.billperpage,this.pageNumber, this.props.search).then(res => this.setState({ partyList: res.data.results, count: res.data.count }));
  }
  if (prevProps.search !== this.props.search) {
    getAllParty(this.billperpage,this.pageNumber, this.props.search).then(res => this.setState({ partyList: res.data.results, count: res.data.count }));
  }
}

  handeViewClick = companyId => {
    this.props.history.push(`/party/${companyId}`);
  };

  handleDeleteInvoice = id => {
    deleteParty(id).then(res => {
      swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        type: "success",
        icon: "success",
        timer: 1500
      });
      this.setState({
        partyList: res.data,
        shouldShowConfirmationDialog: false
      });
    });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowConfirmationDialog: false });
  };

  render() {
    let { partyList } = this.state;
    return (
      <div>
        <div className="w-100 overflow-auto">
          <Table style={{ minWidth: 750 }}>
            <thead>
              <tr>
                <th className="pl-sm-24">Party Name</th>
                <th className="px-0">GSTIN</th>
                <th className="px-0">Address</th>
                <th className="px-0">State</th>
                <th className="px-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {partyList.map((party, index) => (
                <tr key={party.id}>
                  <td className="pl-sm-24 capitalize" align="left">
                    {party.name}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {party.gstin}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {party.address}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {party.state}
                  </td>        
                  <td className="pl-0">
                    <i
                      className="i-Arrow-Right mr-4 font-weight-900 text-primary cursor-pointer"
                      onClick={() => this.handeViewClick(party.id)}
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
                              this.handleDeleteInvoice(party.id);
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

export default PartyList;
