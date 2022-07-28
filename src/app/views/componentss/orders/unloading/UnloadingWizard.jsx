import LoadingEditor from "./UnloadingEditor";
import UpdatePurchaseOrder from "./UpdateSalesOrder"
import React, { Component } from "react";
import Stepper from 'react-stepper-horizontal';
import {getBrokerByID} from "./PurchaseOrderService"
class FormsWizard extends Component {
  constructor(props) {
      super(props);
      this.state = {
      steps:[
        {title: 'Unloading Details'},
        {title: 'Update Sales Orders'}
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
        unloaded_to: [],
        unloading_date: "",
        unloaded_quantity: "",
        unloading_remarks: "",
        frieght_at_unloading: "",
      }
  };
  }
  async componentDidMount() {
      let res = await getBrokerByID(this.props.item?this.props.item.id: this.props.match.params.id)
      this.setState({ details:this.ass(res.data.loading) });
      this.setState({details: {partyValue: res.data.loading.loading_from_name,unloadingPartyValue: res.data.loading.unloading_from_name,...this.state.details}})
  }
  handleSubmit =(detail)=> {
    this.setState({details: detail})
    this.next();
  }
  ass(val){
      return {
        ...val,
        unloaded_to: val.unloaded_to===null?"":val.unloaded_to,
        unloading_date: val.unloading_date===null?new Date().toISOString().slice(0,10): val.unloading_date,
        unloaded_quantity: val.unloaded_quantity===null?"":val.unloaded_quantity,
        unloading_remarks: val.unloading_remarks===null?"":val.unloading_remarks,
        frieght_at_unloading: val.frieght_at_unloading===null?"":val.frieght_at_unloading,
      }
  }
    next = () => this.setState({currentPage: this.state.currentPage+1} );
    prev = () => this.setState({currentPage: this.state.currentPage-1});
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
              <Stepper
                steps={this.state.steps}
                activeStep={this.state.currentPage-1}
                activeColor="#663399"
                defaultBarColor="#663399"
                completeColor="green"
                completeBarColor="green"
              />
              {this.state.currentPage === 1 && (<LoadingEditor cancel = {this.props.cancel} next={this.handleSubmit} prev={this.prev} details={this.state.details} {...this.props}/>)}
              {this.state.currentPage === 2 && (<UpdatePurchaseOrder cancel = {this.props.cancel} details={this.state.details} prev={this.prev} {...this.props} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default FormsWizard;