import React, { Component } from "react";
import { Card } from "react-bootstrap";
import BrokerViewer from "./SalesOrderViewer";
import BrokerEditor from "./SalesOrderEditor";

class SalesOrderDetails extends Component {
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
      <Card elevation={6} className="invoice-details m-sm-30">
        {this.state.showSalesOrderEditor ? (
          <BrokerEditor
            toggleSalesOrderEditor={this.toggleSalesOrderEditor}
            isNewSalesOrder={this.state.isNewSalesOrder}
          />
        ) : (
          <BrokerViewer toggleSalesOrderEditor={this.toggleSalesOrderEditor} />
        )}
      </Card>
    );
  }
}

export default SalesOrderDetails;
