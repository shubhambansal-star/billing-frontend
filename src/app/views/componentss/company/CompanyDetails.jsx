import React, { Component } from "react";
import { Card } from "react-bootstrap";
import CompanyViewer from "./CompanyViewer";
import CompanyEditor from "./CompanyEditor";

class CompanyDetails extends Component {
  state = {
    showCompanyEditor: false,
    isNewCompany: false
  };

  toggleCompanyEditor = () => {
    this.setState({
      showCompanyEditor: !this.state.showCompanyEditor,
      isNewCompany: false
    });
  };

  componentDidMount() {
    if (this.props.match.params.id === "create")
      this.setState({ showCompanyEditor: true, isNewCompany: true });
  }

  render() {
    return (
      <Card elevation={6} className="invoice-details m-sm-30">
        {this.state.showCompanyEditor ? (
          <CompanyEditor
            toggleCompanyEditor={this.toggleCompanyEditor}
            isNewCompany={this.state.isNewCompany}
          />
        ) : (
          <CompanyViewer toggleCompanyEditor={this.toggleCompanyEditor} />
        )}
      </Card>
    );
  }
}

export default CompanyDetails;
