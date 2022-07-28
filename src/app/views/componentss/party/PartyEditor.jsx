//eslint-disable//
import React, { Component, Fragment } from "react";
import {
Button,
Form,
FormControl,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { getPartyByID, addParty, updateParty } from "./PartyService";
import { withRouter } from "react-router-dom";
import {StateGroup} from "../../AllOptions"
class PartyEditor extends Component {
state = {
  party_username:"",
  loading: false,
  id: "",
  name:"",
  address: "",
  gstin: "",
  state: "",
  state_code: "",
  bill_type: "MandiOut",
  bill_info: "bill_to",
  expense:{
    tulai: 0,
    dharmada: 0,
    wages: 0,
    mandi_shulk: 0,
    vikas_shulk: 0,
    others: 0,
    commision: 0,
    loading_charges: 0,
    bardana: 0,
    sutli:0,
  },
  ship_details:{
    name:"",
    address:"",
    gstin:"",
    state:"",
    state_code:""
  }
};
componentDidMount() {
if (!this.props.isNewParty){
getPartyByID(this.props.match.params.id)
.then((res) => {
this.setState({ ...res.data });
}
)
.catch((error) => {
console.log(error)
})
}
else {
this.generateRandomId();
}
}
generateRandomId = () => {
let id = 0;
this.setState({ id });
};

handleSubmit = (values, { setSubmitting }) => {
let { id } = this.state;
this.setState({ loading: true });
setSubmitting(true);
if (this.props.isNewParty){
addParty( values ).then((res) => {
this.setState({ loading: false });
this.props.history.push(`/invoice/party/${res.data.id}`);
this.props.togglePartyEditor();
});}else{
updateParty(id,values).then(() => {
this.setState({ loading: false });
this.props.togglePartyEditor();
});}
};
toggleMandiIn = () =>{
  let bill_s = this.state.bill_type==="MandiIn"?"MandiOut":"MandiIn" 
  this.setState({bill_type: bill_s});
}
render() {
let { loading } = this.state;
return (
<div className="invoice-viewer py-3">
  <Formik initialValues={this.state} validationSchema={companySchema} onSubmit={this.handleSubmit}
    enableReinitialize={true}>
    {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    setFieldTouched,
    }) => {
    return (
      // 7,12,23
    <Fragment>
      <Form onSubmit={handleSubmit} className="px-3">
        <div className="row mb-3 justify-content-between">
          <div className="col-md-3">
            <h4 className="fw-bold">Party</h4>
          </div>
          <div className="col-md-2 text-right">

            <div className="justify-content-end">
              <div className="mb-4">
                <Button type="button" className="me-3 py-2" variant="warning" onClick={()=>
                  this.props.history.push('/invoice/party/list')}
                  
                  >
                  Cancel
                </Button>
                <Button type="submit" className="py-2" variant="primary" disabled={loading}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-separator"></div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-5 col-form-label fw-bold">
            Unique Name :
          </label>
          <div className="col-lg-2">
          <FormControl value={values.party_username} name="party_username" type="text" placeholder="Party Unique Name" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.party_username && touched.party_username } />
              </div>
        </div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Party Name :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.name} name="name" type="text" placeholder="Party Name" onChange={(value)=>{
              if(values.bill_info==="bill_to"){
                setFieldValue("ship_details.name",value.target.value)
                setFieldValue("name",value.target.value)
              }else{
                setFieldValue("name",value.target.value)}}}
              onBlur={handleBlur} isInvalid={errors.name && touched.name } />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Party GSTIN :
          </label>
          <div className="col-lg-2">
              <FormControl 
              value={values.gstin} 
              name="gstin" 
              type="text"
              placeholder="Party GSTIN" 
              onChange={(value)=>{
                if(values.bill_info==="bill_to"){
                  setFieldValue("ship_details.gstin",value.target.value)
                  setFieldValue("gstin",value.target.value)
                }else{
                  setFieldValue("gstin",value.target.value)}}}
              onBlur={handleBlur} 
              isInvalid={ errors.gstin && touched.gstin } 
              
              />
            </div>
          </div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Party Address :
          </label>
          <div className="col-lg-2">
            <FormControl 
            value={values.address} 
            name="address" 
            type="text"
            placeholder="Party Address" 
            onChange={(value)=>{
              if(values.bill_info==="bill_to"){
                setFieldValue("ship_details.address",value.target.value)
                setFieldValue("address",value.target.value)
              }else{
                setFieldValue("address",value.target.value)}}}
            onBlur={handleBlur} 
            isInvalid={ errors.address && touched.address }
           />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Party State :
          </label>
          <div className="col-lg-2">
            <Form.Select name="state_code" value={values.state_code} 
            onChange={(value)=>{
              setFieldValue("state", value.target.options[value.target.options.selectedIndex].label)
              setFieldValue("state_code", value.target.value)
              if(values.bill_info==="bill_to"){
                setFieldValue("ship_details.state",value.target.options[value.target.options.selectedIndex].label)
                setFieldValue("ship_details.state_code",value.target.value)
              }
            }
            }
              onBlur={()=> {
                setFieldTouched("state", true)
                setFieldTouched("state_code", true)
            }}
              isInvalid={
              errors.state &&
              touched.state &&
              errors.state_code &&
              touched.state_code }
              
              >
                <option value={0} key={0}>Please select State</option>
              {StateGroup.map((item,index)=>(
              <option value={item.value} key={item.label}>{item.label}</option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="custom-separator"></div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Bill Type :
          </label>
          <div className="col-lg-2">
            <Form.Select name="bill_info" value={values.bill_info} onChange={(value)=>{
              setFieldValue("bill_info", value.target.value)
              if(value.target.value==="bill_to"){
                setFieldValue("ship_details.name", values.name)
                setFieldValue("ship_details.gstin", values.gstin)
                setFieldValue("ship_details.address", values.address)
                setFieldValue("ship_details.state", values.state)
                setFieldValue("ship_details.state_code", values.state_code)
              }

            }
              }
              onBlur={()=> 
                setFieldTouched("bill_info", true)
            }
              isInvalid={
              errors.bill_info &&
              touched.bill_info }
              
              >
              
              <option value="bill_to" key="bill_to">Bill To</option>
              <option value="bill_to_ship_to" key="bill_to_ship_to">Bill To - Ship To</option>
            </Form.Select>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Expense :
          </label>
          <div className="col-lg-2">
            <Form.Select name="bill_type" value={values.bill_type} onChange={(value)=>
              setFieldValue("bill_type", value.target.value)
              }
              onBlur={()=> 
                setFieldTouched("bill_type", true)
            }
              isInvalid={
              errors.bill_type &&
              touched.bill_type }
              
              >
              
              <option value="MandiIn" key="MandiIn">Yes</option>
              <option value="MandiOut" key="MandiOut">No</option>
            </Form.Select>
          </div>
        </div>
        {values.bill_info==="bill_to_ship_to"?
        <div>
          <div className="custom-separator"></div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Shiping Name :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.ship_details.name} name="ship_details.name" type="text" placeholder="Ship Party Name" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.ship_details && touched.ship_details && errors.ship_details.name && touched.ship_details.name} />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Shiping GSTIN :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.ship_details.gstin} name="ship_details.gstin" type="text" placeholder="Ship Party GSTIN" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.ship_details && touched.ship_details && errors.ship_details.gstin && touched.ship_details.gstin} />
          </div>
          </div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Shipping Address :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.ship_details.address} name="ship_details.address" type="text" placeholder="Ship Party Address" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.ship_details && touched.ship_details && errors.ship_details.address && touched.ship_details.address} />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Shipping State :
          </label>
          <div className="col-lg-2">
              <Form.Select name="state_code" value={values.state_code} 
            onChange={(value)=>{
             
                setFieldValue("ship_details.state",value.target.options[value.target.options.selectedIndex].label)
                setFieldValue("ship_details.state_code",value.target.value)
              }
            }
              onBlur={()=> {
                setFieldTouched("ship_details.state", true)
                setFieldTouched("ship_details.state_code", true)
            }}
              isInvalid={
                errors.ship_details &&
              touched.ship_details &&
              errors.ship_details.state &&
              touched.ship_details.state &&
              errors.ship_details.state_code &&
              touched.ship_details.state_code }
              >
                <option value={0} key={0}>Please select State</option>
              {StateGroup.map((item,index)=>(
              <option value={item.value} key={item.label}>{item.label}</option>
              ))}
            </Form.Select>
                </div>
          </div>
        </div>:<></>}
        {values.bill_type==="MandiIn"?
        <div>
          <div className="custom-separator"></div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Tulai :
          </label>
          <div className="col-lg-2">
            
            <FormControl value={values.expense.tulai} name="expense.tulai" type="number" placeholder="Tulai in %" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.tulai && touched.expense.tulai } />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Dharmada :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.expense.dharmada} name="expense.dharmada" type="number" placeholder="Dharmada in %" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.dharmada && touched.expense.dharmada } />
                </div>
          </div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Wages :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.expense.wages} name="expense.wages" type="number" placeholder="Wages per Qtl" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.wages && touched.expense.wages } />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Sutli :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.expense.sutli} name="expense.sutli" type="number" placeholder="Sutli Per Bag" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.sutli && touched.expense.sutli } />
                </div>
          </div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Mandi Shulk :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.expense.mandi_shulk} name="expense.mandi_shulk" type="number" placeholder="Mandi Shulk in %" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.mandi_shulk && touched.expense.mandi_shulk } />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Vikas Shulk :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.expense.vikas_shulk} name="expense.vikas_shulk" type="number" placeholder="Vikas Shulk in %" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.vikas_shulk && touched.expense.vikas_shulk } />
                </div>
          </div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Commision :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.expense.commision} name="expense.commision" type="number" placeholder="Commision in %" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.commision && touched.expense.commision } />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Loading Charges :
          </label>
          <div className="col-lg-2">
             <FormControl value={values.expense.loading_charges} name="expense.loading_charges" type="number" placeholder="Loading Charges per bag" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.loading_charges && touched.expense.loading_charges } />
                </div>
          </div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Bardana :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.expense.bardana} name="expense.bardana" type="number" placeholder="Bardana per bag" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.bardana && touched.expense.bardana } />
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Others :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.expense.others} name="expense.others" type="number" placeholder="Other charges in total" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.expense && touched.expense && errors.expense.others && touched.expense.others } />
                </div>
          </div>
        </div>:<></>}
      </Form>
    </Fragment>
    );
    }}
  </Formik>
</div>
);
}
}
const companySchema = yup.object().shape({
  name:yup.string().required(),
  address: yup.string().required(),
  gstin: yup.string().optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please Enter incorrect format"),
  state: yup.string().required(),
  state_code: yup.number().required(),
  bill_info: yup.string().required(),
  bill_type: yup.string().required(),
  ship_details:yup.object().shape({
    name:yup.string().required(),
    address: yup.string().required(),
    gstin: yup.string().optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please Enter incorrect format"),
    state: yup.string().required(),
    state_code: yup.number().required(),
  }),
  expense:yup.object().shape({
    tulai:yup.number().optional(),
    dharmada:yup.number().optional(),
    wages:yup.number().optional(),
    mandi_shulk:yup.number().optional(),
    vikas_shulk:yup.number().optional(),
    others:yup.number().optional(),
    commision:yup.number().optional(),
    loading_charges:yup.number().optional(),
    bardana:yup.number().optional(),
    sutli:yup.number().optional()
  })

});

export default withRouter(PartyEditor);