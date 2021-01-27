import React, { useEffect } from "react";

import { Redirect } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

const logout = (props) => {
  const {onLogout}= props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapToDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapToDispatchToProps)(logout);
