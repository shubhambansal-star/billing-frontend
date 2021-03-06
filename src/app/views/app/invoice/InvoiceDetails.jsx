import React, { Component } from "react";
import { Card } from "react-bootstrap";
import InvoiceViewer from "./InvoiceViewer";
import InvoiceEditor from "./InvoiceEditor";

class InvoiceDetails extends Component {
  state = {
    showInvoiceEditor: false,
    isNewInvoice: false
  };

  toggleInvoiceEditor = () => {
    this.setState({
      showInvoiceEditor: !this.state.showInvoiceEditor,
      isNewInvoice: false
    });
  };

  componentDidMount() {
    if (this.props.match.params.id === "create")
      this.setState({ showInvoiceEditor: true, isNewInvoice: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id!==this.props.match.params.id)
      if (this.props.match.params.id === "create")
        this.setState({ showInvoiceEditor: true, isNewInvoice: true });
  }
  render() {
    return (
      <Card elevation={6} className="invoice-details m-sm-30">
        {this.state.showInvoiceEditor ? (
          <InvoiceEditor
            toggleInvoiceEditor={this.toggleInvoiceEditor}
            isNewInvoice={this.state.isNewInvoice}
          />
        ) : (
          <InvoiceViewer toggleInvoiceEditor={this.toggleInvoiceEditor} />
        )}
      </Card>
    );
  }
}

export default InvoiceDetails;
