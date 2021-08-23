import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { verifyUser } from "../../actions/auth";
import { withTranslation } from "../../i18n";
import { compose } from "redux";

const LandingWrapper = ({ children, verifyUser, t }) => {
  const router = useRouter();
  const { token } = router.query;
  useEffect(() => {
    if (!token) {
      return;
    }
    verifyUser(token, t("verify-success"));
  }, [token]);
  return <Fragment>{children}</Fragment>;
};

export default compose(
  connect(null, {
    verifyUser,
  }),
  withTranslation("common")
)(LandingWrapper);