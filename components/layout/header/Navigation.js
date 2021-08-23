import Link from "next/link";
const en = "/coverimages/en.png";
// import RecentViews from "./RecentViews";
import { connect } from "react-redux";
import SingleCategory from "./SingleCategory";
import SellerNavigationRight from "./SellerNavigationRight";
import { Fragment, useEffect, useState } from "react";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";
import FreightNavigationRight from "./FreightNavigationRight";

const Navigation = ({
  product: { categories, loadingCategories },
  authSeller: { isAuthenticated, seller },
  language: { loc },
  authCargo,
  t,
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc])
  return (
    <Fragment>
      {isAuthenticated || authCargo.isAuthenticated ? (
        <nav className="navigation">
          <div className="container">
            <div className="navigation__left">
              {isAuthenticated && seller ? (
                <div className="menu--product-categories">
                  <div className="menu__toggle active">
                    <i className="lnr lnr-store white-links"></i>
                    <span className="white-links"> {seller.tradeName}</span>
                  </div>
                </div>
              ) : (authCargo.isAuthenticated && authCargo.freight) ? (
                <div className="menu--product-categories">
                  <div className="menu__toggle active">
                    <i className="lnr lnr-rocket white-links"></i>
                    <span className="white-links"> {authCargo.freight.tradeName}</span>
                  </div>
                </div>
              ) : (
                <div className="menu--product-categories">
                  <div className="menu__toggle active">
                    <i className="lnr lnr-menu white-links"></i>
                    <span className="white-links">
                      {" "}
                      {t("shop-by-department")}
                    </span>
                  </div>
                  <div className="menu__content">
                    <ul className="menu--dropdown">
                      {loadingCategories ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">{t("loading")}</span>
                        </div>
                      ) : (
                        <SingleCategory categories={categories} />
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {isAuthenticated ? (
              <SellerNavigationRight />
            ) : authCargo.isAuthenticated ? (
              <FreightNavigationRight />
            ) : (
              <div className="navigation__right">
                <ul className="menu menu--recent-view">
                  <li className="menu-item-has-children">
                    <Link href="/shop/orders">
                      <a> {t("view-your-orders")} </a>
                    </Link>
                  </li>
                </ul>
                <ul className="navigation__extra">
                  <li>
                    <Link href="/business/become-a-seller">
                      <a>{t("sell-on-endiks")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop/tracking">
                      <a>{t("track-your-order")}</a>
                    </Link>
                  </li>
                  <li>
                    <div className="ps-dropdown">
                      <a>
                        {t("us-dollar")}{" "}
                        {/* <i className="lnr lnr-chevron-down headDrop"></i> */}
                      </a>
                      {/* <ul className="ps-dropdown-menu">
                      <li>
                        <Link href="#">
                          <a>Us Dollar</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>Euro</a>
                        </Link>
                      </li>
                    </ul> */}
                    </div>
                  </li>
                  <li>
                    <div className="ps-dropdown language">
                      <a>
                        <img src={en} alt="" />
                        English
                      </a>
                      {/* <ul className="ps-dropdown-menu">
                      <li>
                        <Link href="#">
                          <a>
                            <img src={germany} alt="" /> Germany
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <a>
                            <img src={fr} alt="" /> France
                          </a>
                        </Link>
                      </li>
                    </ul> */}
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className="navigation">
          <div className="container">
            <ul className="menu menu--electronic">
              {loadingCategories ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">{t("loading")}</span>
                </div>
              ) : (
                <Fragment>
                  {categories.map(({ _id, category }) => (
                    <li key={_id}>
                      <a>{category[locale]}</a>
                    </li>
                  ))}
                </Fragment>
              )}
            </ul>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  authSeller: state.authSeller,
  authCargo: state.authCargo,
  language: state.language
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("common")
)(Navigation);
