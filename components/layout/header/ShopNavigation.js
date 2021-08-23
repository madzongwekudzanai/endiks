import HeaderCartContent from "./HeaderCartContent";
import Link from "next/link";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { logoutSeller } from "../../../actions/authSeller";
import { logoutFreight } from "../../../actions/authCargo";
import { Fragment } from "react";
import UserButton from "../UserButton";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";

const ShopNavigation = ({
  title,
  auth: { isAuthenticated, cartItems },
  logout,
  logoutSeller,
  authSeller,
  logoutFreight,
  authCargo,
  t,
}) => {
  return (
    <nav className="navigation--mobile">
      <div className="navigation__left">
        <Link href={authSeller.isAuthenticated ? "/seller/dashboard" : "/"}>
          <a className="header__back white-links">
            <i className="lnr lnr-chevron-left white-links"></i>
            <strong>{title}</strong>
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
                    <i className="lnr lnr-cart white-links"></i>
                    <span>
                      <i>{cartItems.length}</i>
                    </span>
                  </a>
                </Link>
              ) : (
                <Link href="/user/sign-in">
                  <a className="header__extra">
                    <i className="lnr lnr-cart white-links"></i>
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
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  authSeller: state.authSeller,
  authCargo: state.authCargo
});

export default compose(
  connect(mapStateToProps, { logout, logoutSeller, logoutFreight }),
  withTranslation("header")
)(ShopNavigation);
