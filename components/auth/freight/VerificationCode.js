import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import { compose } from "redux";
import Router from "next/router";
import { withTranslation } from "../../../i18n";

const VerificationCode = ({ setAlert, t }) => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [verificationCode, setVerificationCode] = useState(
    typeof window !== "undefined" && localStorage.getItem("verificationCode")
  );
  const [verificationToken, setVerificationToken] = useState(
    typeof window !== "undefined" && localStorage.getItem("verificationToken")
  );
  const onChange = (e) => {
    setCode(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (code === verificationCode && typeof window !== "undefined") {
      Router.push(`/freight/auth/reset-password?token=${verificationToken}`);
      localStorage.removeItem("verificationCode");
      setVerificationCode("");
      localStorage.removeItem("verificationToken");
      setVerificationToken("");
      setLoading(false);
    } else if (code !== verificationCode) {
      setAlert(t("invalid-code"), "warning");
      setLoading(false);
    }
  };

  return (
    <div className="ps-form__content">
      <h5>{t("verification-code-title")}</h5>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <input
            disabled={loading}
            className="form-control"
            type="number"
            required
            onChange={(e) => {
              onChange(e);
            }}
            step="1"
            min="1"
            value={code}
            name="code"
            placeholder={t("verification-code")}
          />
        </div>
        <div className="form-group submtit">
          <button
            disabled={loading}
            type="submit"
            className="ps-btn ps-btn--fullwidth"
          >
            {loading ? (
              <Fragment>
                <span
                  className="spinner-border"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                {t("loading")}
              </Fragment>
            ) : (
              <Fragment>{t("forgot-password-text")}</Fragment>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default compose(
  connect(null, { setAlert }),
  withTranslation("auth")
)(VerificationCode);
