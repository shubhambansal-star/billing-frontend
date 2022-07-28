//eslint-disable//
import React, { Component, Fragment } from "react";
import {
Button,
Form,
FormControl,
InputGroup
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import CreatableSelect from 'react-select/creatable';
import { getPurchaseOrderByID, addPurchaseOrder, updatePurchaseOrder,createParty, getAllOrderParty } from "./PurchaseOrderService";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import {GenesGroup} from "../../../AllOptions"

class SalesOrderEditor extends Component {
state = {
  isLoadingParty: false,
  PartyOptions:[],
  PartyValue: null,
  isLoadingBroker: false,
  brokerOptions:[],
  brokerValue: null,
  loading: false,
  date : new Date(),
  details: {
    purchase_type: "purchase",
    party: "",
    broker:"",
    date: new Date().toISOString().slice(0, 10),
    genes: "",
    quantity: "",
    unit:"bags",
    rate: "",
    condition: "",
    po_number: "",
    remarks: "",
  },
  id: "",
};
componentDidMount() {
  this.setState({isLoadingBroker: true, isLoadingParty: true})
if (!this.props.isNewPurchaseOrder){
getPurchaseOrderByID(this.props.match.params.id)
.then((res) => {
this.setState({ details:res.data });
this.setState({PartyValue:res.data.party===null?null:{label:res.data.party_name,value:res.data.party}})
this.setState({brokerValue:res.data.broker===null?null:{label:res.data.broker_name,value:res.data.broker}})

}
)
.catch((error) => {
console.log(error)
})
}
else {
  this.setState({ id: 0 });
}
getAllOrderParty("purchase").then((res)=>{
  this.setState({isLoadingParty: false})
  this.setState({PartyOptions: this.assembleOption(res.data)})
})
getAllOrderParty("broker").then((res)=>{
  this.setState({isLoadingBroker: false})
  this.setState({brokerOptions: this.assembleOption(res.data)})
})
}
assembleOption = (list) =>{
let companies = list.map(company => {
return {
label: company.name,
value: company.id,
}
})
return companies
}

componentDidUpdate(prevProps, prevState){
  if(prevState.details.purchase_type!==this.state.details.purchase_type){
    this.setState({isLoadingParty: true})
    getAllOrderParty(this.state.details.purchase_type).then((res)=>{
      this.setState({isLoadingParty: false})
      this.setState({PartyOptions: this.assembleOption(res.data)})
    })
  }

}

handleSubmit = (values, { setSubmitting }) => {
this.setState({ loading: true });
setSubmitting(true);
if (this.props.isNewPurchaseOrder){
addPurchaseOrder( values ).then((res) => {
this.setState({ loading: false });
this.props.history.push(`/orders/purchase/${res.data.id}`);
this.props.togglePurchaseOrderEditor();
});}else{
updatePurchaseOrder(this.props.match.params.id,values).then(() => {
this.setState({ loading: false });
this.props.togglePurchaseOrderEditor();
});}
};

handleCreate = (inputValue) => {
    this.setState({ isLoadingParty: true });
    createParty({name:inputValue, party_type: this.state.details.purchase_type}).then((res)=>{
      const { PartyOptions } = this.state;
      const newOption = {label: res.data.name, value: res.data.id}
      this.setState({
        details:{
          ...this.state.details, party: res.data.id
        },
        isLoadingParty: false,
        PartyOptions: [...PartyOptions, newOption],
        PartyValue: newOption,
      });
    })
  };

handleCreateBroker = (inputValue) => {
  this.setState({ isLoadingBroker: true });
    createParty({name:inputValue, party_type: "broker"}).then((res)=>{
      const { brokerOptions } = this.state;
      const newOption = {label: res.data.name, value: res.data.id}
      this.setState({
        details:{
          ...this.state.details, broker: res.data.id
        },
        isLoadingBroker: false,
        brokerOptions: [...brokerOptions, newOption],
        brokerValue: newOption,
      });
    })
}

render() {
  const { isLoadingParty, loading, PartyOptions,PartyValue, isLoadingBroker, brokerValue, brokerOptions, date    } = this.state;
return (
<div className="invoice-viewer py-3">
  <Formik initialValues={this.state.details} validationSchema={purchaseOrderSchema} onSubmit={this.handleSubmit}
    enableReinitialize={true}>
    {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched

    }) => {
    return (
    <Fragment>
      <Form onSubmit={handleSubmit} className="px-4">
        <div className="row mb-3 justify-content-between">
          <div className="col-md-3">
            <h4 className="fw-bold">Purchase Order</h4>
          </div>
          <div className="col-md-2 text-right">

            <div className="justify-content-end">
              <div className="mb-4">
                <Button type="button" className="me-3 py-2" variant="warning" onClick={()=>
                  this.props.history.push('/orders/purchase/list')}
                  tabIndex={12}
                  >
                  Cancel
                </Button>
                <Button type="submit" className="py-2" variant="primary" disabled={loading} tabIndex={11}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-separator"></div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Purchase Type : 
          </label>
          <div className="col-lg-2">
            <Form.Select 
              tabIndex={1}
              name="purchase_type" 
              value={values.purchase_type} 
              onChange={(value)=>{this.setState({details: {...this.state.details, purchase_type: value.target.value}});setFieldValue("purchase_type", value.target.value)}}
              onBlur={()=> setFieldTouched("purchase_type", true)}
              isInvalid={
              errors.purchase_type &&
              touched.purchase_type }
            >
              <option value="mandi-purchase" key="mandi-purchase">Mandi Purchase</option>
              <option value="purchase" key="purchase">Purchase</option>
            </Form.Select>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Date :
          </label>
          <div className="col-lg-2">
              <DatePicker 
              tabIndex={2}
              className="form-control" 
              dateFormat="dd-MM-yyyy" 
              selected={new Date(date)} 
              onChange={(date)=> 
                {
                    if(date!==null){
                  setFieldValue("date",date.toISOString().slice(0, 10))
                  this.setState({date: date})
                  }
                }
              }
              onBlur={()=> setFieldTouched("date", true)}
              isInvalid={
              errors.date &&
              touched.date }
              />
                </div>
          </div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            {values.purchase_type==="mandi-purchase"? <span>Mandi Name :</span>:<span>Party's Name :</span>}
          </label>
          <div className="col-lg-2">
            <CreatableSelect
            isClearable
            isDisabled={isLoadingParty}
            isLoading={isLoadingParty}
            onChange={(newValue)=>{
              this.setState({ PartyValue: newValue });
              setFieldValue("party",newValue? newValue.value: null)
            }}
            onCreateOption={this.handleCreate}
            options={PartyOptions}
            value={PartyValue}
            tabIndex={3}
            onBlur={()=> setFieldTouched("party", true)}
              isInvalid={
              errors.party &&
              touched.party }
            />
            
          </div>
          {values.purchase_type === "mandi-purchase"?
          <>
          </>:
          <>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Broker's Name :
          </label>
          <div className="col-lg-2">
            <CreatableSelect
            isClearable
            isDisabled={isLoadingBroker}
            isLoading={isLoadingBroker}
            onChange={(newValue)=>{
              this.setState({ brokerValue: newValue });
              setFieldValue("broker",newValue? newValue.value: null)
            }}
            onCreateOption={this.handleCreateBroker}
            options={brokerOptions}
            value={brokerValue}
            tabIndex={4}
            onBlur={()=> setFieldTouched("broker", true)}
              isInvalid={
              errors.broker &&
              touched.broker }
            />
          </div>
          </>}
        </div>
        <div className="custom-separator"></div>
        <div className="form-group row">
          
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Genes :
          </label>
          <div className="col-lg-2">
            <Form.Select
              name="genes" 
              value={values.genes}
              onChange={(value)=> {setFieldValue('genes',
              value.target.value)}}
              onBlur={()=> setFieldTouched('genes', true)}
              tabIndex={5}
              isInvalid={
                errors.genes&& touched.genes
              }
            >
              <option value="0" key="">Select ...</option>
            {GenesGroup.map((item,index)=>(
                          <option value={item.value} key={item.value}>{item.label}</option>
                          ))}
                          </Form.Select>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Quantity :
          </label>
          <div className="col-lg-2">
          <InputGroup>
            <FormControl value={values.quantity} name="quantity" type="text" inputMode= 'numeric'
              placeholder="QTY" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.quantity &&
              touched.quantity } tabIndex={6}/>
              <Form.Select
              name="unit" 
              value={values.unit}
              onChange={(value)=> {setFieldValue('unit',
              value.target.value)}}
              onBlur={()=> setFieldTouched('unit', true)}
              isInvalid={ errors.unit &&
              touched.unit }
              tabIndex={7}
              >
                <option value={"bags"} key={"bags"}>Bags</option>
                <option value={"qtl"} key={"qtl"}>Qtl</option>
                <option value={"truck"} key={"truck"}>Truck</option>
                <option value={"ton"} key={"ton"}>Ton</option>
              </Form.Select>
            </InputGroup>
            </div>
        </div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Rate :
          </label>
          <div className="col-lg-2">
          <InputGroup>
            <FormControl value={values.rate} name="rate" type="text" inputMode= 'numeric' tabIndex={8}
              placeholder="Rate" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.rate &&
              touched.rate }/>
            </InputGroup>
            </div>
            {values.purchase_type==="mandi-purchase"?
            <>
            <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Remarks :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.remarks} name="remarks" type="text"
              placeholder="Remarks" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.remarks &&
              touched.remarks }/>
          </div>

            </>:<>
            <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Condition :
          </label>
          <div className="col-lg-2">
          <InputGroup>
            <Form.Select 
            tabIndex={9}
              name="condition" 
              value={values.condition} onChange={(value)=>
              setFieldValue("condition", value.target.value)
              }
              onBlur={()=> {
                setFieldTouched("condition", true)
              }}
              isInvalid={
              errors.condition &&
              touched.condition }
            >
              <option value="" key="">Select Condition...</option>
              <option value="9R + 100=300" key="9R + 100=300">9R + 100=300</option>  
              <option value="9R + 101=300" key="9R + 101=300">9R + 101=300</option>  
              <option value="9R + weight slip" key="9R + weight slip">9R + weight slip</option>  
              <option value="Bill + 100=300" key="Bill + 100=300">Bill + 100=300</option>  
              <option value="Bill + 101=300" key="Bill + 101=300">Bill + 101=300</option>  
              <option value="Bill + weight slip" key="Bill + weight slip">Bill + weight slip</option>  
              <option value="2nd + 100=300" key="2nd + 100=300">2nd + 100=300</option>  
              <option value="2nd + 101=300 " key="2nd + 101=300 ">2nd + 101=300 </option>  
              <option value="2nd + Weight slip" key="2nd + Weight slip">2nd + Weight slip</option>  
            </Form.Select>
            </InputGroup>
            </div>
            </>}
        </div>
        <div className="custom-separator"></div>
        {values.purchase_type === "mandi-purchase"?
          <></>:
          <>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Remarks :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.remarks} name="remarks" type="text"
              placeholder="Remarks" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.remarks &&
              touched.remarks }/>
          </div>

          </div>

          </>}
      </Form>
    </Fragment>
    );
    }}
  </Formik>
</div>
);
}
}
const purchaseOrderSchema = yup.object().shape({
  purchase_type : yup.string().required(),
  date: yup.string().required(),
  genes: yup.string().required(),
  quantity: yup.number().required(),
  unit: yup.string().required(),
  rate: yup.number().optional(),
  condition: yup.string().optional(),
  remarks: yup.string().optional(),
  party: yup.string().nullable().when("broker",{is: (broker)=>!broker||broker.length===0,then: yup.string().required('At least select party or broker is required')}),
  broker: yup.string().nullable().when("party",{is: (party)=>!party||party.length===0,then: yup.string().required('At least party or broker is required')})
},['party','broker']);

export default withRouter(SalesOrderEditor);