import { Fragment } from "react";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { withTranslation } from "../../../i18n";
import SignUp from "../../../components/auth/seller/SignUp";
import SignIn from "../../../components/auth/seller/SignIn";
import ForgotPassword from "../../../components/auth/seller/ForgotPassword";
import VerificationCode from "../../../components/auth/seller/VerificationCode";
import ResetPassword from "../../../components/auth/user/ResetPassword";
import AuthSellerWrapper from "../../../components/routing/AuthSellerWrapper";
import AuthUserWrapper from "../../../components/routing/AuthUserWrapper";
import AuthFreightWrapper from "../../../components/routing/AuthFreightWrapper";

const Account = ({ t }) => {
  const router = useRouter();
  const { purpose } = router.query;
  return (
    <Layout title={t("seller-account")} description={t("register-login")}>
      <AuthFreightWrapper>
        <AuthUserWrapper>
          <AuthSellerWrapper>
            <div className="ps-page--my-account">
              <Breadcrumb
                page={t("seller-account")}
                pages={[
                  {
                    text: t("home"),
                    location: "/",
                  },
                ]}
              />
              <div className="ps-my-account">
                <div
                  className="container"
                >
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
                      ) : purpose === "verification-code" ? (
                        <li
                          className={
                            purpose === "verification-code" ? "active" : null
                          }
                        >
                          <a>{t("verification-code")}</a>
                        </li>
                      ) : (
                        <Fragment>
                          <li className={purpose === "sign-in" ? "active" : null}>
                            <Link href="/seller/auth/sign-in">
                              <a>{t("log-in")}</a>
                            </Link>
                          </li>
                          <li className={purpose === "register" ? "active" : null}>
                            <Link href="/seller/auth/register">
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
                      </div>
                      <div
                        className={`ps-tab ${
                          purpose === "forgot-password" ? "active" : null
                        }`}
                      >
                        <ForgotPassword
                          user="seller"
                          api="/api/auth-seller/forgot"
                        />
                      </div>
                      <div
                        className={`ps-tab ${
                          purpose === "verification-code" ? "active" : null
                        }`}
                      >
                        <VerificationCode />
                      </div>
                      <div
                        className={`ps-tab ${
                          purpose === "reset-password" ? "active" : null
                        }`}
                      >
                        <ResetPassword
                          user="seller"
                          path="auth-seller"
                          red="/seller/auth/sign-in"
                        />
                      </div>
                      <div
                        className={`ps-tab ${
                          purpose === "register" ? "active" : null
                        }`}
                      >
                        <SignUp user="seller" api="/api/sellers" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AuthSellerWrapper>
        </AuthUserWrapper>
      </AuthFreightWrapper>
    </Layout>
  );
};

Account.getInitialProps = async () => ({
  namespacesRequired: ["auth"],
});

export default withTranslation("auth")(Account);
