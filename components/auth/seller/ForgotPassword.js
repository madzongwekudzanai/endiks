import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import axios from "axios";
import Router from "next/router";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const ForgotPassword = ({ setAlert, language: { loc }, t }) => {
  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });
  const { email, phone } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const obj = {};
      obj.email = email;
      obj.phone = phone;
      obj.loc = loc;
      const user = await axios.post(
        authType === "email"
          ? "/api/auth-seller/forgot/email"
          : "/api/auth-seller/forgot/phone",
        obj,
        config
      );
      setLoading(false);
      setAlert(
        authType === "email" ? t("password-reset-link") : t("forgot-password-message"),
        "success",
        10000
      );
      setFormData({
        ...formData,
        email: "",
        phone: "",
      });
      if (authType === "phone number" && typeof window !== "undefined") {
        localStorage.setItem("verificationCode", user.data.code);
        localStorage.setItem("verificationToken", user.data.token);
        Router.push("/seller/auth/verification-code");
      }
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
          <select
            className="form-control"
            required
            name="authType"
            onChange={(e) => {
              setAuthType(e.target.value);
            }}
            disabled={loading}
            value={authType}
          >
            <option value="" disabled selected>
              {t("what-auth")}
            </option>
            <option value="email">{t("email-address")}</option>
            <option value="phone number">{t("phone-number")}</option>
          </select>
        </div>
        <div className="form-group">
          {authType === "email" ? (
            <input
              disabled={loading}
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
          ) : authType === "phone number" ? (
            <input
              disabled={loading}
              className="form-control"
              type="tel"
              required
              onChange={(e) => {
                onChange(e);
              }}
              value={phone}
              name="phone"
              placeholder={t("phone-number")}
            />
          ) : null}
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

const mapStateToProps = (state) => ({
  language: state.language,
});

export default compose(
  connect(mapStateToProps, { setAlert }),
  withTranslation("auth")
)(ForgotPassword);
