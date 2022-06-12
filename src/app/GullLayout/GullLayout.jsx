import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import AppContext from "app/appContext";
import {
  setLayoutSettings,
  setDefaultSettings,
} from "app/redux/actions/LayoutActions";

import { GullLayouts } from ".";
import Customizer from "./SharedComponents/Customizer";

class GullLayout extends Component {
  state = {};

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
    }
  }
  componentDidMount() {
    this.initAppDirection();
  }

  initAppDirection = () => {
    let { settings } = this.props;
    setTimeout(() => {
      document.documentElement.setAttribute("dir", settings.dir);
    });
  };

  render() {
    let { activeLayout, route, settings } = this.props;
    let Layout = GullLayouts[activeLayout];
    return (
      <Suspense>
        <React.Fragment>
          <Layout routes={route.routes}></Layout>
          {settings.customizer.show && <Customizer></Customizer>}
        </React.Fragment>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  settings: state.layout.settings,
  activeLayout: state.layout.settings.activeLayout,
  defaultSettings: state.layout.defaultSettings,
});

GullLayout.contextType = AppContext;

export default withRouter(
  connect(mapStateToProps, { setLayoutSettings, setDefaultSettings })(
    GullLayout
  )
);
