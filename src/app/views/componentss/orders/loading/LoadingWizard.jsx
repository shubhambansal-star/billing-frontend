import LoadingEditor from "./LoadingEditor";
import UpdatePurchaseOrder from "./UpdatePurchaseOrder"
import React, { Component } from "react";
import Stepper from 'react-stepper-horizontal';
import {getBrokerByID} from "./PurchaseOrderService"
class FormsWizard extends Component {
  constructor(props) {
      super(props);
      this.state = {
      steps:[
        {title: 'Loading Details'},
        {title: 'Update Purchase Orders'}
      ],
      currentPage: 1,
      details: {
        loading_from: [],
        date: new Date().toISOString().slice(0,10),
        vehicle_number: "",
        genes: "",
        quantity: "",
        freight: "",
        frieght_paid_at_loading: "",
        remarks: "",
      }
  };
  }
  async componentDidMount() {
    console.log(this.props)
    if (!this.props.isNewSalesOrder){
      let res = await getBrokerByID(this.props.match.params.id)
      this.setState({ details:res.data.loading });
      this.setState({details: {partyValue: res.data.loading.loading_from_name,...this.state.details}})
    }
  }
  handleSubmit =(detail)=> {
    this.setState({details: detail})
    this.next();
  }
    next = () => this.setState({currentPage: this.state.currentPage+1} );
    prev = () => this.setState({currentPage: this.state.currentPage-1});
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
              <div className="row mx-3  mt-3 mb-3 justify-content-between">
                    <div className="col-md-3">
                      <h4 className="fw-bold">Loading</h4>
                    </div>
              </div>
              <Stepper
                steps={this.state.steps}
                activeStep={this.state.currentPage-1}
                activeColor="#663399"
                defaultBarColor="#663399"
                completeColor="green"
                completeBarColor="green"
              />
              {this.state.currentPage === 1 && (<LoadingEditor next={this.handleSubmit} prev={this.prev} details={this.state.details} {...this.props}/>)}
              {this.state.currentPage === 2 && (<UpdatePurchaseOrder details={this.state.details} prev={this.prev} {...this.props} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default FormsWizard;