//eslint-disable//
import React, { Component, Fragment } from "react";
import {
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import { addUnloading, updateBroker, getAllPendingSalesOrder, getAllPendingSalesOrderUpdate } from "./PurchaseOrderService";
import { withRouter } from "react-router-dom";
import { isMobile } from "@utils"
import { format } from "date-fns";
import moment from "moment"

class UpdatePurchaseOrder extends Component {
  state = {
    loading:false,
    pendingSalesOrder: [],
  };
  async componentDidMount() {
    console.log(this.props)
    if (!this.props.isNewSalesOrder){
      const res = await getAllPendingSalesOrderUpdate(this.props.match.params.id,this.props.details.unloadingPartyValue,this.props.details.genes) 
      this.setState({ pendingSalesOrder: res.map((obj)=>{return {tqty: this.props.details.unloaded_quantity, ...obj}}) })
    }
    else {
      const res = await getAllPendingSalesOrder(this.props.details.unloadingPartyValue,this.props.details.genes) 
      this.setState({ pendingSalesOrder: this.assemblePending(res) })
    }
  }
  assemblePending(list){
    let lst = list.map((obj)=>{
      return{
        quantity_unloaded:0,
        quantity_per: 0,
        tqty: this.props.details.unloaded_quantity,
        sales_order: obj.id,
        loading_from: obj.party,
        ...obj
      }
    })
    return lst
  }
  assembleArr(obj){
    let ss = obj.loading
    let lst = obj.loading_obj.filter((obj)=>{return obj.quantity_per !==0 && obj.quantity_unloaded!==0}).map((obj)=>{
      return{
        loading: this.props.details.id,
        sales_order: obj.id,
        unloading_party: obj.party,
        unloading_broker: obj.broker, 
        quantity_unloaded: obj.quantity_unloaded,
        quantity: obj.quantity_per
      }
    })
    let abc = {
      unloaded_to: ss.unloaded_to,
      unloading_date: ss.unloading_date,
      unloaded_quantity: ss.unloaded_quantity,
      freight: ss.freight,
      frieght_at_unloading: ss.frieght_at_unloading,
      unloading_remarks: ss.unloading_remarks,
      unloaded: true,
    }
    return {unloading: abc, unloading_obj:lst }
  }
  
  handleSubmit = (values, { setSubmitting }) => {
    this.setState({loading:true})
    setSubmitting(true);
    if (this.props.isNewSalesOrder) {
      addUnloading(this.props.details.id,this.assembleArr({loading: this.props.details, loading_obj:values.pendingSalesOrder}) ).then((res) => {
        this.setState({ loading: false });
        this.props.history.push(`/orders/unload/${res.data.id}`);
        this.props.toggleSalesOrderEditor();
      });
    } else {
      console.log(1)
      updateBroker(this.props.match.params.id, this.assembleArr({loading: this.props.details, loading_obj:values.pendingSalesOrder}) ).then(() => {
        this.setState({ loading: false });
        this.props.toggleSalesOrderEditor();
      });
    }
    this.props.next(this.assembleArr(values.pendingSalesOrder))
  };

  render() {
    let {loading} = this.state
    console.log(this.props)
    return (
      <div>
        <Formik initialValues={this.state} validationSchema={updatePurchaseOrder} onSubmit={this.handleSubmit}
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
                <Form onSubmit={handleSubmit} className="px-4 mt-4">
                  <div className="row">
            <div className="col-md-6 mb-1">
              <div>
                <strong>Vehicle Number :- &nbsp; </strong>{this.props?.details.vehicle_number }
                </div>
                <div>
                <strong>Unload To :- &nbsp; </strong>{this.props?.details?.unloadingPartyValue?.map((obj)=>{return obj.label}).join(', ')}
                </div>
                <div>
                <strong>Date :- &nbsp; </strong>{this.props?.details?.unloading_date
                    ? format(new Date(this.props?.details?.unloading_date).getTime(), "dd MMMM, yyyy")
                    : ""}
                </div>
                <div>
                <strong>Unload Weight :- &nbsp; </strong>{this.props?.details.unloaded_quantity + " QTL"}
                </div>
            </div>
            <div className="col-md-6 mb-1 text-right">
                <div>
                <strong>Genes :- &nbsp; </strong>{this.props?.details.genes}
                </div>
                <div>
                <strong>Frieght :- &nbsp; </strong>{this.props?.details.freight + "/QTL"}
                </div>
                <div>
                <strong>Frieght By Party :- &nbsp; </strong>{this.props?.details?.frieght_at_unloading }
                </div>
                <div>
                <strong>Remarks :- &nbsp; </strong>{this.props?.details?.unloading_remarks}
                </div>
            </div>
            </div>
            <div className="mb-2 border-bottom"></div>  
                <FieldArray name="pendingSalesOrder">
                    {isMobile() ?
                      <>
                        {values.pendingSalesOrder?.map((item, index) => {
                          return (
                            <div className="mt-2 mb-2" key={item.id}>
                              <div
                                key={item.id}

                              >
                                <div className="row mt-2 mb-2">
                                  <table className="table table-borderless" style={{ marginBottom: "0rem" }}>
                                    <tbody>
                                      <tr>
                                        <th>Date</th>
                                        <td>{moment(new Date(item.date)).format("DD-MMM-YYYY")}</td>
                                      </tr>
                                      <tr>
                                        <th>Total Quantity</th>
                                        <td className="text-capitalize">{item.quantity ? item.quantity : 0} {item.unit}</td>
                                      </tr>
                                      <tr>
                                        <th>Rate</th>
                                        <td className="text-capitalize">{item.rate ? item.rate : 0} Per QTL</td>
                                      </tr>
                                      <tr>
                                        <th>Pending Quanity</th>
                                        <td className="text-capitalize">{item.pending ? item.pending : 0} {item.unit}</td>
                                      </tr>
                                      <tr>
                                        <th>Quanity</th>
                                        <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl autoComplete="off" data-key={item.id} value={values.pendingSalesOrder[index].quantity_per} name={`pendingSalesOrder[${index}].quantity_per`} type="text" placeholder="Any Comment" inputMode='numeric'
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingSalesOrder && touched.pendingSalesOrder && errors.pendingSalesOrder[index] && touched.pendingSalesOrder[index] && errors.pendingSalesOrder[index].quantity_per && touched.pendingSalesOrder[index].quantity_per} />
                                      <div className="input-group-append" >
                                        <span className="input-group-text" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                                          {item.unit}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  </tr>
                                      <tr>
                                        <th>Weight</th>
                                  <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl autoComplete="off" data-key={item.id} value={values.pendingSalesOrder[index].quantity_unloaded} name={`pendingSalesOrder[${index}].quantity_unloaded`} type="text" placeholder="Any Comment" inputMode='numeric'
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingSalesOrder && touched.pendingSalesOrder && errors.pendingSalesOrder[index] && touched.pendingSalesOrder[index] && errors.pendingSalesOrder[index].quantity_unloaded && touched.pendingSalesOrder[index].quantity_unloaded} />
                                      <div className="input-group-append" >
                                        <span className="input-group-text" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                                          QTL
                                        </span>
                                      </div>
                                    </div>
                                  </td>

                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div style={{ borderBottom: "1px dashed #003473", margin: "15px 0" }}></div>
                            </div>
                          )
                        })}
                      </> :

                      <div className="table-responsive">
                        <table className="table table-bordered" style={{ width: "100%", tableLayout: "fixed" }}>
                          {values.pendingSalesOrder?.length === 0
                            ? <></> :
                            <thead className="bg-gray-300">
                              <tr>
                                <th style={{width:"10%"}}>Date</th>
                                <th style={{width:"20%"}}>Party Name</th>
                                <th scope="col" style={{width:"10%"}}>Total Qty</th>
                                <th scope="col" style={{width:"10%"}}>Rate</th>
                                <th scope="col" style={{width:"12%"}}>Pending Qty</th>
                                <th scope="col" style={{width:"18%"}}>Quantity</th>
                                <th style={{width:"18%"}}>Weight</th>
                              </tr>
                            </thead>}
                          <tbody>
                            {values.pendingSalesOrder?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{moment(new Date(item.date)).format("DD-MMM-YYYY")}</td>
                                  <td className="text-uppercase">{item.party_name} <br/> {item.broker_name? "Broker: "+item.broker_name:"" }</td>
                                  
                                  <td className="text-capitalize">{item.quantity} {item.unit}</td>
                                  <td className="text-capitalize">{item.rate}</td>
                                  <td className="text-capitalize">{item.pending ? item.pending - values.pendingSalesOrder[index].quantity_per : 0} {item.unit}</td>
                                  
                                  <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl data-key={item.id} value={values.pendingSalesOrder[index].quantity_per} name={`pendingSalesOrder[${index}].quantity_per`} type="text" placeholder="Any Comment"
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingSalesOrder && touched.pendingSalesOrder && errors.pendingSalesOrder[index] && touched.pendingSalesOrder[index] && errors.pendingSalesOrder[index].quantity_per && touched.pendingSalesOrder[index].quantity_per} />
                                      <div className="input-group-append" >
                                        <span className="input-group-text" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                                          {item.unit}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl data-key={item.id} value={values.pendingSalesOrder[index].quantity_unloaded} name={`pendingSalesOrder[${index}].quantity_unloaded`} type="text" placeholder="Any Comment"
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingSalesOrder && touched.pendingSalesOrder && errors.pendingSalesOrder[index] && touched.pendingSalesOrder[index] && errors.pendingSalesOrder[index].quantity_unloaded && touched.pendingSalesOrder[index].quantity_unloaded} />
                                      <div className="input-group-append" >
                                        <span className="input-group-text" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                                          QTL
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>}
                  </FieldArray>
                  </Form>
                <div className="d-flex justify-content-end mb-3">
                  <Button className="mx-2" variant="warning" onClick={()=>this.props.cancel(this.props.details.id)}>
                    Cancel
                  </Button>
                  <Button
                    disabled={false}
                    className="mx-1"
                    variant="secondary"
                    onClick={this.props.prev}
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={loading}
                    className="mx-1"
                    variant="primary"
                    onClick={handleSubmit}
                  >
                    Save
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


const updatePurchaseOrder = yup.object().shape({
  pendingSalesOrder: yup.array().of(
    yup.object().shape({
        quantity_unloaded: yup.number().required(),
        quantity_per : yup.number().required().when("quantity_unloaded",{is: (quantity_unloaded)=>quantity_unloaded>0,then: yup.number().moreThan(0)}).test(
          "max",
          "Please enter quantity smaller than pending",
          function(value) {
      const { pending } = this.parent;
      return value <= pending;
    })
    })
).required().test(
  'quantity_unloaded',
  'The total number of elements must match the total.',
  (rows = []) => {
    const total = rows.reduce((total, row) => {
      return total + (row.quantity_unloaded|| 0);
    }, 0);
    console.log(rows[0].tqty)
    return total == rows[0].tqty;
  })
})
export default withRouter(UpdatePurchaseOrder);