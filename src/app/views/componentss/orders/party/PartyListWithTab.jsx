import React, { Component } from "react";
import { Button, Tab, Tabs, Row, Col,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import InvoiceList from "./PartyList"

class InvoiceListTab extends Component {
  state = {
    search: "",
    search_s: ""
  };
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
    let { partyList } = this.state;
    return (
      <Row>
            <Col>
            <Card elevation={6} className="invoice-details">
                <div className="row mt-4 ms-3 me-3 mb-2 justify-content-between">
                  <div className="col-md-2">
                    <h4 className="fw-bold">Party List</h4>
                  </div>
                  <div className="col-md-3 mb-2">
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
                  <div className="col-md-2 mb-2">
                    <div className="justify-content-end">
                      <div className="mb-4">
                        <Link to="/orders/party/create">
                          <Button className="mb-3" variant="primary">
                            Add Party
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Tabs style={{overflowX:"auto",overflowY:"hidden",flexWrap:"nowrap", display:"-webkit-box", display:"-moz-box"}} defaultActiveKey={"MANDI PURCHASE"} id="uncontrolled-tab-example" unmountOnExit={true} mountOnEnter={true}>
                      <Tab eventKey={"MANDI PURCHASE"} title={"MANDI PURCHASE"} key={0} className="capitalize">
                        <InvoiceList partyType={"mandi-purchase"} search={this.state.search_s} {...this.props}/>
                      </Tab>
                      <Tab eventKey={"PURCHASE"} title={"PURCHASE"} key={1} className="capitalize">
                        <InvoiceList partyType={"purchase"} search={this.state.search_s} {...this.props}/>
                      </Tab>
                      <Tab eventKey={"MANDI SALES"} title={"MANDI SALES"} key={"bw"} className="capitalize">
                        <InvoiceList partyType={"mandi-sales"} search={this.state.search_s} {...this.props}/>
                      </Tab>
                      <Tab eventKey={"SALES"} title={"SALES"} key={"canceled"} className="capitalize">
                        <InvoiceList partyType={"sales"} search={this.state.search_s} {...this.props}/>
                      </Tab>
                  </Tabs>
                </div> 
                </Card>
            </Col>
            </Row>
    )}};


export default InvoiceListTab;