import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PartyViewer from "./PartyViewer";
import PartyEditor from "./PartyEditor";

class PartyDetails extends Component {
  state = {
    showBrokerEditor: false,
    isNewBroker: false
  };

  toggleBrokerEditor = () => {
    this.setState({
      showBrokerEditor: !this.state.showBrokerEditor,
      isNewBroker: false
    });
  };

  componentDidMount() {
    if (this.props.match.params.id === "create")
      this.setState({ showBrokerEditor: true, isNewBroker: true });
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id!==this.props.match.params.id)
      if (this.props.match.params.id === "create")
        this.setState({ showBrokerEditor: true, isNewBroker: true });
  }

  render() {
    return (
      <Card elevation={6} className="invoice-details m-sm-30">
        {this.state.showBrokerEditor ? (
          <PartyEditor
            toggleBrokerEditor={this.toggleBrokerEditor}
            isNewBroker={this.state.isNewBroker}
          />
        ) : (
          <PartyViewer toggleBrokerEditor={this.toggleBrokerEditor} />
        )}
      </Card>
    );
  }
}

export default PartyDetails;
