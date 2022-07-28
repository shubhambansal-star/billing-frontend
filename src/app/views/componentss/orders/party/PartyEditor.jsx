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
class BrokerEditor extends Component {
  state = {
    loading: false,
    id: "",
    party_type: "sales",
    name: "",
    contact_number: "",
    email: "",
    address: "",
    state: "",
  };
  componentDidMount() {
    if (!this.props.isNewBroker) {
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
  }
  handleSubmit = (values, { setSubmitting }) => {
    let { id } = this.state;
    this.setState({ loading: true });
    setSubmitting(true);
    if (this.props.isNewBroker) {
      addParty(values).then((res) => {
        this.setState({ loading: false });
        this.props.history.push(`/orders/party/${res.data.id}`);
        this.props.toggleBrokerEditor();
      });
    } else {
      updateParty(id, values).then(() => {
        this.setState({ loading: false });
        this.props.toggleBrokerEditor();
      });
    }
  };
  render() {
    let { loading } = this.state;
    return (
      <div className="invoice-viewer py-3">
        <Formik initialValues={this.state} validationSchema={orderPartySchema} onSubmit={this.handleSubmit}
          enableReinitialize={true}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <Fragment>
                <Form onSubmit={handleSubmit} className="px-3">
                  <div className="row mb-3 justify-content-between">
                    <div className="col-md-3">
                      <h4 className="fw-bold">Party</h4>
                    </div>
                    <div className="col-md-2 text-right">

                      <div className="justify-content-end">
                        <div className="mb-4">
                          <Button type="button" className="me-3 py-2" variant="warning" onClick={() =>
                            this.props.history.push('/orders/party/list')}
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
                      Party Type :
                    </label>
                    <div className="col-lg-2">
                      <Form.Select name={"party_type"} value={values.party_type}
                        onChange={(value) => { setFieldValue(`party_type`, value.target.value) }}
                        onBlur={() => setFieldTouched(`party_type`, true)}
                        isInvalid={
                          errors.bill &&
                          touched.bill
                        }
                      >
                        <option value={"mandi-purchase"} key={"mandi-purchase"}>Mandi Purchase</option>
                        <option value={"purchase"} key={"purchase"}>Purchase</option>
                        <option value={"mandi-sales"} key={"mandi-sales"}>Mandi Sales</option>
                        <option value={"sales"} key={"sales"}>Sales</option>
                      </Form.Select>
                    </div>
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Party Name :
                    </label>
                    <div className="col-lg-2">
                      <FormControl value={values.name} name="name" type="text"
                        placeholder="Name" onChange={handleChange} onBlur={handleBlur} isInvalid={errors.name &&
                          touched.name} tabIndex={2} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Party's Email :
                    </label>
                    <div className="col-lg-2">
                      <FormControl value={values.email} name="email" type="email"
                        placeholder="Party's Email" onChange={handleChange} onBlur={handleBlur} isInvalid={errors.email &&
                          touched.email} tabIndex={3} />
                    </div>
                    <label className="ul-form__label ul-form--margin col-lg-3 col-form-label fw-bold">
                      Party's Contact Number :
                    </label>
                    <div className="col-lg-2">
                      <FormControl value={values.contact_number} name="contact_number" type="number"
                        placeholder="Party's Contact No" onChange={handleChange} onBlur={handleBlur} isInvalid={errors.contact_number &&
                          touched.contact_number} tabIndex={3} />

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
const orderPartySchema = yup.object().shape({
  party_type: yup.string().required(),
  name: yup.string().required(),
  contact_number: yup.string().optional().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please Enter in correct format"),
  email: yup.string().optional().email(),
});

export default withRouter(BrokerEditor);