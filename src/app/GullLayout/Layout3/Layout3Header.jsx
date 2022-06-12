import React, { Component, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { classList } from "@utils";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { withRouter, Link } from "react-router-dom";
import { merge } from "lodash";
import { navigations } from "app/navigations";

class Layout3Header extends Component {
  state = {
    shorcutMenuList: [
      {
        icon: "i-Shop-4",
        link: "#",
        text: "Home",
      },
      {
        icon: "i-Library",
        link: "#",
        text: "Ui Kits",
      },
      {
        icon: "i-Drop",
        link: "#",
        text: "Apps",
      },
      {
        icon: "i-File-Clipboard-File--Text",
        link: "#",
        text: "Form",
      },
      {
        icon: "i-Checked-User",
        link: "#",
        text: "Sessions",
      },
      {
        icon: "i-Ambulance",
        link: "#",
        text: "Support",
      },
    ],
    notificationList: [
      {
        icon: "i-Speach-Bubble-6",
        title: "New message",
        description: "James: Hey! are you busy?",
        time: "2019-10-30T02:10:18.931Z",
        color: "primary",
        status: "New",
      },
      {
        icon: "i-Receipt-3",
        title: "New order received",
        description: "1 Headphone, 3 iPhone",
        time: "2019-03-10T02:10:18.931Z",
        color: "success",
        status: "New",
      },
      {
        icon: "i-Empty-Box",
        title: "Product out of stock",
        description: "1 Headphone, 3 iPhone",
        time: "2019-05-10T02:10:18.931Z",
        color: "danger",
        status: "3",
      },
      {
        icon: "i-Data-Power",
        title: "Server up!",
        description: "Server rebooted successfully",
        time: "2019-03-10T02:10:18.931Z",
        color: "success",
        status: "3",
      },
    ],
  };

  handleMenuClick = () => {
    let { setLayoutSettings, settings } = this.props;
    setLayoutSettings(
      merge({}, settings, {
        layout3Settings: {
          leftSidebar: {
            open: !settings.layout3Settings.leftSidebar.open,
          },
        },
      })
    );
  };

  toggleFullScreen = () => {
    if (document.fullscreenEnabled) {
      if (!document.fullscreen) document.documentElement.requestFullscreen();
      else document.exitFullscreen();
    }
  };

  handleSearchBoxOpen = () => {
    let { setLayoutSettings, settings } = this.props;
    setLayoutSettings(
      merge({}, settings, {
        layout3Settings: {
          searchBox: {
            open: true,
          },
        },
      })
    );
  };

  render() {
    let { shorcutMenuList = [], notificationList = [] } = this.state;
    let { settings } = this.props;

    return (
      <Fragment>
        <div className="main-header">
          <div className="logo">
            <img src="/assets/images/logo.png" alt="" />
          </div>

          <div className="menu-toggle" onClick={this.handleMenuClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div
            className={classList({
              "header-topnav": true,
              open: settings.layout3Settings.leftSidebar.open,
            })}
          >
            
              <div className="topnav">
                <ul className="menu float-left">
                  {navigations.map((parent, index) => (
                    <li key={index}>
                      <div>
                        <div>
                          <label className="toggle" htmlFor={`drop-${index}`}>
                            {parent.name}
                          </label>
                          <Link to={!parent.sub ? parent.path : "#"}>
                            <i className={`nav-icon mr-2 ${parent.icon}`}></i>
                            &nbsp; {parent.name}
                          </Link>
                          <input type="checkbox" id={`drop-${index}`} />
                          <ul>
                            {parent.sub &&
                              parent.sub.map((child, i) => (
                                <li key={i}>
                                  <Link to={child.path || "#"}>
                                    <i
                                      className={`nav-icon mr-2 ${child.icon}`}
                                    ></i>
                                    <span className="item-name">
                                      &nbsp; {child.name}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            
          </div>
        



          {/* //here */}


          <div style={{ margin: "auto" }}></div>

          <div className="header-part-right">
            <i
              className="i-Full-Screen header-icon d-none d-sm-inline-block"
              data-fullscreen
              onClick={this.toggleFullScreen}
            ></i>
            <div className="user col align-self-end">
              <Dropdown>
                <DropdownToggle variant="link" className="toggle-hidden">
                  <img
                    src="/assets/images/faces/1.jpg"
                    id="userDropdown"
                    alt=""
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  />
                </DropdownToggle>
                <DropdownMenu>
                  <div className="dropdown-header">
                    <i className="i-Lock-User mr-1"></i> Timothy Carlson
                  </div>
                  <span
                    className="dropdown-item cursor-pointer"
                    onClick={this.props.logoutUser}
                  >
                    Sign out
                  </span>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>

        
      </Fragment>
    );
  }
}

Layout3Header.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
});

export default withRouter(
  connect(mapStateToProps, {
    setLayoutSettings,
  })(Layout3Header)
);
