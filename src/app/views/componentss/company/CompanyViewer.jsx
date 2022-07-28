import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCompanyByID } from "./CompanyService";
import { withRouter } from "react-router-dom";
import InboxComposeDialog from "./companyLetterHeadDialog"
class CompanyViewer extends Component {
  state = { composeDialogOpen: false};
  subTotalCost = 0
  closeDialog = () => {
    this.setState({composeDialogOpen: false});
  };
  componentDidMount() {
    if(this.props.match.params.id!=="create"){
      getCompanyByID(this.props.match.params.id).then((res) => {
      this.setState({ company: res.data });
    });
    }
  }

  render() {
    return (
      <div className="invoice-viewer py-16">
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link to="/invoice/company/list">
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
        <Button
              className="mx-3 py-2"
              variant="dark"
              onClick={() => this.setState({composeDialogOpen: true})}
            >
              Compose Letter Head
            </Button>
            <Button
              className="mr-3 py-2"
              variant="primary"
              onClick={() => this.props.toggleCompanyEditor()}
            >
              Edit Company
            </Button>
          </div>
        </div>

        <InboxComposeDialog
        open={this.state.composeDialogOpen}
        handleClose={this.closeDialog}
      ></InboxComposeDialog>

        <div id="print-area" className="px-3">
          <div className="table-responsive">
            <div className="col">
                    <h4 className="fw-bold">DETAILS OF {this.state?.company?.name?.toUpperCase()}</h4>
                  </div>
                <table id="user_table" className="table">
                  <thead>
                  </thead>
                  <tbody>
                    
                  <tr>
                    <td>
                      <strong> Company GSTIN :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.gstin}
                    </td>
                    <td>
                      <strong> Company Address :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.address}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Company State :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.state}
                    </td>
                    <td>
                      <strong> Company State Code :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.state_code}
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-sm-24 capitalize" align="left">
                      <strong> Mobile No :- </strong>
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {this.state?.company?.mobile1}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      <strong> Alternative Mobile No :- </strong>
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {this.state?.company?.mobile2}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Bank Name :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.bank_name}
                    </td>
                    <td>
                      <strong> Bank Account No :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.bank_account_no}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Bank IFSC :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.bank_ifsc}
                    </td>
                    <td>
                      <strong> Bank Branch :- </strong>
                    </td>
                    <td>
                      {this.state?.company?.bank_branch}
                    </td>
                  </tr>
                  </tbody>
                  
                </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CompanyViewer);
