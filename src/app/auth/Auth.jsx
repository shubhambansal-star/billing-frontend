import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { setUserData } from "../redux/actions/UserActions";
import { logoutUser } from "app/redux/actions/UserActions";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
class Auth extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.props.setUserData(localStorageService.getItem("auth_user"));
    if(localStorageService.getItem("jwt_token")===undefined || localStorageService.getItem("jwt_token")===null){
      this.props.logoutUser()
    }else{
      this.checkJwtAuth();
    }
  }

  checkJwtAuth = () => {
    jwtAuthService.loginWithToken()
    .then((user) => {
      if(user===undefined){
        this.props.logoutUser()
      }
      this.props.setUserData(user)
      }
    )
  };

  render() {
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

const mapStateToProps = state => ({
  setUserData: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  login: state.login
});

export default connect(mapStateToProps, { setUserData, logoutUser })(Auth);
