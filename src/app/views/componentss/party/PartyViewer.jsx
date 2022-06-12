import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPartyByID } from "./PartyService";
import { format } from "date-fns";
import { withRouter } from "react-router-dom";
class PartyViewer extends Component {
  state = {};
  subTotalCost = 0
  componentDidMount() {
    getPartyByID(this.props.match.params.id).then((res) => {
      this.setState({ party: res.data });
    });
  }

  render() {
    return (
      <div className="invoice-viewer py-16">
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link to="/party/list">
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
            <Button
              className="mr-3 py-2"
              variant="primary"
              onClick={() => this.props.togglePartyEditor()}
            >
              Edit Party
            </Button>
          </div>
        </div>

        <div id="print-area" className="px-3">
          <div className="table-responsive">
            <div className="col">
                    <h4 className="fw-bold">BILLING DETAILS OF {this.state?.party?.name?.toUpperCase()}</h4>
                  </div>
                <table id="user_table" className="table">
                  <thead>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="pl-sm-24 capitalize" align="left">
                      <strong> Company GSTIN :- </strong>
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {this.state?.party?.gstin}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      <strong> Company Address :- </strong>
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {this.state?.party?.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-sm-24 capitalize" align="left">
                      <strong> Company State :- </strong>
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {this.state?.party?.state}
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      <strong> Company State Code :- </strong>
                    </td>
                    <td className="pl-sm-24 capitalize" align="left">
                      {this.state?.party?.state_code}
                    </td>
                  </tr>
                 </tbody>
                 </table>
                 <div className="table-responsive">
                 <div className="col">
                    <h4 className="fw-bold">SHIPING DETAILS OF {this.state?.party?.name?.toUpperCase()}</h4>
                  </div>
                 <table className="table">
                   <thead>
                   </thead>
                 <tbody>
                  <tr>
                    <td>
                      <strong> Name :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.ship_details?.name?.toUpperCase()}
                    </td>
                    <td>
                      <strong> GSTIN :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.ship_details?.gstin}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Address :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.ship_details?.address}
                    </td>
                    <td>
                      <strong> State :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.ship_details?.state}
                    </td>
                  </tr>
                  </tbody>
                </table>
                </div>
                {this.state?.party?.expense?.tulai===""?<></>:
                <div className="table-responsive">
                 <div className="col">
                    <h4 className="fw-bold">EXPENSE DETAILS OF {this.state?.party?.name?.toUpperCase()}</h4>
                  </div>
                 <table className="table">
                   <thead>
                   </thead>
                 <tbody>
                  <tr>
                    <td>
                      <strong> Tulai :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.tulai} % OF AMOUNT
                    </td>
                    <td>
                      <strong> Dharmada :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.dharmada} % OF AMOUNT
                    </td>
                    <td>
                      <strong> Wages :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.wages} PER QTL
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Commision :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.commision} % OF AMOUNT
                    </td>
                    <td>
                      <strong> Mandi Shulk :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.mandi_shulk} % OF AMOUNT
                    </td>
                    <td>
                      <strong> Vikas Shulk :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.vikas_shulk} % OF AMOUNT
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Sutli :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.sutli} PER BAG
                    </td>
                    <td>
                      <strong> Loading Charge :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.loading_charges} PER BAG
                    </td>
                    <td>
                      <strong> Total Other Expense :- </strong>
                    </td>
                    <td>
                      {this.state?.party?.expense?.others} 
                    </td>
                  </tr>
                  </tbody>
                </table>
                </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PartyViewer);
