import React, { Component } from "react";
import { Button, Tab, Tabs, Row, Col,Card,Nav, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import SalesOrderList from "./SalesOrderList"
import SalesInsideTab from "./SalesInsideTab"
import Select from "react-select"
import { getAllParty } from "./SalesOrderService";
import { GenesGroup } from "app/views/AllOptions";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { isMobile } from "@utils";
class PurchaseOrderListTab extends Component {
  constructor(props){
    super(props)
    
  }
  state = {
    taboptions:[
      {label: "All", value:""},
      {label:"Pending", value:"pending__gt=0"},
      {label:"Completed",value:"pending=0"}
    ],
    invoiceList: [],
    partyList: [],
    searchvalue: null,
    options:[],
    search_s: ""
  };
  handleChangeSearch = (e) => {
    this.setState({search_s:e?e.value:""})
    this.setState({searchvalue:e})
  }

  assembleOptions = (list) => {
    const mandi_purchase = list.filter(order=>{return order.party_type==="mandi-sales"})
    const purchase = list.filter(order=>{return order.party_type==="sales"})
    const broker = list.filter(order=>{return order.party_type==="broker"})
    const mandi_options = mandi_purchase.map(party=>{
      return{
        label: party.name,
        value: party.name,
      }
    })
    const purchase_options = purchase.map(party=>{
      return{
        label: party.name,
        value: party.name,
      }
    })
    const broker_options = broker.map(party=>{
      return{
        label: party.name,
        value: party.name,
      }
    })
    return [{label:"Mandi", options: mandi_options},{label:"Party", options: purchase_options},{label:"Broker", options: broker_options},{label:"Genes", options: GenesGroup}]
  }
  async componentDidMount(){
    const res = await getAllParty()
    this.setState({options: this.assembleOptions(res.data)})
  }
  render() {
    return (
      <Row>
            <Col>
            <Card elevation={6} className="invoice-details">
                <div className="row mt-4 ms-3 me-3 mb-2 justify-content-between">
                  <div className="col-md-2 mb-4">
                    <h4 className="fw-bold">Sales Order List</h4>
                  </div>
                  <div className="col-md-3 mb-2">
                    <Select
                    isClearable
                      options={this.state.options}
                      onChange={this.handleChangeSearch}
                      onKeyPress={this.handleKeyPress}
                      value={this.state.searchvalue}
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <DatePicker 
                    isClearable
                    placeholderText="Start Date.."
                    className="form-control" 
                    dateFormat="dd-MMMM-yyyy" 
                    selected={this.state.date_s? new Date(this.state.date_s): null} 
                    onChange={(date) => {
                      const ds = this.state.date_s? date: addDays(date,1)
                      this.setState({date_s: ds?.toISOString().slice(0, 10)})
                    }}
                  />
                  </div>
                  <div className="col-md-2 mb-2">
                    <DatePicker 
                    isClearable
                    placeholderText="End Date.."
                    className="form-control" 
                    dateFormat="dd-MMMM-yyyy" 
                    selected={this.state.date_e? new Date(this.state.date_e): null} 
                    onChange={(date) => {
                      const ds = this.state.date_e? date: addDays(date,1)
                      this.setState({date_e: ds?.toISOString().slice(0, 10)})
                    }}
                  />
                  </div>
                  <div className="col-md-2 mb-2">
                    <div className="justify-content-end">
                      <div className="mb-4">
                        <Link to="/orders/sales/create">
                          <Button className="mb-3" variant="primary">
                            Add Sales Order
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {
                    isMobile()?
                    <>
                      <Tab.Container id="left-tabs-example" defaultActiveKey="purchase">
                  <Nav variant="pills" className="d-flex  px-2">
                    <Nav.Item className="flex-grow-1 text-center">
                      <Nav.Link eventKey="purchase">Purchases</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="flex-grow-1 text-center">
                      <Nav.Link eventKey="mandi-purchase">Mandi Purchases</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    
                    <Tab.Pane eventKey="purchase">
                     <SalesInsideTab salesType={"sales"} search={this.state.search_s} start_date={this.state.date_s} end_date={this.state.date_e} {...this.props}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="mandi-purchase">
                      <SalesInsideTab salesType={"mandi-sales"} search={this.state.search_s} start_date={this.state.date_s} end_date={this.state.date_e} {...this.props}/>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
                    </>:
                  
                  <>
                  
                  <Tabs defaultActiveKey={"all"} id="uncontrolled-tab-example" unmountOnExit={true} mountOnEnter={true}>
                    <Tab eventKey={"all"} title={"All Sales"} key={"all"} className="capitalize">
                      <SalesInsideTab salesType={""} search={this.state.search_s} start_date={this.state.date_s} end_date={this.state.date_e} {...this.props}/>
                    </Tab>
                    <Tab eventKey={"sales"} title={"Sales"} key={"sales"} className="capitalize">
                      <SalesInsideTab salesType={"sales"} search={this.state.search_s} start_date={this.state.date_s} end_date={this.state.date_e} {...this.props}/>
                    </Tab>
                    <Tab eventKey={"mandi-purchase"} title={"Mandi Sales"} key={"mandi-sales"} className="capitalize">
                      <SalesInsideTab salesType={"mandi-sales"} search={this.state.search_s} start_date={this.state.date_s} end_date={this.state.date_e} {...this.props}/>
                    </Tab>
                  </Tabs> 
                  </>}
                </div> 
                </Card>
            </Col>
            </Row>
    )}};


export default PurchaseOrderListTab;