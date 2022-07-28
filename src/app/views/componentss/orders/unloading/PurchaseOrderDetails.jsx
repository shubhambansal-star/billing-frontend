import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BrokerViewer from "./PurchaseOrderViewer";
import FormsWizard from "./UnloadingWizard"
import UnloadLoading from "./UnloadLoading";

class PurchaseOrderDetails extends Component {
  state = {
    showSalesOrderEditor: false,
    isNewSalesOrder: false
  };

  toggleSalesOrderEditor = () => {
    this.setState({
      showSalesOrderEditor: !this.state.showSalesOrderEditor,
      isNewSalesOrder: false
    });
  };

  componentDidMount() {
    if (this.props.match.params.id === "create")
      this.setState({ showSalesOrderEditor: true, isNewSalesOrder: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id!==this.props.match.params.id)
      if (this.props.match.params.id === "create")
        this.setState({ showSalesOrderEditor: true, isNewSalesOrder: true });
  }

  render() {
    return (
      <div className="invoice-details m-sm-30">
        {this.state.showSalesOrderEditor ? (
          
          <UnloadLoading
            toggleSalesOrderEditor={this.toggleSalesOrderEditor}
            isNewSalesOrder={this.state.isNewSalesOrder}
            {...this.props}
          />
        ) : (
          <Card elevation={6}>
          
            <BrokerViewer toggleSalesOrderEditor={this.toggleSalesOrderEditor} {...this.props}/>
            </Card>
        )}
      </div>
    );
  }
}

export default PurchaseOrderDetails;
