import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PartyViewer from "./PartyViewer";
import PartyEditor from "./PartyEditor";

class PartyDetails extends Component {
  state = {
    showPartyEditor: false,
    isNewParty: false
  };

  togglePartyEditor = () => {
    this.setState({
      showPartyEditor: !this.state.showPartyEditor,
      isNewParty: false
    });
  };

  componentDidMount() {
    if (this.props.match.params.id === "create")
      this.setState({ showPartyEditor: true, isNewParty: true });
  }

  render() {
    return (
      <Card elevation={6} className="invoice-details m-sm-30">
        {this.state.showPartyEditor ? (
          <PartyEditor
            togglePartyEditor={this.togglePartyEditor}
            isNewParty={this.state.isNewParty}
          />
        ) : (
          <PartyViewer togglePartyEditor={this.togglePartyEditor} />
        )}
      </Card>
    );
  }
}

export default PartyDetails;
