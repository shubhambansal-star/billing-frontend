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
import CreatableSelect from 'react-select/creatable';
import DatePicker from "react-datepicker";
import { GenesGroup } from "../../../AllOptions"
import {  classList } from "@utils"
import {createParty} from "../purchase/PurchaseOrderService"
class LoadingEditor extends Component {
  state = {
    isLoadingParty: false,
    PartyOptions: [],
    PartyValue: null,
    billValue: null,
    billOptions: [],
    quantityInvalid: false,
    loading: false,
    date: new Date(),
    pendingPurchaseOrder: [],
    details: this.props.details,
  };
  async componentDidMount() {
    this.setState({ isLoadingBroker: true, isLoadingParty: true })
    const res = await getAllOrderParty() 
    this.setState({isLoadingParty: false})
    this.setState({billOptions: this.assemble(res.data.filter((obj)=>{return obj.party_type==="bilty"}))})
    this.setState({ PartyOptions: this.assembleOption(res.data) })
  }
  handleCreate = (inputValue) => {
    this.setState({ isLoadingParty: true });
    createParty({name:inputValue, party_type: "bilty"}).then((res)=>{
      const { billOptions } = this.state;
      const newOption = {label: res.data.name, value: res.data.name}
      this.setState({
        isLoadingParty: false,
        billOptions: [...billOptions, newOption],
        billValue: newOption,
      });
    })
  };
  getArray(val){
    let arr = val.map((value)=>{
      return value.value
    })
    return arr
  }
  assemble(lst){
    let ls = lst.map((obj)=>{
      return {
        label: obj.name,
        value: obj.name,
      }
    })
    ls.push({label:"Bill",value:"bill"})
    return ls
  }
  assembleOption = (list) => {
    let broker = list.filter(party => { return party.party_type === "broker" })
    let partys = list.filter(party => { return party.party_type === "purchase" })
    let mandi = list.filter(party => { return party.party_type === "mandi-purchase" })
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
  handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    this.props.next(values)
  };


  render() {
    const { isLoadingParty, PartyOptions, date, billOptions, billValue } = this.state;
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
                      Date :
                    </label>
                    <div className="col-lg-2">
                      <DatePicker
                        tabIndex={2}
                        className="form-control"
                        dateFormat="dd-MMMM-yyyy"
                        selected={new Date(date)}
                        onChange={(date) => {
                          if (date !== null) {
                            setFieldValue("date", date.toISOString().slice(0, 10))
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
                      Vehicle Number :
                    </label>
                    <div className="col-lg-2">
                      <FormControl value={values.vehicle_number} name="vehicle_number" type="text" placeholder="Vehicle Number"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.vehicle_number && touched.vehicle_number} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Loading From :
                    </label>
                    <div className={classList({
                              "col-lg-2": true,
                              "valid-field":
                                !(touched.loading_from && errors.loading_from),
                              "invalid-field":
                                touched.loading_from && errors.loading_from,
                            })}>
                    <Select
                      isMulti
                      isClearable={false}
                      isDisabled={isLoadingParty}
                      isLoading={isLoadingParty}
                      onChange={(value) => { 
                        setFieldValue(`loading_from`, value ? this.getArray(value) : null);
                        setFieldValue(`partyValue`, value);
                      }}
                      options={PartyOptions}
                      menuPortalTarget={document.body}
                      value={values.partyValue}
                      tabIndex={3}
                      onBlur={() => setFieldTouched(`loading_from`, true)}
                      isInvalid={
                        errors.loading_from &&
                        touched.loading_from
                        }
                    />
                    {errors.loading_from && touched.loading_from && (<span className="invalid-feedback">{errors.loading_from}</span>)}
                    </div>
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Genes :
                    </label>
                    <div className="col-lg-2">
                      <Form.Select
                        name="genes"
                        value={values.genes}
                        onChange={(value) => {
                          setFieldValue('genes', value.target.value)
                        }}
                        onBlur={() => setFieldTouched('genes', true)}
                        tabIndex={5}
                        isInvalid={
                          errors.genes && touched.genes
                        }
                      >
                        <option value="0" key="">Select ...</option>
                        {GenesGroup.map((item, index) => (
                          <option value={item.value} key={item.value}>{item.label}</option>
                        ))}
                      </Form.Select>
                    </div>
                    

                  </div>
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Quantity :
                    </label>
                    <div className="col-lg-2">
                      <div className="input-group">
                        <FormControl value={values.quantity} name="quantity" type="text" inputMode='numeric'
                          placeholder="QTY" onChange={handleChange} onBlur={handleBlur} isInvalid={errors.quantity &&
                            touched.quantity} tabIndex={6} />

                        <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                            Quintal
                          </span>
                        </div>
                      </div>
                    </div>
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Bill Or Bilty :
                    </label>
                    <div className="col-lg-2">
                  <CreatableSelect
                    isClearable
                    isDisabled={isLoadingParty}
                    isLoading={isLoadingParty}
                    onChange={(newValue)=>{
                      this.setState({ billValue: newValue });
                      setFieldValue("bill_or_builty",newValue? newValue.value: null)
                    }}
                    onCreateOption={this.handleCreate}
                    options={billOptions}
                    value={billValue}
                    tabIndex={3}
                    onBlur={()=> setFieldTouched("bill_or_builty", true)}
                      isInvalid={
                      errors.bill_or_builty &&
                      touched.bill_or_builty }
                    />   
            </div>
                    
                    
                  </div>
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Frieght :
                    </label>
                    <div className="col-lg-2">
                      <FormControl value={values.freight} name="freight" type="text" placeholder="Frieght per QTL"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.freight && touched.freight} />

                    </div>
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Any Advance :
                    </label>
                    <div className="col-lg-2">
                      <FormControl value={values.frieght_paid_at_loading} name="frieght_paid_at_loading" type="text" placeholder="Any Advance"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.frieght_paid_at_loading && touched.frieght_paid_at_loading} />

                    </div>
                    
                  </div>
                  <div className="custom-separator"></div> 
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Any Remarks :
                    </label>
                    <div className="col-lg-2">
                      <FormControl value={values.remarks} name="remarks" type="text" placeholder="Any Comment"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.remarks && touched.remarks} />

                    </div>
                  
            </div>
                </Form>
              
                <div className="d-flex justify-content-end mb-3">
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
  loading_from: yup.array().of(yup.number()).required("Please select atleast one"),
  date: yup.string().required(),
  genes: yup.string().required(),
  quantity: yup.string().required(),
  vehicle_number: yup.string().required(),
  freight: yup.number().optional().nullable(),
  frieght_paid_at_loading: yup.number().optional().nullable(),
  bill_or_builty: yup.string().required(),
  remarks: yup.string().optional().nullable(),
});

export default withRouter(LoadingEditor);