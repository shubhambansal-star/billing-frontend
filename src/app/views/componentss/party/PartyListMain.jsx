import React, { Component } from "react";
import { Button, Tab, Tabs, Row, Col,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PartyList from "./PartyList"

class PartyListTab extends Component {
  state = {
    invoiceList: [],
    partyList: [],
    search: "",
    search_s: ""
  };
  search=""
  handleSelectYear = (e) =>{
    this.setState({year:e.target.value})
    this.year=e.target.value
  }
  handleChangeSearch = (e) => {
    this.setState({search:e.target.value})
    this.search=e.target.value
  }
  handleBlur = (e) =>{
    this.setState({search_s:this.search})
  }
  handleKeyPress =(event)=>{
    if(event.key === 'Enter'){
      this.setState({search_s:this.search})
    }
  }
  render() {
    let { invoiceList, partyList } = this.state;
    return (
      <Row>
            <Col>
            <Card elevation={6} className="invoice-details">
                <div className="row mt-4 ms-3 me-3 mb-2 justify-content-between">
                  <div className="col-md-2">
                    <h4 className="fw-bold">Party List</h4>
                  </div>
                  <div className="col-md-3">
                    <input
                      className="form-control"
                      id="search"
                      name="search"
                      placeholder="Search Here.."
                      type="text"
                      onChange={this.handleChangeSearch}
                      onBlur={this.handleBlur}
                      onKeyPress={this.handleKeyPress}
                      value={this.search}
                    />
                  </div>
                  <div className="col-md-2">
                    <div className="justify-content-end">
                      <div className="mb-4">
                        <Link to="/party/create">
                          <Button className="mb-3" variant="primary">
                            Add Party
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                <PartyList search={this.state.search_s} {...this.props}/>    
                </div> 
                </Card>
            </Col>
            </Row>
    )}};


export default PartyListTab;