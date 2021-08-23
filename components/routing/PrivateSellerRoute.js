import { Fragment, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";

const PrivateSellerRoute = ({
  children,
  authSeller: { isAuthenticated, loading },
}) => {
  useEffect(() => {
    !isAuthenticated && !loading && Router.push("/");
  }, [isAuthenticated, loading]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  authSeller: state.authSeller,
});

export default connect(mapStateToProps, null)(PrivateSellerRoute);
