import { Fragment, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
  useEffect(() => {
    !isAuthenticated && !loading && Router.push("/user/sign-in");
  }, [isAuthenticated]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(PrivateRoute);
