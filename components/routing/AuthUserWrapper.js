import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const AuthUserWrapper = ({ children, auth: { isAuthenticated, loading } }) => {
  const router = useRouter();
  const { purpose } = router.query;
  const [hash, setHash] = useState(purpose);
  useEffect(() => {
    setHash(purpose);
    if (isAuthenticated && !loading) {
      purpose === "reset-password" ? router.push("/") : router.back();
    }
  }, [hash, isAuthenticated]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AuthUserWrapper);
