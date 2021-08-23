import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const AuthSellerWrapper = ({
  children,
  auth: { isAuthenticated, loading },
}) => {
  const router = useRouter();
  const { purpose } = router.query;
  const [hash, setHash] = useState(purpose);
  useEffect(() => {
    isAuthenticated && !loading && router.push("/seller/dashboard");
    setHash(purpose);
  }, [hash, isAuthenticated]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  auth: state.authSeller,
});

export default connect(mapStateToProps, null)(AuthSellerWrapper);
