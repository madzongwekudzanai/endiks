import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const AuthFreightWrapper = ({
  children,
  auth: { isAuthenticated, loading },
}) => {
  const router = useRouter();
  const { purpose } = router.query;
  const [hash, setHash] = useState(purpose);
  useEffect(() => {
    isAuthenticated && !loading && router.push("/freight/dashboard");
    setHash(purpose);
  }, [hash, isAuthenticated]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  auth: state.authCargo,
});

export default connect(mapStateToProps, null)(AuthFreightWrapper);
