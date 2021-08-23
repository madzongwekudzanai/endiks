import { Fragment, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";

const PrivateFreightRoute = ({
  children,
  authCargo: { isAuthenticated, loading },
}) => {
  useEffect(() => {
    !isAuthenticated && !loading && Router.push("/");
  }, [isAuthenticated, loading]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  authCargo: state.authCargo,
});

export default connect(mapStateToProps, null)(PrivateFreightRoute);
