import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import axios from "axios";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";
import Router from "next/router";

const SignUp = ({
  language: { loc },
  setAlert,
  t,
}) => {
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authType, setAuthType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2, phone } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== password2) {
      setLoading(false);
      setAlert(t("passwords-don-match"), "danger", 10000);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const obj = {};
        obj.name = name;
        obj.email = email;
        obj.password = password;
        obj.password2 = password2;
        obj.phone = phone;
        obj.loc = loc;
        await axios.post(
          authType === "email" ? "/api/freights/email" : "/api/freights/phone",
          obj,
          config
        );
        setLoading(false);
        setAlert(t("registration-success"), "success", 10000);
        setFormData({
          ...formData,
          name: "",
          email: "",
          phone: "",
          password: "",
          password2: "",
        });
        Router.push("/freight/auth/sign-in");
      } catch (err) {
        console.log(err);
        setLoading(false);
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
        setAlert(err.response.data, "danger");
      }
    }
  };

  return (
    <div className="ps-form__content">
      <h5>{t("register-title")}</h5>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group">
          <input
            disabled={loading}
            className="form-control"
            type="text"
            onChange={(e) => {
              onChange(e);
            }}
            required
            value={name}
            name="name"
            placeholder={t("name")}
          />
        </div>
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
              {t("auth-type-selection")}
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
        <div className="form-group form-forgot">
          <input
            disabled={loading}
            className="form-control"
            type={showP1 ? "text" : "password"}
            required
            onChange={(e) => {
              onChange(e);
            }}
            value={password}
            name="password"
            minLength="8"
            placeholder={t("password")}
          />
          <a onClick={() => setShowP1(!showP1)} className="eye">
            {showP1 ? (
              <i className="far fa-eye-slash"></i>
            ) : (
              <i className="far fa-eye"></i>
            )}
          </a>
        </div>
        <div className="form-group form-forgot">
          <input
            disabled={loading}
            className="form-control"
            type={showP2 ? "text" : "password"}
            required
            onChange={(e) => {
              onChange(e);
            }}
            value={password2}
            name="password2"
            minLength="8"
            placeholder={t("confirm-password")}
          />
          <a onClick={() => setShowP2(!showP2)} className="eye">
            {showP2 ? (
              <i className="far fa-eye-slash"></i>
            ) : (
              <i className="far fa-eye"></i>
            )}
          </a>
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
              <Fragment>{t("register-text")}</Fragment>
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
)(SignUp);
