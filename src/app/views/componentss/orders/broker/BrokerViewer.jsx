import React, { Component } from "react";
import { Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBrokerByID } from "./BrokerService";
import { withRouter } from "react-router-dom";
import { isMobile } from "@utils";
class BrokerViewer extends Component {
  state = {
    broker:{},
    res:{
      purchaseOrder:[],
      salesOrder:[]
    }
  };
  subTotalCost = 0
  async componentDidMount() {
    if(this.props.match.params.id!=="create"){
      getBrokerByID(this.props.match.params.id).then((res) => {
      this.setState({ broker: res.data });
    });
    } 
  }

  render() {
    return (
      <div className="invoice-viewer py-16">
        <div className="viewer_actions px-3 mb-3 d-flex align-items-center justify-content-between">
          <Link to="/orders/broker/list">
            <i className="i-Left1 text-20 font-weight-700"> </i>
          </Link>
          <div>
            <Button
              className="mr-3 py-2"
              variant="primary"
              onClick={() => this.props.toggleBrokerEditor()}
            >
              Edit Broker
            </Button>
          </div>
        </div>
        <div id="print-area" className="px-3">
          <div>
            <div className="col">
                    <h4 className="fw-bold">DETAILS OF {this.state?.broker?.name?.toUpperCase()}</h4>
            </div>
            <table id="user_table" className="table">
              <thead>
              </thead>
              {isMobile()?<tbody>
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
                  <strong> Mobile No </strong>
                </td>
                <td>
                  {this.state?.broker?.contact_number}
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
                  <strong> Brokerage </strong>
                </td>
                <td>
                  {this.state?.broker?.brokerage}
                </td>
              </tr>
              </tbody>:
              <tbody className="table-responsive">
              <tr>
                <td>
                  <strong>Name </strong>
                </td>
                <td>
                  {this.state?.broker?.name?.toUpperCase()}
                </td>
                <td>
                  <strong> Mobile No. </strong>
                </td>
                <td>
                  {this.state?.broker?.contact_number}
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
                  <strong> Brokerage </strong>
                </td>
                <td>
                  {this.state?.broker?.brokerage}
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

export default withRouter(BrokerViewer);