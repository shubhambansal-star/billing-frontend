import { isMobile } from "@utils";
import React, { Component } from "react";
import { Tab,Nav, Tabs } from "react-bootstrap";
import InvoiceList from "./SalesOrderList";

class PurchaseInsideTab extends Component {
  state = {
    change: true,
    companyList: [],
    shouldShowConfirmationDialog: false,
  };
  render() {
    return (
      <div>
        <div className="w-100 overflow-auto">
          {isMobile()?<>
          <Tabs defaultActiveKey={"all"} id="uncontrolled-tab-example" unmountOnExit={true} mountOnEnter={true}>
                    <Tab eventKey={"all"} title={"All"} key={"all"} className="capitalize">
                      <InvoiceList pending={""} {...this.props}/>
                    </Tab>
                    <Tab eventKey={"pending"} title={"Pending"} key={"pending"} className="capitalize">
                      <InvoiceList pending={"pending__gt=0"} {...this.props}/>
                    </Tab>
                    <Tab eventKey={"completed"} title={"Completed"} key={"completed"} className="capitalize">
                      <InvoiceList pending={"pending=0"} {...this.props}/>
                    </Tab>
                  </Tabs> 
          </>:
          <Tab.Container id="left-tabs-example" defaultActiveKey="all" unmountOnExit={true} mountOnEnter={true}>
                  <div className="row">
                    <div className="col-md-2" style={{backgroundColor:"#f8f9fa", borderRadius:"0.25rem"}}>
                      <Nav variant="pills" className="d-flex flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="all">All</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="pending">Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="completed">Completed</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                    <div className="col-md-10">
                      <Tab.Content className="p-0">
                        <Tab.Pane eventKey="all">
                            <InvoiceList pending={""} {...this.props}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="pending">
                          <InvoiceList pending={"pending__gt=0"} {...this.props}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="completed">
                          <InvoiceList pending={"pending=0"} {...this.props}/>
                        </Tab.Pane>
                       
                      </Tab.Content>
                    </div>
                  </div>
          </Tab.Container>}
        </div>
      </div>
    );
  }
}

export default PurchaseInsideTab;
