//eslint-disable//
import React, { Component, Fragment } from "react";
import {
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import { addLoading, updateBroker, getAllPendingPurchaseOrderUpdate, getAllPendingPurchaseOrder } from "./PurchaseOrderService";
import { withRouter } from "react-router-dom";
import { isMobile } from "@utils"
import { format } from "date-fns";
import moment from "moment"

class UpdatePurchaseOrder extends Component {
  state = {
    loading:false,
    total_quantity_loaded: this.props.details.quantity,
    pendingPurchaseOrder: [],
  };
  async componentDidMount() {
    console.log(this.props)
    if (!this.props.isNewSalesOrder){
      const res = await getAllPendingPurchaseOrderUpdate(this.props.match.params.id,this.props.details.partyValue,this.props.details.genes) 
      this.setState({ pendingPurchaseOrder: res.map((obj)=>{return {tqty: this.props.details.quantity, ...obj}}) })
    }
    else {
      const res = await getAllPendingPurchaseOrder(this.props.details.partyValue,this.props.details.genes) 
      this.setState({ pendingPurchaseOrder: this.assemblePending(res), total_quantity_loaded: this.props.details.quantity })
    }
  }
  assemblePending(list){
    let lst = list.map((obj)=>{
      return{
        quantity_loaded:0,
        quantity_per: 0,
        tqty: this.props.details.quantity,
        purchase_order: obj.id,
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
        purchase_order: obj.id,
        loading_party: obj.party,
        loading_broker: obj.broker, 
        quantity_loaded: obj.quantity_loaded,
        quantity: obj.quantity_per
      }
    })
    let abc = {
      loading_from: ss.loading_from,
      date: ss.date,
      genes: ss.genes,
      quantity: ss.quantity,
      vehicle_number: ss.vehicle_number,
      freight: ss.freight?ss.freight: null,
      frieght_paid_at_loading: ss.frieght_paid_at_loading?ss.frieght_paid_at_loading: null,
      remarks: ss.remarks?ss.remarks:null,
      unloaded_to:ss.unloaded_to?.length===0||ss.unloaded_to===undefined? []:ss.unloaded_to,
      bill_or_builty: ss.bill_or_builty
    }
    return {loading: abc, loading_obj:lst }
  }
  handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    if (this.props.isNewSalesOrder) {
      addLoading( this.assembleArr({loading: this.props.details, loading_obj:values.pendingPurchaseOrder}) ).then((res) => {
        this.setState({ loading: false });
        this.props.history.push(`/orders/loading/${res.data.id}`);
        this.props.toggleSalesOrderEditor();
      });
    } else {
      updateBroker(this.props.match.params.id, this.assembleArr({loading: this.props.details, loading_obj: values.pendingPurchaseOrder}) ).then(() => {
        this.setState({ loading: false });
        this.props.toggleSalesOrderEditor();
      });
    }
    this.props.next(this.assembleArr(values.pendingPurchaseOrder))
  };

  render() {
    let {loading} = this.state
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
                <strong>Loading From :- &nbsp; </strong>{this.props?.details?.partyValue?.map((obj)=>{return obj.label}).join(', ')}
                </div>
                <div>
                <strong>Date :- &nbsp; </strong>{this.props?.details?.date
                    ? format(new Date(this.props?.details?.date).getTime(), "dd MMMM, yyyy")
                    : ""}
                </div>
                <div>
                <strong>Load Weight :- &nbsp; </strong>{this.props?.details.quantity + " QTL"}
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
                <strong>Advance :- &nbsp; </strong>{this.props?.details?.frieght_paid_at_loading }
                </div>
                <div>
                <strong>Remarks :- &nbsp; </strong>{this.props?.details?.remarks}
                </div>
            </div>
            </div>
            <div className="mb-2 border-bottom"></div>         
                <FieldArray name="pendingPurchaseOrder">
                    {isMobile() ?
                      <>
                        {values.pendingPurchaseOrder?.map((item, index) => {
                          return (
                            <div className="mt-2 ms-2 me-2 mb-2" key={item.id}>
                              <div
                                key={item.id}

                              >
                                <div className="row mt-2 ms-2 me-2 mb-2">
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
                                        <td className="text-capitalize">{item.pending ? item.pending - values.pendingPurchaseOrder[index].quantity_per : 0} {item.unit}</td>
                                      </tr>
                                      <tr>
                                        <th>Quanity </th>
                                        <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl data-key={item.id} value={values.pendingPurchaseOrder[index].quantity_per} name={`pendingPurchaseOrder[${index}].quantity_per`} type="text" placeholder="Any Comment"
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingPurchaseOrder && touched.pendingPurchaseOrder && errors.pendingPurchaseOrder[index] && touched.pendingPurchaseOrder[index] && errors.pendingPurchaseOrder[index].quantity_per && touched.pendingPurchaseOrder[index].quantity_per} />
                                      <div className="input-group-append" >
                                        <span className="input-group-text" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                                          {item.unit}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  </tr>
                                      <tr>
                                        <th>Quanity Loaded</th>
                                  <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl data-key={item.id} value={values.pendingPurchaseOrder[index].quantity_loaded} name={`pendingPurchaseOrder[${index}].quantity_loaded`} type="text" placeholder="Any Comment"
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingPurchaseOrder && touched.pendingPurchaseOrder && errors.pendingPurchaseOrder[index] && touched.pendingPurchaseOrder[index] && errors.pendingPurchaseOrder[index].quantity_loaded && touched.pendingPurchaseOrder[index].quantity_loaded} />
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
                          {values.pendingPurchaseOrder?.length === 0
                            ? <></> :
                            <thead className="bg-gray-300">
                              <tr>
                                <th style={{width:"10%"}}>Date</th>
                                <th style={{width:"20%"}}>Party Name</th>
                                <th scope="col" style={{width:"10%"}}>Total Qty</th>
                                <th scope="col" style={{width:"10%"}}>Rate</th>
                                <th scope="col" style={{width:"12%"}}>Pending Qty</th>
                                <th scope="col" style={{width:"18%"}}>Quantity</th>
                                <th style={{width:"18%"}}>Quantity Loaded</th>
                              </tr>
                            </thead>}
                          <tbody>
                            {values.pendingPurchaseOrder?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{moment(new Date(item.date)).format("DD-MMM-YYYY")}</td>
                                  <td className="text-uppercase">{item.party_name} <br/> {item.broker_name? "Broker: "+item.broker_name:"" }</td>
                                  
                                  <td className="text-capitalize">{item.quantity} {item.unit}</td>
                                  <td className="text-capitalize">{item.rate}</td>
                                  <td className="text-capitalize">{item.pending ? item.pending - values.pendingPurchaseOrder[index].quantity_per : 0} {item.unit}</td>
                                  
                                  <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl data-key={item.id} value={values.pendingPurchaseOrder[index].quantity_per} name={`pendingPurchaseOrder[${index}].quantity_per`} type="text" placeholder="Any Comment"
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingPurchaseOrder && touched.pendingPurchaseOrder && errors.pendingPurchaseOrder[index] && touched.pendingPurchaseOrder[index] && errors.pendingPurchaseOrder[index].quantity_per && touched.pendingPurchaseOrder[index].quantity_per} />
                                      <div className="input-group-append" >
                                        <span className="input-group-text" style={{ borderTopLeftRadius: "0rem", borderBottomLeftRadius: "0rem" }}>
                                          {item.unit}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-capitalize">
                                    <div className="input-group">
                                      <FormControl data-key={item.id} value={values.pendingPurchaseOrder[index].quantity_loaded} name={`pendingPurchaseOrder[${index}].quantity_loaded`} type="text" placeholder="Any Comment"
                                        onChange={handleChange} onBlur={handleBlur} isInvalid={errors.pendingPurchaseOrder && touched.pendingPurchaseOrder && errors.pendingPurchaseOrder[index] && touched.pendingPurchaseOrder[index] && errors.pendingPurchaseOrder[index].quantity_loaded && touched.pendingPurchaseOrder[index].quantity_loaded} />
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
                  <Button className="mx-2" variant="warning" onClick={()=>{console.log(errors);this.props.history.push('/orders/loading/create')}}>
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
  total_quantity_loaded: yup.number().required(),
  pendingPurchaseOrder: yup.array().of(
    yup.object().shape({
        quantity_loaded: yup.number().required(),
        quantity_per : yup.number().required().when("quantity_loaded",{is: (quantity_loaded)=>quantity_loaded>0,then: yup.number().moreThan(0)}).test(
          "max",
          "Please enter quantity smaller than pending",
          function(value) {
      const { pending } = this.parent;
      return value <= pending;
    })
    })
).required().test(
  'quantity_loaded',
  'The total number of elements must match the total.',
  (rows = []) => {
    const total = rows.reduce((total, row) => {
      return total + (row.quantity_loaded|| 0);
    }, 0);
    console.log(total)
    return total == rows[0].tqty;
  })
})
export default withRouter(UpdatePurchaseOrder);