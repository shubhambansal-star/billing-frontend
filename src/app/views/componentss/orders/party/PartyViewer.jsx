import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPartyByID } from "./PartyService";
import { withRouter } from "react-router-dom";
import { isMobile } from "@utils";
class PartyViewer extends Component {
  state = {};
  subTotalCost = 0
  componentDidMount() {
    if(this.props.match.params.id!=="create")
    getPartyByID(this.props.match.params.id).then((res) => {
      this.setState({ broker: res.data });
    });
  }

  render() {
    return (
      <div className="invoice-viewer py-16">
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link to="/orders/party/list">
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
            <Button
              className="mr-3 py-2"
              variant="primary"
              onClick={() => this.props.toggleBrokerEditor()}
            >
              Edit Party
            </Button>
          </div>
        </div>

        <div id="print-area" className="px-3">
          <div className="table-responsive">
                    
                <table id="user_table" className="table table-borderless">
                  <thead>
                  </thead>
                  {isMobile()?
                  <tbody>
                  <tr>
                    <td>
                      <strong> Name </strong>
                    </td>
                    <td>
                      {this.state?.broker?.name?.toUpperCase()}
                    </td>
                    </tr>
                  <tr>
                     <td>
                      <strong> Type </strong>
                    </td>
                    <td className="text-uppercase">
                      {this.state?.broker?.party_type}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Email ID </strong>
                    </td>
                    <td>
                      {this.state?.broker?.email}
                    </td>
                    </tr>
                  <tr>
                    <td>
                      <strong> Mobile No </strong>
                    </td>
                    <td>
                      {this.state?.broker?.contact_number}
                    </td>
                   
                  </tr>
                  </tbody>
                  :
                  <tbody>
                  <tr>
                    <td>
                      <strong> Name </strong>
                    </td>
                    <td>
                      {this.state?.broker?.name?.toUpperCase()}
                    </td>
                     <td>
                      <strong> Type </strong>
                    </td>
                    <td className="text-uppercase">
                      {this.state?.broker?.party_type}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong> Email ID </strong>
                    </td>
                    <td>
                      {this.state?.broker?.email}
                    </td>
                    <td>
                      <strong> Mobile No </strong>
                    </td>
                    <td>
                      {this.state?.broker?.contact_number}
                    </td>
                   
                  </tr>
                  </tbody>}
                  
                </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PartyViewer);
