import React, { Component } from "react";
import { Button, Tab, Tabs, Row, Col,Card,Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingList from "./PurchaseOrderList"
import Select from "react-select"
import { getAllOrderParty } from "./PurchaseOrderService";
import { GenesGroup } from "app/views/AllOptions";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
class PurchaseOrderListTab extends Component {
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
    search:"",
    search_s: ""
  };
  search=""
  handleChangeSearch = (e) => {
    this.setState({searchvalue:e})
  }
  handleChangeSearchTerm = (e) => {
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
  
  assembleOptions = (list) => {
    const mandi_purchase = list.filter(order=>{return order.party_type==="mandi-purchase"})
    const purchase = list.filter(order=>{return order.party_type==="purchase"})
    const broker = list.filter(order=>{return order.party_type==="broker"})
    const bilty = list.filter(order=>{return order.party_type==="bilty"})
    const mandi_options = mandi_purchase.map(party=>{
      return{
        label: party.name,
        value: party.id,
        val: party.party_type
      }
    })
    const purchase_options = purchase.map(party=>{
      return{
        label: party.name,
        value: party.id,
        val: party.party_type
      }
    })
    const broker_options = broker.map(party=>{
      return{
        label: party.name,
        value: party.id,
        val: party.party_type
      }
    })
    let lst = bilty.map(party=>{
      return{
        label: party.name,
        value: party.name,
        val: party.party_type
      }
    })
    lst.push({label:"Bill",value:"bill",val:"bilty"})
    return [{label:"Bilty", options: lst},{label:"Mandi", options: mandi_options},{label:"Party", options: purchase_options},{label:"Broker", options: broker_options},{label:"Genes", options: GenesGroup}]
  }
  async componentDidMount(){
    const res = await getAllOrderParty()
    this.setState({options: this.assembleOptions(res.data)})
  }
  render() {
    return (
      <Row>
            <Col>
            <Card elevation={6} className="invoice-details">
                <div className="row mt-4 ms-3 me-3 mb-2 justify-content-between">
                  <div className="col-md-2 mb-4">
                    <h4 className="fw-bold">Loading List</h4>
                  </div>
                  <div className="col-md-2 mb-2">
                    <Select
                    isMulti
                    isClearable={false}
                      options={this.state.options}
                      onChange={this.handleChangeSearch}
                      onKeyPress={this.handleKeyPress}
                      value={this.state.searchvalue}
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <input
                      className="form-control"
                      id="search"
                      name="search"
                      placeholder="Search Here.."
                      type="text"
                      onChange={this.handleChangeSearchTerm}
                      onBlur={this.handleBlur}
                      onKeyPress={this.handleKeyPress}
                      value={this.search}
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
                        <Link to="/orders/loading/create">
                          <Button className="mb-3" variant="primary">
                            Add Loading
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>  
                <LoadingList filter={this.state.searchvalue} search_term={this.state.search_s} start_date={this.state.date_s} end_date={this.state.date_e} {...this.props}/>
                </div> 
                </Card>
            </Col>
            </Row>
    )}};


export default PurchaseOrderListTab;