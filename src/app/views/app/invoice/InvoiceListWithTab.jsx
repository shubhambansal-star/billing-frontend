import React, { Component } from "react";
import { Button, Tab, Tabs, Row, Col,Card } from "react-bootstrap";
import { getAllCompany } from "./InvoiceService";
import { Link } from "react-router-dom";
import InvoiceList from "./InvoiceList"

class InvoiceListTab extends Component {
  state = {
    invoiceList: [],
    partyList: [],
    year: "/2022-2023/",
    search: "",
    search_s: ""
  };
  year="/2022-2023/"
  search=""
  async componentDidMount() {
      getAllCompany().then(res => this.setState({partyList: res.data}));
  }
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
                    <h4 className="fw-bold">Invoice List</h4>
                  </div>
                  <div className="col-md-2">
                    <select
                      id="picker1"
                      className="form-control"
                      name="select"
                      value={this.year}
                      onChange={this.handleSelectYear}
                    >
                      <option value="/2021-2022/">2021-2022</option>
                      <option value="/2022-2023/">2022-2023</option>
                    </select>
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
                        <Link to="/invoice/create">
                          <Button className="mb-3" variant="primary">
                            Add Invoice
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Tabs defaultActiveKey={partyList.at(0)} id="uncontrolled-tab-example" unmountOnExit={true} mountOnEnter={true}>
                      {partyList.map((item,index)=>(
                          <Tab eventKey={item.id} title={item.name.toUpperCase()} key={item.id} className="capitalize">
                        <InvoiceList companyId={item.id} year={this.state.year} search={this.state.search_s} {...this.props}/>
                    </Tab>
                      ))}
                  </Tabs>
                </div> 
                </Card>
            </Col>
            </Row>
    )}};


export default InvoiceListTab;