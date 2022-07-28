//eslint-disable//
import React, { Component, Fragment } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import Select from 'react-select'
import { Formik, FieldArray } from "formik";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import { getInvoiceById, addInvoice, updateInvoice, getAllCompany, getAllParty } from "./InvoiceService";
import { withRouter } from "react-router-dom";
import { GenesGroup } from "../../../views/AllOptions"
class InvoiceEditor extends Component {
  state = {
    id: 2,
    bill: {
      date: new Date(),
      bill_to: 0,
      bill_by: 0,
      vehicle_no: "",
      remarks: "",
      frieght: 0,
      bw: "A",
      invoice_no: "",
      shipto: {
        name: "",
        address: "",
        gstin: ""
      },
      billitems: []
    },
  };
  shipto = false;
  partyList = [];
  companyList = [];
  selectedCompany = null;
  selectedParty = null;
  selectedItem = null;
  componentDidMount() {
    getAllCompany().then((res) => { this.companyList = this.companyassembleList(res.data) }).catch((error) => { console.log(error) })
    getAllParty().then((res) => {
      this.partyList = this.partyassembleList(res.data)
      this.setState({ partyList: res.data })
    })
      .catch((error) => {
        console.log(error)
      })
    if (!this.props.isNewInvoice) {
      getInvoiceById(this.props.match.params.id)
        .then((res) => {
          this.setState({ bill: res.data });
          this.selectedCompany = {
            label: res.data.company_name,
            value: res.data.bill_by
          }
          this.selectedParty = {
            label: res.data.party_name,
            value: res.data.bill_to
          }
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
    this.setState({ loading: true });
    setSubmitting(true);
    if (this.props.isNewInvoice)
      addInvoice(values.bill).then((res) => {
        this.setState({ loading: false });
        this.props.history.push(`/invoice/invoice/${res.data.id}`);
        this.props.toggleInvoiceEditor();
      });
    else
      updateInvoice(this.state.bill.id, values.bill).then(() => {
        this.setState({ loading: false });
        this.props.toggleInvoiceEditor();
      });
  };

  companyassembleList = (list) => {
    let companies = list.map(company => {
      return {
        label: company.name,
        value: company.id,
      }
    })
    return companies
  }
  partyassembleList = (list) => {
    let companies = list.map(company => {
      return {
        label: company.party_username,
        value: company.id,
      }
    })
    return companies
  }
  render() {
    this.subTotalCost = 0;
    let { loading } = this.state;

    return (
      <div className="invoice-viewer py-3">
        <Formik initialValues={this.state} validationSchema={invoiceSchema} onSubmit={this.handleSubmit}
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
                      <h4 className="fw-bold">Invoice</h4>
                    </div>
                    <div className="col-md-2 text-right">

                      <div className="justify-content-end">
                        <div className="mb-4">
                          <Button type="button" className="me-3 py-2" variant="warning" onClick={() => {
                            if (!this.props.isNewInvoice) {
                              this.props.toggleInvoiceEditor()
                            } else {
                              this.props.history.push(`/invoice/invoice/list`);
                            }
                          }}
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
                  <div className="row mb-3 justify-content-between">
                    <div className="col-md-3">
                      <label className="text-15">
                        Bill Type
                      </label>
                      <fieldset>
                        <div className="ul-form__radio-inline">
                          <label className="radio radio-success form-check-inline">
                            <input type="radio" name="bill.bw" checked={values.bill.bw === "A"} onChange={handleChange}
                              value="A" />
                            <span>A</span>
                            <span className="checkmark"></span>
                          </label>
                          <label className="radio check-reverse radio-warning">
                            <input type="radio" name="bill.bw" checked={values.bill.bw === "B"} onChange={handleChange}
                              value="B" />
                            <span>B</span>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </fieldset>
                      {errors.status && touched.status && (
                        <small className="text-danger">
                          Minimum 1 item is required
                        </small>
                      )}
                    </div>
                    {values.bill.bw === "B" ? <>
                      <div className="col-md-3 mb-3">
                        <div className="mb-1">Invoice Number</div>
                        <FormControl value={values.bill.invoice_no} name="bill.invoice_no" type="text"
                          placeholder="Invoice Number" onChange={handleChange} onBlur={handleBlur} isInvalid={errors.bill &&
                            touched.bill && errors.bill.invoice_no && touched.bill.invoice_no} />
                      </div>
                    </> : <></>}
                    <div className="col-md-3 text-right">
                      <div className="mb-1">Vehicle No</div>
                      <FormControl value={values.bill.vehicle_no} name="bill.vehicle_no" type="text" placeholder="Vehicle Number"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.bill && touched.bill &&
                          errors.bill.vehicle_no && touched.bill.vehicle_no} />
                    </div>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-md-3">
                      <FormGroup className="mb-3 pl-0">
                        <div className="form-group mb-3">
                          <div className="mb-1">Order Date</div>
                          <DatePicker className="form-control text-right" dateFormat="dd-MMM-yyyy" selected={new
                            Date(values.bill.date)} onChange={(date) => {
                              setFieldValue("bill.date", date.toISOString().slice(0, 10))
                              setFieldValue("date", date);
                            }}
                          />
                        </div>
                      </FormGroup>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="mb-1">Freight</div>
                      <FormControl value={values.bill.frieght} name="bill.frieght" type="number" placeholder="Frieght"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.bill && touched.bill && errors.bill.frieght
                          && touched.bill.frieght} />
                    </div>

                    <div className="col-md-3 text-right">

                      <div className="mb-1">Remarks</div>
                      <FormControl value={values.bill.remarks} name="bill.remarks" type="text" placeholder="Remarks"
                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.bill && touched.bill && errors.bill.remarks
                          && touched.bill.remarks} />
                    </div>
                  </div>

                  <div className="mt-3 mb-4 border-top"></div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h5 className="fw-bold">Bill From</h5>
                      <FormGroup className="col-md-10 mb-1 pl-0">
                        <Select
                          name="bill.bill_by"
                          value={this.selectedCompany}
                          isDisabled={!this.props.isNewInvoice}
                          onChange={(value) => { this.selectedCompany = value; setFieldValue("bill.bill_by", value.value) }}
                          onBlur={() => { setFieldTouched("bill.bill_by", true) }}
                          isInvalid={
                            errors.bill &&
                            touched.bill &&
                            errors.bill.bill_by &&
                            touched.bill.bill_by
                          }
                          options={this.companyList}
                        />
                      </FormGroup>
                    </div>

                    <div className="col-md-6 text-right">
                      <h5 className="fw-bold">Bill To</h5>
                      <FormGroup className="col-md-10 mb-1 pl-0 text-right">
                        <Select
                          name="bill.bill_to"
                          value={this.selectedParty}
                          onChange={(value) => { this.selectedParty = value; setFieldValue("bill.bill_to", value.value) }}
                          onBlur={() => { setFieldTouched("bill.bill_to", true) }}
                          isInvalid={
                            errors.bill &&
                            touched.bill &&
                            errors.bill.bill_to &&
                            touched.bill.bill_to
                          }
                          options={this.partyList}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <FieldArray name="bill.billitems">
                      {(arrayHelpers) => (
                        <div>
                          <div className="w-100 overflow-auto">
                            <table style={{ minWidth: 750 }} className="table table-hover mb-3">
                              <thead className="bg-gray-300">
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Item Name</th>
                                  <th scope="col">Bags</th>
                                  <th scope="col">Qty</th>
                                  <th scope="col">Rate</th>
                                  <th scope="col">PO No.</th>
                                  <th scope="col">Amount</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {values.bill.billitems.map((item, ind) => (
                                  <tr key={ind}>
                                    <th className="text-middle" scope="row">
                                      {ind + 1}
                                    </th>
                                    <td>

                                      <Form.Select name={`bill.billitems[${ind}].item`} value={values.bill.billitems[ind].item}
                                        onChange={(value) => {
                                          setFieldValue(`bill.billitems[${ind}].item`,
                                            value.target.value)
                                        }}
                                        onBlur={() => setFieldTouched(`bill.billitems[${ind}].item`, true)}
                                        isInvalid={
                                          errors.bill &&
                                          touched.bill &&
                                          errors.bill.billitems &&
                                          touched.bill.billitems &&
                                          errors.bill.billitems[ind] &&
                                          touched.bill.billitems[ind] &&
                                          errors.bill.billitems[ind].item &&
                                          touched.bill.billitems[ind].item
                                        }
                                      >
                                        {GenesGroup.map((item, index) => (
                                          <option value={item.value} key={item.value}>{item.label}</option>
                                        ))}
                                      </Form.Select>
                                    </td>
                                    <td>
                                      <FormControl value={values.bill.billitems[ind].uom} name={`bill.billitems[${ind}].uom`}
                                        type="number" placeholder="Bags" onChange={handleChange} onBlur={handleBlur} isInvalid={
                                          errors.bill && touched.bill && errors.bill.billitems && touched.bill.billitems &&
                                          errors.bill.billitems[ind] && touched.bill.billitems[ind] && errors.bill.billitems[ind].uom &&
                                          touched.bill.billitems[ind].uom} />
                                    </td>
                                    <td>
                                      <FormControl value={values.bill.billitems[ind].qty} name={`bill.billitems[${ind}].qty`}
                                        type="number" placeholder="Quantity" onChange={handleChange} onBlur={handleBlur} isInvalid={
                                          errors.bill && touched.bill && errors.bill.billitems && touched.bill.billitems &&
                                          errors.bill.billitems[ind] && touched.bill.billitems[ind] && errors.bill.billitems[ind].qty &&
                                          touched.bill.billitems[ind].qty} />
                                    </td>

                                    <td>
                                      <FormControl value={values.bill.billitems[ind].rate} name={`bill.billitems[${ind}].rate`}
                                        type="number" placeholder="Rate" onChange={handleChange} onBlur={handleBlur} isInvalid={
                                          errors.bill && touched.bill && errors.bill.billitems && touched.bill.billitems &&
                                          errors.bill.billitems[ind] && touched.bill.billitems[ind] && errors.bill.billitems[ind].rate &&
                                          touched.bill.billitems[ind].rate} />
                                    </td>
                                    <td>
                                      <FormControl value={values.bill.billitems[ind].po_number}
                                        name={`bill.billitems[${ind}].po_number`} type="text" placeholder="PO Number"
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.bill && touched.bill &&
                                          errors.bill.billitems && touched.bill.billitems && errors.bill.billitems[ind] &&
                                          touched.bill.billitems[ind] && errors.bill.billitems[ind].po_number &&
                                          touched.bill.billitems[ind].po_number} />
                                    </td>
                                    <td className="text-middle">
                                      {values.bill.billitems[ind].qty *
                                        values.bill.billitems[ind].rate}
                                    </td>
                                    <td>
                                      <button type="button" onClick={() => arrayHelpers.remove(ind)}
                                        className="btn btn-outline-secondary float-right"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {values.bill.billitems.length === 0 && (
                            <small className="text-danger">
                              Minimum 1 item is required
                            </small>
                          )}
                          <button type="button" onClick={() =>
                            arrayHelpers.push({
                              item: "maize",
                              uom: "",
                              qty: "",
                              rate: "",
                              po_number: ""
                            })
                          }
                            className="btn btn-primary float-end mb-4"
                          >
                            Add Item
                          </button>
                        </div>
                      )}
                    </FieldArray>
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
const invoiceSchema = yup.object().shape({
  bill: yup.object().shape({
    date: yup.string().required("Date is required"),
    bill_to: yup.number().required("Bill To Party is required"),
    bill_by: yup.number().required("Please select company from dropdown"),
    vehicle_no: yup.string().required("Vehicle number is required").matches(/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/, "Only alphabets are allowed for this field "),
    remarks: yup.string().optional(),
    frieght: yup.number().optional(),
    bw: yup.string().required("bill type is required"),
    invoice_no: yup.string().optional(),
    shipto: yup.object().shape({
      name: yup.string().optional(),
      address: yup.string().optional(),
      gstin: yup.string().optional(),
      state: yup.string().optional(),
      state_code: yup.string().optional(),
    }),
    billitems: yup
      .array()
      .of(
        yup.object().shape({
          item: yup.string().required("item is required"),
          uom: yup.number().required("Bags is required"),
          qty: yup.number().required("price is required"),
          rate: yup.number().required("unit is required"),
          po_number: yup.string().optional(),
        })
      )
      .min(1, "Minimum 1 item is required")
  }),
});

export default withRouter(InvoiceEditor);