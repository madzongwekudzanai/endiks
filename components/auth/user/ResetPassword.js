import { useState, Fragment } from "react";
import { connect } from "react-redux";
import Router, { useRouter } from "next/router";
import { setAlert } from "../../../actions/alert";
import axios from "axios";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const ResetPassword = ({ setAlert, path, red, t, language: { loc } }) => {
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;
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
        obj.password = password;
        obj.loc = loc;
        await axios.post(
          `/api/${path}/reset-password/${token}`,
          obj,
          config
        );
        setLoading(false);
        setAlert(t("password-reset-success"), "success", 10000);
        setFormData({
          ...formData,
          password: "",
          password2: "",
        });
        Router.push(red);
      } catch (err) {
        setLoading(false);
        setAlert(err.response.data, "danger");
      }
    }
  };

  return (
    <div className="ps-form__content">
      <h5>{t("change-password-title")}</h5>
      <form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className="form-group form-forgot">
          <input
            disabled={loading ? true : false}
            className="form-control"
            type={showP1 ? "text" : "password"}
            required
            onChange={(e) => {
              onChange(e);
            }}
            value={password}
            name="password"
            minLength="8"
            placeholder={t("new-password")}
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
            disabled={loading ? true : false}
            className="form-control"
            type={showP2 ? "text" : "password"}
            required
            onChange={(e) => {
              onChange(e);
            }}
            value={password2}
            name="password2"
            minLength="8"
            placeholder={t("confirm-new-password")}
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
              <Fragment>{t("change-password-text")}</Fragment>
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
)(ResetPassword);
