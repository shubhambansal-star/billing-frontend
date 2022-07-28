//eslint-disable//
import React, { Component, Fragment } from "react";
import {
Button,
Form,
FormControl,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { getBrokerByID, addBroker, updateBroker } from "./BrokerService";
import { withRouter } from "react-router-dom";
class BrokerEditor extends Component {
state = {
  loading: false,
  party_type:"broker",
  id: "",
  name:"",
  email:"",
  contact_number: "",
  brokerage: 0,
};
componentDidMount() {
if (!this.props.isNewBroker){
getBrokerByID(this.props.match.params.id)
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
if (this.props.isNewBroker){
addBroker( values ).then((res) => {
this.setState({ loading: false });
this.props.history.push(`/orders/broker/${res.data.id}`);
this.props.toggleBrokerEditor();
});}else{
updateBroker(id,values).then(() => {
this.setState({ loading: false });
this.props.toggleBrokerEditor();
});}
};
render() {
let { loading } = this.state;
return (
<div className="invoice-viewer py-3">
  <Formik initialValues={this.state} validationSchema={brokerSchema} onSubmit={this.handleSubmit}
    enableReinitialize={true}>
    {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    }) => {
    return (
    <Fragment>
      <Form onSubmit={handleSubmit} className="px-3">
        <div className="row mb-3 justify-content-between">
          <div className="col-md-3">
            <h4 className="fw-bold">Broker</h4>
          </div>
          <div className="col-md-2 text-right">
          
            <div className="justify-content-end">
              <div className="mb-4">
                <Button type="button" className="me-3 py-2" variant="warning" onClick={()=>
                  this.props.history.push('/orders/broker/list')}
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
            Broker's Name :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.name} name="name" type="text" placeholder="Broker's Name" onChange={handleChange}
              onBlur={handleBlur} isInvalid={errors.name && touched.name } tabIndex={1}/>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Broker's Contact Number :
          </label>
          <div className="col-lg-2">
              <FormControl value={values.contact_number} name="contact_number" type="text"
                placeholder="Mobile No" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.contact_number &&
                touched.contact_number } tabIndex={2}/>
                </div>
          </div>
        <div className="form-group row">
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Broker's Email :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.email} name="email" type="email"
              placeholder="Broker's Email" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.email &&
              touched.email } tabIndex={3}/>
          </div>
          <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
            Broker's Brokerage :
          </label>
          <div className="col-lg-2">
            <FormControl value={values.brokerage} name="brokerage" type="number"
              placeholder="Broker's Brokerage" onChange={handleChange} onBlur={handleBlur} isInvalid={ errors.brokerage &&
              touched.brokerage } tabIndex={3}/>
            
          </div>
        </div>
        <div className="custom-separator"></div>
      </Form>
    </Fragment>
    );
    }}
  </Formik>
</div>
);
}
}
const brokerSchema = yup.object().shape({
name:yup.string().required(),
contact_number: yup.string().optional().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please Enter in correct format").nullable(),
email: yup.string().optional().email().nullable(),
brokerage: yup.number().optional().nullable()
});

export default withRouter(BrokerEditor);