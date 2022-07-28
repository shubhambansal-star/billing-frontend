import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PurchaseOrderViewer from "./PurchaseOrderViewer";
import PurchaseOrderEditor from "./PurchaseOrderEditor";

class PurchaseOrderDetails extends Component {
  state = {
    showPurchaseOrderEditor: false,
    isNewPurchaseOrder: false
  };

  togglePurchaseOrderEditor = () => {
    this.setState({
      showPurchaseOrderEditor: !this.state.showPurchaseOrderEditor,
      isNewPurchaseOrder: false
    });
  };

  componentDidMount() {
    if (this.props.match.params.id === "create")
      this.setState({ showPurchaseOrderEditor: true, isNewPurchaseOrder: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id!==this.props.match.params.id)
      if (this.props.match.params.id === "create")
        this.setState({ showPurchaseOrderEditor: true, isNewPurchaseOrder: true });
  }

  render() {
    return (
      <Card elevation={6} className="invoice-details m-sm-30">
        {this.state.showPurchaseOrderEditor ? (
          <PurchaseOrderEditor
            togglePurchaseOrderEditor={this.togglePurchaseOrderEditor}
            isNewPurchaseOrder={this.state.isNewPurchaseOrder}
          />
        ) : (
          <PurchaseOrderViewer togglePurchaseOrderEditor={this.togglePurchaseOrderEditor} />
        )}
      </Card>
    );
  }
}

export default PurchaseOrderDetails;
