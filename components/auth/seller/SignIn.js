import { useState, Fragment, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { verifySeller } from "../../../actions/authSeller";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";
import { login } from "../../../actions/authSeller";

const SignIn = ({
  authSeller: { loading },
  login,
  language: { loc },
  verifySeller,
  formLoading,
  t,
}) => {
  const router = useRouter();
  const { sellerToken } = router.query;
  useEffect(() => {
    if (!sellerToken) {
      return;
    }
    verifySeller(sellerToken, router);
  }, [sellerToken]);
  const [authType, setAuthType] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const { email, password, phone } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {};
    obj.email = email;
    obj.password = password;
    obj.phone = phone;
    obj.loc = loc;
    login(obj, authType);
  };
  return (
    <div className="ps-form__content">
      <h5>{t("login-title")}</h5>
      <form onSubmit={(e) => onSubmit(e)}>
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
              {t("login-type-selection")}
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
          <Link href="/seller/auth/forgot-password">
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
            type={loading || formLoading ? "button" : "submit"}
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
  authSeller: state.authSeller,
  formLoading: state.formLoading.formLoading,
  language: state.language,
});

export default compose(
  connect(mapStateToProps, { login, verifySeller }),
  withTranslation("auth")
)(SignIn);
