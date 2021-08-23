const logo_light = "/coverimages/logo_light.png";
import Link from "next/link";
import HeaderCartContent from "./HeaderCartContent";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { logout } from "../../../actions/auth";
import { logoutSeller } from "../../../actions/authSeller";
import { logoutFreight } from "../../../actions/authCargo";
import { Fragment } from "react";
import UserButton from "../UserButton";
import TopHeader from "./TopHeader";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const HeaderMobile = ({
  auth: { isAuthenticated, cartItems },
  logout,
  logoutSeller,
  logoutFreight,
  authSeller,
  authCargo,
  t,
}) => {
  const router = useRouter();
  return (
    <Fragment>
      <header
        className="header header--mobile electronic"
        id="mobileHeader"
        data-sticky="true"
      >
        {authSeller.isAuthenticated || authCargo.isAuthenticated ? null : <TopHeader />}
        <div className="navigation--mobile">
          <div className="navigation__left">
            <Link href={authSeller.isAuthenticated ? "/seller/dashboard" : authCargo.isAuthenticated ? "/freight/dashboard" : "/"}>
              <a className="ps-logo">
                <img src={logo_light} alt="Logo" />
              </a>
            </Link>
          </div>
          <div className="navigation__right">
            <div className="header__actions">
              {!authSeller.isAuthenticated ? (
                <div className="ps-cart--mini">
                  {isAuthenticated ? (
                    <Link href="/shop/cart">
                      <a className="header__extra">
                        <i className="lnr lnr-cart"></i>
                        <span>
                          <i>{cartItems.length}</i>
                        </span>
                      </a>
                    </Link>
                  ) : (
                    <Link href="/user/sign-in">
                      <a className="header__extra">
                        <i className="lnr lnr-cart"></i>
                        <span>
                          <i>{cartItems.length}</i>
                        </span>
                      </a>
                    </Link>
                  )}
                  <HeaderCartContent scroll={true} />
                </div>
              ) : null}
              <div className="ps-block--user-header">
                <UserButton />
                <div className="ps-block__right">
                  {isAuthenticated ? (
                    <a
                      className="logout white-links"
                      onClick={() => {
                        logout(t("logout-success"));
                      }}
                    >
                      {t("logout")}
                    </a>
                  ) : authSeller.isAuthenticated ? (
                    <a
                      className="logout white-links"
                      onClick={() => {
                        logoutSeller(t("logout-success"));
                      }}
                    >
                      {t("logout")}
                    </a>
                  ) : authCargo.isAuthenticated ? (
                    <a
                      className="logout white-links"
                      onClick={() => {
                        logoutFreight(t("logout-success"));
                      }}
                    >
                      {t("logout")}
                    </a>
                  ) : router.pathname === "/freight/auth/[purpose]" ? (
                    <Fragment>
                      <Link href="/freight/auth/sign-in">
                        <a className="white-links">{t("login")}</a>
                      </Link>
                      <Link href="/freight/auth/register">
                        <a className="white-links">{t("register")}</a>
                      </Link>
                    </Fragment>
                  ) : router.pathname === "/seller/auth/[purpose]" ? (
                    <Fragment>
                      <Link href="/seller/auth/sign-in">
                        <a className="white-links">{t("login")}</a>
                      </Link>
                      <Link href="/seller/auth/register">
                        <a className="white-links">{t("register")}</a>
                      </Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Link href="/user/sign-in">
                        <a className="white-links">{t("login")}</a>
                      </Link>
                      <Link href="/user/register">
                        <a className="white-links">{t("register")}</a>
                      </Link>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  authSeller: state.authSeller,
  authCargo: state.authCargo
});

export default compose(
  connect(mapStateToProps, { logout, logoutSeller, logoutFreight }),
  withTranslation("common")
)(HeaderMobile);
