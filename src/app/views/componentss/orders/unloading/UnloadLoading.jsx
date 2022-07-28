import React, { Component } from "react";
import { Accordion,Card,useAccordionButton } from "react-bootstrap";
import {isMobile} from "@utils"
import {getAllPendingUnloading} from "./PurchaseOrderService"
import moment from "moment";
import FormsWizard from "./UnloadingWizard";
class UnloadLoading extends Component {
  toggleAccordion = (val) => {
    document.querySelectorAll(".abc").forEach(el => el.disabled=false)
    document.getElementById("button"+val).click();
    document.querySelectorAll(".abc").forEach(el => el.disabled=false)
  }
  cancel = ()=>{
    this.props.history.push("/orders/unload/list")
  }
  state = {
    loadedOrder:[],
    shouldShowConfirmationDialog: false,
    loading: false,
  };
  async componentDidMount() {
    this.setState({loading: true})
    await getAllPendingUnloading().then((res)=>{this.setState({loadedOrder:res.data})})
    this.setState({loading:false})
  }
  render() {
    let { loadedOrder } = this.state;
    return (
      <div className="invoice-viewer">
        {this.props.isNewSalesOrder?<>
        <h3>Pending for unloading</h3>
        {this.state.loading===false && loadedOrder.length===0?<h1 style={{}}>You are all done!!</h1>:<></>}
        {loadedOrder.map((item) => (
          <div className="mt-4 mb-4" key={item.id}>
            <Accordion className="ul-card__border-radius card border-0 card">
              <div className="card card-body">
                {isMobile()?
                <>
                  <table className="table" style={{marginBottom:"0rem", borderColor:"white"}}>
                    <tbody>
                        <tr>
                            <th className="card-title">Date</th>
                            <td className="card-title">{moment(new Date(item.date)).format("DD-MMM-YYYY")}</td>
                            </tr>
                            <tr>
                            <th className="card-title">Genes</th>
                            <td className="card-title">{item.genes}</td>
                            </tr>
                            <tr>
                            <th className="card-title">Load From</th>
                            <td className="card-title">{item.loading_from_name.map((obj)=>{return obj.label}).join(", ")}</td>
                            </tr>
                            <tr>
                            <th className="card-title">Load Weight</th>
                            <td className="card-title">{item.quantity} Qtl</td>
                            </tr>
                            <tr>
                            <th className="card-title">Truck</th>
                            <td className="card-title">{item.vehicle_number}</td>
                            </tr>
                    </tbody>
                  </table>
                  <CustomToggle
                    eventKey={item.id}
                    Tag={"button"}
                    id={"button"+item.id}
                    className="btn btn-primary collapsed cursor-pointer abc"
                  >
                    Unload &nbsp; <i className="i-Arrow-Down-2 t-font-boldest"></i>
                  </CustomToggle>
                </>:
                  <table className="table" style={{marginBottom:"0rem", borderColor:"white", width:"100%"}}>
                  <tbody>
                      <tr>
                          <th style={{fontSize:"0.9rem",width:"5%"}}>Date</th>
                          <td style={{fontSize:"0.9rem",width:"11%"}}>{moment(new Date(item.date)).format("DD-MMM-YYYY")}</td>
                          <th style={{fontSize:"0.9rem",width:"5%"}}>Genes</th>
                          <td style={{fontSize:"0.9rem",width:"8%"}}>{item.genes}</td>
                          <th style={{fontSize:"0.9rem",width:"12%"}}>Loaded From</th>
                          <td style={{fontSize:"0.9rem",width:"15%"}}>{item.loading_from_name.map((obj)=>{return obj.label}).join(", ")}</td>
                          <th style={{fontSize:"0.9rem",width:"12%"}}>Load Weight</th>
                          <td style={{fontSize:"0.9rem",width:"10%"}}>{item.quantity} QTL</td>
                          <th style={{fontSize:"0.9rem",width:"12%"}}>Vehicle No</th>
                          <td style={{fontSize:"0.9rem",width:"10%"}}>{item.vehicle_number}</td>
                          <td>
                            <CustomToggle
                                eventKey={item.id}
                                Tag={"button"}
                                id={"button"+item.id}
                                className="btn btn-primary collapsed abc"
                              >
                                Unload
                              </CustomToggle>
                          </td>
                      </tr>
                  </tbody>
                  </table> }
                <Accordion.Collapse eventKey={item.id} unmountOnExit={true} mountOnEnter={true}>
                  <FormsWizard cancel={this.toggleAccordion} item={item}{...this.props}/>
                </Accordion.Collapse>
              </div>
            </Accordion>
          </div>))}
          </>:
          <>
          <Card elevation={6}>
          <FormsWizard cancel={this.cancel} {...this.props}/>
          </Card>
          </>}
      </div>
    );
  }
}

export default UnloadLoading;

function CustomToggle({ children, eventKey, Tag, className, id}) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>{
    document.querySelectorAll(".abc").forEach(el => el.disabled=true)
  }

  );

  return (
    <Tag onClick={decoratedOnClick} className={className} id={id} style={{boxShadow:"0px 0px 0px 0px #663399"}}>
      {children}
    </Tag>
  );
}
