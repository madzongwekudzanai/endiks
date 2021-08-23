import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import axios from "axios";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const ForgotPassword = ({ setAlert, api, t }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const user = await axios.post(
        api,
        {
          email,
        },
        config
      );
      setLoading(false);
      setAlert(t("password-reset-link"), "success", 10000);
      setEmail("");
    } catch (err) {
      setLoading(false);
      setAlert(err.response.data, "danger");
    }
  };

  return (
    <div className="ps-form__content">
      <h5>{t("forgot-password-title")}</h5>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <input
            disabled={loading ? true : false}
            className="form-control"
            type="email"
            required
            onChange={(e) => {
              onChange(e);
            }}
            value={email}
            name="email"
            placeholder={t("email-address")}
          />
        </div>
        <div className="form-group submtit">
          <button
            disabled={loading ? true : false}
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
)(ForgotPassword);
