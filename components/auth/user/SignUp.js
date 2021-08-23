import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";
import axios from "axios";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const SignUp = ({ setAlert, t, api }) => {
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
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
        await axios.post(api, formData, config);
        setLoading(false);
        setAlert(t("registration-success-user"), "success", 10000);
        setFormData({
          ...formData,
          name: "",
          email: "",
          password: "",
          password2: "",
        });
      } catch (err) {
        setLoading(false);
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => setAlert(error.msg, "danger"));
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

export default compose(
  connect(null, { setAlert }),
  withTranslation("auth")
)(SignUp);
