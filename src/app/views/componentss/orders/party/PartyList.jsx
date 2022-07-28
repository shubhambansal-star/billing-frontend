import React, { Component } from "react";
import { Table, Button, Card, Row, Col } from "react-bootstrap";
import { getAllParty, deleteParty } from "./PartyService";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { isMobile } from "@utils";

class OrderPartyList extends Component {
  state = {
    companyList: [],
    change: false,
    shouldShowConfirmationDialog: false
  };

  componentDidMount() {
    getAllParty(this.props.partyType,this.props.search).then(res => this.setState({ companyList: res.data }));
  }
  componentDidUpdate(prevProps, prevState){
    if (prevProps.search !== this.props.search) {
    getAllParty(this.props.partyType,this.props.search).then(res => this.setState({ companyList: res.data }));
  }
  if(this.state.change!==prevState.change){
      getAllParty(this.props.partyType,this.props.search).then(res => this.setState({ companyList: res.data }));
    }
  }

  handeViewClick = companyId => {
    this.props.history.push(`/orders/party/${companyId}`);
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
      
                <div className="row justify-content-between">
            {isMobile()?
            <>
          {companyList.map((company, index) => (
            <>
            <table className="table table-borderless" style={{ marginBottom: "0rem" }}>
              <tbody>
                <tr key={company.id}>
                  <th>Name</th>
                  <td className="pl-sm-24 capitalize" align="left">
                    {company.name}
                  </td>
                </tr>
                <tr>
                  <th>Mobile No.</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.contact_number}
                  </td>
                  </tr>
                <tr>
                  <th>Email</th>
                  <td className="pl-0 capitalize" align="left">
                    {company.email}
                  </td>
                  </tr>
                
                <tr>
                  <td className="pl-0">
                    <Button className="p-1 mx-2" variant="primary" onClick={() => this.handeViewClick(company.id)}>
                      Details
                      <i className="i-Arrow-Right font-weight-900 text-white cursor-pointer"></i>
                    </Button>
                    </td>
                    <td>
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
                <div className="mt-2 mb-4"style={{ borderBottom: "1px dashed #003473" }}></div>
                </>
              ))}

          </>:      
          <Table style={{ minWidth: 750 }}>
            <thead>
              <tr>
                <th className="pl-sm-24">Broker Name</th>
                <th className="px-0">Contact Number</th>
                <th className="px-0">Email</th>
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
                    {company.contact_number}
                  </td>
                  <td className="pl-0 capitalize" align="left">
                    {company.email}
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
          </Table>}
          {companyList.length===0?<h5 className="fw-bold text-danger text-center">No Party</h5>:<></>}
          </div>
    );
  }
}

export default OrderPartyList;
