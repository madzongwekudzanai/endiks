import Link from "next/link";
import { connect } from "react-redux";
import { logoutFreight } from "../../../actions/authCargo";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const FreightNavigationRight = ({
  authCargo: { isAuthenticated },
  logoutFreight,
  t,
}) => {
  return (
    <div className="navigation__right">
      <ul className="menu">
        <li className="current-menu-item menu-item-has-children">
          <Link href="/freight/dashboard">
            <a className="white-links">{t("dashboard")}</a>
          </Link>
        </li>
        <li className="menu-item-has-children has-mega-menu">
          <Link href="/freight/dashboard?page=orders">
            <a className="white-links">{t("orders")}</a>
          </Link>
        </li>
        <li className="menu-item-has-children has-mega-menu">
          <Link href="/freight/dashboard?page=destinations">
            <a className="white-links">{t("destinations")}</a>
          </Link>
        </li>
        <li className="menu-item-has-children has-mega-menu">
          <Link href="/freight/destinations/add-destination">
            <a className="white-links">{t("add-destination")}</a>
          </Link>
        </li>
      </ul>
      {isAuthenticated ? (
        <div
          onClick={() => {
            logoutFreight(t("logout-success"));
          }}
          className="ps-block--header-hotline inline pointer-cursor"
        >
          <p className="white-links">
            <i className="lnr lnr-exit white-links"></i>
            <strong className="white-links"> {t("logout")}</strong>
          </p>
        </div>
      ) : (
        <div className="ps-block--header-hotline inline">
          <p className="white-links">
            <i className="fab fa-weixin white-links"></i>
            {t("we-chat")}:
            <strong className="white-links"> +263788928021</strong>
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  authCargo: state.authCargo,
});

export default compose(
  connect(mapStateToProps, { logoutFreight }),
  withTranslation("common")
)(FreightNavigationRight);
