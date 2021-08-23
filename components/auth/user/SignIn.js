import { useState, Fragment } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { login } from "../../../actions/auth";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const SignIn = ({ auth: { loading }, login, formLoading, t }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="ps-form__content">
      <h5>{t("login-title")}</h5>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            disabled={loading || formLoading ? true : false}
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
            disabled={loading || formLoading ? true : false}
            className="form-control"
            type="password"
            required
            onChange={(e) => {
              onChange(e);
            }}
            value={password}
            name="password"
            minLength="8"
            placeholder={t("password")}
          />
          <Link href="/user/forgot-password">
            <a>{t("forgot")}</a>
          </Link>
        </div>
        {/* <div className="form-group">
                      <div className="ps-checkbox">
                        <input
                          className="form-control"
                          type="checkbox"
                          id="remember-me"
                          name="remember-me"
                        />
                        <label htmlFor="remember-me">Remember me</label>
                      </div>
                    </div> */}
        <div className="form-group submtit">
          <button
            disabled={loading || formLoading ? true : false}
            type="submit"
            className="ps-btn ps-btn--fullwidth"
          >
            {loading || formLoading ? (
              <Fragment>
                <span
                  className="spinner-border"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                {t("loading")}
              </Fragment>
            ) : (
              <Fragment>{t("login-text")}</Fragment>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  formLoading: state.formLoading.formLoading,
});

export default compose(
  connect(mapStateToProps, { login }),
  withTranslation("auth")
)(SignIn);
