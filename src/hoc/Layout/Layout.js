import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Auxx/Auxx";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [sideDrawerIsVisble, setSideDrawerIsVisble] = useState(false);
  // state = {
  //     showSideDrawer: false
  // }

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisble(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisble(!sideDrawerIsVisble);
  };
  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisble}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(layout);
