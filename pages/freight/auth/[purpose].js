import { Fragment } from "react";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { withTranslation } from "../../../i18n";
import SignUp from "../../../components/auth/freight/SignUp";
import SignIn from "../../../components/auth/freight/SignIn";
import ForgotPassword from "../../../components/auth/freight/ForgotPassword";
import VerificationCode from "../../../components/auth/freight/VerificationCode";
import ResetPassword from "../../../components/auth/user/ResetPassword";
import AuthFreightWrapper from "../../../components/routing/AuthFreightWrapper";
import AuthSellerWrapper from "../../../components/routing/AuthSellerWrapper";
import AuthUserWrapper from "../../../components/routing/AuthUserWrapper";

const Account = ({ t }) => {
  const router = useRouter();
  const { purpose } = router.query;
  return (
    <Layout title={t("freight-cargo-account")} description={t("register-login")}>
      <AuthUserWrapper>
        <AuthSellerWrapper>
          <AuthFreightWrapper>
            <div className="ps-page--my-account">
              <Breadcrumb
                page={t("freight-cargo-account")}
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
                            <Link href="/freight/auth/sign-in">
                              <a>{t("log-in")}</a>
                            </Link>
                          </li>
                          <li className={purpose === "register" ? "active" : null}>
                            <Link href="/freight/auth/register">
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
                          user="freight"
                          api="/api/auth-freight/forgot"
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
                          user="freight"
                          path="auth-freight"
                          red="/freight/auth/sign-in"
                        />
                      </div>
                      <div
                        className={`ps-tab ${
                          purpose === "register" ? "active" : null
                        }`}
                      >
                        <SignUp user="freight" api="/api/freights" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AuthFreightWrapper>
        </AuthSellerWrapper>
      </AuthUserWrapper>
    </Layout>
  );
};

Account.getInitialProps = async () => ({
  namespacesRequired: ["auth"],
});

export default withTranslation("auth")(Account);
