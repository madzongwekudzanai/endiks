import Link from "next/link";
import { connect } from "react-redux";
import { logoutSeller } from "../../../actions/authSeller";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";

const SellerNavigationRight = ({
  authSeller: { isAuthenticated, seller },
  logoutSeller,
  t,
}) => {
  return (
    <div className="navigation__right">
      <ul className="menu">
        <li className="current-menu-item menu-item-has-children">
          <Link href="/seller/dashboard">
            <a className="white-links">{t("dashboard")}</a>
          </Link>
        </li>
        <li className="menu-item-has-children has-mega-menu">
          <Link
            href={`/seller/dashboard?page=products&store_id=${
              seller && seller._id
            }&page_number=1`}
          >
            <a className="white-links">{t("products")}</a>
          </Link>
        </li>
        <li className="menu-item-has-children has-mega-menu">
          <Link href="/seller/dashboard?page=orders">
            <a className="white-links">{t("orders")}</a>
          </Link>
        </li>
        <li className="menu-item-has-children has-mega-menu">
          <Link href="/seller/products/add-product">
            <a className="white-links">{t("add-product")}</a>
          </Link>
        </li>
        <li className="menu-item-has-children has-mega-menu">
          <Link href="/seller/products/add-product?quantity=multiple">
            <a className="white-links">{t("add-multiple-products")}</a>
          </Link>
        </li>
      </ul>
      {isAuthenticated ? (
        <div
          onClick={() => {
            logoutSeller(t("logout-success"));
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
  authSeller: state.authSeller,
});

export default compose(
  connect(mapStateToProps, { logoutSeller }),
  withTranslation("common")
)(SellerNavigationRight);
