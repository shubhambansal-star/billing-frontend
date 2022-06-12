//eslint-disable//
import React, { Component, Fragment } from "react";
import {
Button,
Form,
FormControl,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { getCompanyByID, addCompany, updateCompany } from "./CompanyService";
import { withRouter } from "react-router-dom";
import {StateGroup} from "../../../views/AllOptions"
class CompanyEditor extends Component {
state = {
  loading: false,
  id: "",
  name:"",
  address: "",
  gstin: "",
  state: "",
  state_code: 9,
  mobile1: "",
  mobile2: "",
  bank_account_no: "",
  bank_branch: "",
  bank_ifsc:"",
  bank_name: "",
};
componentDidMount() {
if (!this.props.isNewCompany){
getCompanyByID(this.props.match.params.id)
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
  console.log("hey its me")
let { id } = this.state;
this.setState({ loading: true });
setSubmitting(true);
if (this.props.isNewCompany){
addCompany( values ).then((res) => {
this.setState({ loading: false });
this.props.history.push(`/company/${res.data.id}`);
this.props.toggleCompanyEditor();
});}else{
updateCompany(id,values).then(() => {
this.setState({ loading: false });
this.props.toggleCompanyEditor();
});}
};
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
    <Fragment>
      <Form onSubmit={handleSubmit} className="px-3">
        <div className="row mb-3 justify-content-between">
          <div className="col-md-3">
            <h4 className="fw-bold">Company</h4>
          </div>
          <div className="col-md-2 text-right">

            <div className="justify-content-end">
              <div className="mb-4">
                <Button type="button" className="me-3 py-2" variant="warning" onClick={()=>
                  this.props.history.push('/company/list')}
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
            Company Name :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.name} name="name" type="text" placeholder="Company Name" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.name && touched.name } tabIndex={1}/>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Company GSTIN :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.gstin} name="gstin" type="text"
                placeholder="Company GSTIN" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.gstin &&
                touched.gstin } tabIndex={2}/>
                </div>
          </div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Company Address :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.address} name="address" type="text"
              placeholder="Company Address" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.address &&
              touched.address } tabIndex={3}/>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Company State :
          </label>
          <div className="col-lg-2">
            <Form.Select name="state" value={values.state_code} onChange={(value)=>{
              setFieldValue("state", value.target.options[value.target.options.selectedIndex].label)
              setFieldValue("state_code", value.target.value)}}
              onBlur={()=> {
                setFieldTouched("state", true)
                setFieldTouched("state_code", true)
            }}
              isInvalid={
              errors.state &&
              touched.state &&
              errors.state_code &&
              touched.state_code }
              tabIndex={4}
              >
              {StateGroup.map((item,index)=>(
              <option value={item.value} key={item.value}>{item.label}</option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="custom-separator"></div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Mobile No :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.mobile1} name="mobile1" type="text" placeholder="Mobile No" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.mobile1 && touched.mobile1 } tabIndex={5}/>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Another Mobile No :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.mobile2} name="mobile2" type="text"
                placeholder="Alternate Mobile No" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.mobile2 &&
                touched.mobile2 } tabIndex={6}/>
                </div>
          </div>
          <div className="custom-separator"></div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Bank Name :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.bank_name} name="bank_name" type="text" placeholder="Bank Name" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.bank_name && touched.bank_name } tabIndex={7}/>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Bank Accont No :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.bank_account_no} name="bank_account_no" type="text"
                placeholder="Bank Account No" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.bank_account_no &&
                touched.bank_account_no } tabIndex={8}/>
                </div>
          </div>
          <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Bank IFSC :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.bank_ifsc} name="bank_ifsc" type="text" placeholder="Bank IFSC" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.bank_ifsc && touched.bank_ifsc } tabIndex={9}/>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Bank Branch :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.bank_branch} name="bank_branch" type="text"
                placeholder="Bank Branch" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.bank_branch &&
                touched.bank_branch } tabIndex={10}/>
                </div>
          </div>
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
gstin: yup.string().required().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Please Enter incorrect format"),
state: yup.string().required(),
state_code: yup.number().required(),
mobile1: yup.string().required().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please Enter in correct format"),
mobile2: yup.string().required().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please Enter in correct format"),
bank_account_no: yup.string().required(),
bank_branch: yup.string().required(),
bank_ifsc: yup.string().required(),
bank_name: yup.string().required(),
});

export default withRouter(CompanyEditor);