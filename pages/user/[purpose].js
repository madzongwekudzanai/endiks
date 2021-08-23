import { Fragment } from "react";
import { useRouter } from "next/router";
import Breadcrumb from "../../components/layout/Breadcrumb";
import Layout from "../../components/layout/Layout";
import Link from "next/link";
import SignUp from "../../components/auth/user/SignUp";
import SignIn from "../../components/auth/user/SignIn";
import ForgotPassword from "../../components/auth/user/ForgotPassword";
import ResetPassword from "../../components/auth/user/ResetPassword";
import { withTranslation } from "../../i18n";
import AuthUserWrapper from "../../components/routing/AuthUserWrapper";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";

const Account = ({ t }) => {
  const router = useRouter();
  const { purpose } = router.query;
  return (
    <Layout title={t("user-account")} description={t("register-login")}>
      <AuthFreightWrapper>
        <AuthSellerWrapper>
        <AuthUserWrapper>
          <div className="ps-page--my-account">
            <Breadcrumb
              page={t("user-account")}
              pages={[
                {
                  text: t("home"),
                  location: "/",
                },
              ]}
            />
            <div className="ps-my-account">
              <div className="container">
                <div className="ps-form--account ps-tab-root">
                  <ul className="ps-tab-list">
                    {purpose === "forgot-password" ? (
                      <li
                        className={
                          purpose === "forgot-password" ? "active" : null
                        }
                      >
                        <a>{t("forgot-password")}</a>
                      </li>
                    ) : purpose === "reset-password" ? (
                      <li
                        className={purpose === "reset-password" ? "active" : null}
                      >
                        <a>{t("reset-password")}</a>
                      </li>
                    ) : (
                      <Fragment>
                        <li className={purpose === "sign-in" ? "active" : null}>
                          <Link href="/user/sign-in">
                            <a>{t("log-in")}</a>
                          </Link>
                        </li>
                        <li className={purpose === "register" ? "active" : null}>
                          <Link href="/user/register">
                            <a>{t("register")}</a>
                          </Link>
                        </li>
                      </Fragment>
                    )}
                  </ul>
                  <div className="ps-tabs">
                    <div
                      className={`ps-tab ${
                        purpose === "sign-in" ? "active" : null
                      }`}
                    >
                      <SignIn />
                      {/* <div className="ps-form__footer">
                      <p>Connect with:</p>
                      <ul className="ps-list--social">
                        <li>
                          <Link href="#">
                            <a className="facebook">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className="google">
                              <i className="fa fa-google-plus"></i>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className="twitter">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className="instagram">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                    </div>
                    <div
                      className={`ps-tab ${
                        purpose === "forgot-password" ? "active" : null
                      }`}
                    >
                      <ForgotPassword user="user" api="/api/auth-user/forgot" />
                    </div>
                    <div
                      className={`ps-tab ${
                        purpose === "reset-password" ? "active" : null
                      }`}
                    >
                      <ResetPassword
                        user="user"
                        path="auth-user"
                        red="/user/sign-in"
                      />
                    </div>
                    <div
                      className={`ps-tab ${
                        purpose === "register" ? "active" : null
                      }`}
                    >
                      <SignUp user="user" api="/api/users" />
                      {/* <div className="ps-form__footer">
                      <p>Connect with:</p>
                      <ul className="ps-list--social">
                        <li>
                          <Link href="#">
                            <a className="facebook">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className="google">
                              <i className="fa fa-google-plus"></i>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className="twitter">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <a className="instagram">
                              <i className="fa fa-instagram"></i>
                            </a>
                          </Link>
                        </li>
                      </ul>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AuthUserWrapper>
        </AuthSellerWrapper>
      </AuthFreightWrapper>
    </Layout>
  );
};

Account.getInitialProps = async () => ({
  namespacesRequired: ["auth"],
});

export default withTranslation("auth")(Account);
