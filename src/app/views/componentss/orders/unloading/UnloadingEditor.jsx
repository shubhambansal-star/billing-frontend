//eslint-disable//
import React, { Component, Fragment } from "react";
import {
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import Select from 'react-select';
import {  getAllOrderParty } from "./PurchaseOrderService";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import {  classList } from "@utils"

class LoadingEditor extends Component {
  state = {
    isLoadingParty: false,
    PartyOptions: [],
    PartyValue: null,
    quantityInvalid: false,
    loading: false,
    date: this.props.details.unloading_date?this.props.details.unloading_date: new Date() ,
    pendingPurchaseOrder: [],
    details: this.props.details,
  };
  async componentDidMount() {
    this.setState({ isLoadingBroker: true, isLoadingParty: true })
    const res = await getAllOrderParty() 
    this.setState({isLoadingParty: false})
    this.setState({ PartyOptions: this.assembleOption(res.data) })
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.details.unloading_date!==this.props.details.unloading_date){
      this.setState({date: this.props.details.unloading_date?this.props.details.unloading_date: new Date()})
    }
  }
  getArray(val){
    let arr = val.map((value)=>{
      return value.value
    })
    return arr
  }
  assembleOption = (list) => {
    let broker = list.filter(party => { return party.party_type === "broker" })
    let partys = list.filter(party => { return party.party_type === "sales" })
    let mandi = list.filter(party => { return party.party_type === "mandi-sales" })
    let broker_options = broker.map(company=>{
      return {
        label : company.name,
        val: "broker",
        value: company.id
      }
    })
    let party_options = partys.map(company=>{
      return {
        label : company.name,
        val: "party",
        value: company.id
      }
    })
    let mandi_options = mandi.map(company=>{
      return {
        label : company.name,
        val: "party",
        value: company.id
      }
    })
    return [{label: "Mandi", options:mandi_options},{label:"Party",options:party_options},{label:"broker",options:broker_options}]
  }
  assemble(val){
    return {
      ...val,
      frieght_at_unloading: val.frieght_at_unloading? val.frieght_at_unloading: null,
      unloading_remarks: val.unloading_remarks? val.unloading_remarks: null
    }
  }
  handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    this.props.next(this.assemble(values))
  };


  render() {
    const { isLoadingParty, PartyOptions, date } = this.state;
    return (
      <div>
        <Formik initialValues={this.props.details} validationSchema={loadingSchema} onSubmit={this.handleSubmit}
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
                  <div className="custom-separator"></div>
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Unloading Date :
                    </label>
                    <div className="col-lg-2">
                      <DatePicker
                        tabIndex={2}
                        className="form-control"
                        dateFormat="dd-MMMM-yyyy"
                        selected={new Date(date)}
                        onChange={(date) => {
                          if (date !== null) {
                            setFieldValue("unloading_date", date.toISOString().slice(0, 10))
                            this.setState({ date: date })
                          }
                        }
                        }
                        onBlur={() => setFieldTouched("date", true)}
                        isInvalid={
                          errors.date &&
                          touched.date}
                      />
                    </div>
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Unloaded To :
                    </label>
                    <div className={classList({
                              "col-lg-2": true,
                              "valid-field":
                                !(touched.unloaded_to && errors.unloaded_to),
                              "invalid-field":
                                touched.unloaded_to && errors.unloaded_to,
                            })}>
                    <Select
                      isMulti
                      isClearable={false}
                      isDisabled={isLoadingParty}
                      isLoading={isLoadingParty}
                      onChange={(value) => { 
                        setFieldValue(`unloaded_to`, value ? this.getArray(value) : null);
                        setFieldValue(`unloadingPartyValue`, value);
                      }}
                      options={PartyOptions}
                      menuPortalTarget={document.body}
                      value={values.unloadingPartyValue}
                      tabIndex={3}
                      onBlur={() => setFieldTouched(`unloaded_to`, true)}
                      isInvalid={
                        errors.unloaded_to &&
                        touched.unloaded_to
                        }
                    />
                    {errors.unloaded_to && touched.unloaded_to && (<span className="invalid-feedback">{errors.unloaded_to}</span>)}
                    </div>

                  </div>
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Weight :
                    </label>
                    <div className="col-lg-2">
                      <div className="input-group">
                        <FormControl autoComplete="off" value={values.unloaded_quantity} name="unloaded_quantity" type="text" inputMode='numeric'
                          placeholder="Total Weight" onChange={handleChange} onBlur={handleBlur} isInvalid={errors.unloaded_quantity &&
                            touched.unloaded_quantity} tabIndex={6} />

                        <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                            Quintal
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Frieght :
                    </label>
                    <div className="col-lg-2">
                      <FormControl autoComplete="off" value={values.freight} name="freight" type="text" placeholder="Frieght per QTL" inputMode='numeric'
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.freight && touched.freight} />

                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Frieght by Party :
                    </label>
                    <div className="col-lg-2">
                      <FormControl autoComplete="off" value={values.frieght_at_unloading} name="frieght_at_unloading" type="text" placeholder="Any Advance" inputMode='numeric'
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.frieght_at_unloading && touched.frieght_at_unloading} />

                    </div>
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Any Remarks :
                    </label>
                    <div className="col-lg-2">
                      <FormControl autoComplete="off" value={values.unloading_remarks} name="unloading_remarks" type="text" placeholder="Any Comment"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.unloading_remarks && touched.unloading_remarks} />

                    </div>
                  </div>
                  <div className="custom-separator"></div>    
                </Form>
                <div className="d-flex justify-content-end mb-3">
                  <Button
                    className="mx-1"
                    variant="warning"
                    onClick={()=>this.props.cancel(this.props.details.id)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="mx-1"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Next
                  </Button>
                </div>
              </Fragment>
            );
          }}
        </Formik>
      </div>
    );
  }
}


const loadingSchema = yup.object().shape({
  unloaded_to: yup.array().of(yup.number()).required("Please select atleast one"),
  unloading_date: yup.string().required(),
  unloaded_quantity: yup.number().required().nullable(),
  freight: yup.number().required().nullable(),
  frieght_at_unloading: yup.number().optional().nullable(),
  unloading_remarks: yup.string().optional().nullable(),
});

export default withRouter(LoadingEditor);