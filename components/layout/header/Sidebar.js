import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Cart from "../panelSidebar/Cart";
import Categories from "../panelSidebar/Categories";
import Search from "../panelSidebar/Search";
import { compose } from "redux";
import User from "../panelSidebar/User";
import { withTranslation } from "../../../i18n";

const Sidebar = ({ auth: { isAuthenticated }, authSeller, authCargo, shopLoading: { pageLoading }, t }) => {
  const router = useRouter();
  const { navigation } = router.query;
  const [bar, setBar] = useState(navigation);
  useEffect(() => {
    setBar(navigation);
  }, [navigation]);
  if (pageLoading) {
    return (null)
  }
  return (
    <Fragment>
      <Cart />
      <Categories />
      <div className="navigation--list">
        {authSeller.seller && authSeller.isAuthenticated ? (
          <div className="navigation__content">
            <Link href="/seller/dashboard">
              <a className="navigation__item ps-toggle--sidebar">
                <i className="lnr lnr-home"></i>
                <span> {t("home")}</span>
              </a>
            </Link>
            <Link
              href={`/seller/dashboard?page=products&store_id=${authSeller.seller._id}&page_number=1`}
            >
              <a className="navigation__item ps-toggle--sidebar">
                <i className="lnr lnr-list"></i>
                <span> {t("products")}</span>
              </a>
            </Link>
            <Link href="/seller/dashboard?page=orders">
              <a className="navigation__item ps-toggle--sidebar">
                <i className="lnr lnr-layers"></i>
                <span> {t("orders")}</span>
              </a>
            </Link>
            <Link
              href={`/seller/store?store_id=${authSeller.seller._id}&page_number=1`}
            >
              <a className="navigation__item ps-toggle--sidebar">
                <i className="lnr lnr-store"></i>
                <span> {t("store")}</span>
              </a>
            </Link>
          </div>
        ) : authCargo.freight && authCargo.isAuthenticated ? (
          <div className="navigation__content">
            <Link href="/freight/dashboard">
              <a className="navigation__item ps-toggle--sidebar">
                <i className="lnr lnr-home"></i>
                <span> {t("home")}</span>
              </a>
            </Link>
            <Link
              href={`/freight/dashboard?page=destinations`}
            >
              <a className="navigation__item ps-toggle--sidebar">
                <i className="lnr lnr-list"></i>
                <span> {t("destinations")}</span>
              </a>
            </Link>
            <Link href="/freight/dashboard?page=orders">
              <a className="navigation__item ps-toggle--sidebar">
                <i className="lnr lnr-layers"></i>
                <span> {t("orders")}</span>
              </a>
            </Link>
          </div>
        ) : (
          <div className="navigation__content">
            <Link href="/?navigation=home">
              <a
                className={`navigation__item ps-toggle--sidebar ${
                  bar === "home" ? "active" : null
                }`}
              >
                <i
                  onClick={() => {
                    setBar("home");
                  }}
                  className="lnr lnr-home"
                ></i>
                <span> {t("home")}</span>
              </a>
            </Link>
            <Link
              href={bar === "mobile" ? router.pathname : "?navigation=mobile"}
            >
              <a
                className={`navigation__item ps-toggle--sidebar ${
                  bar === "mobile" ? "active" : null
                }`}
              >
                <i
                  onClick={() => {
                    setBar("mobile");
                  }}
                  className="lnr lnr-list"
                ></i>
                <span> {t("categories")}</span>
              </a>
            </Link>
            <Link
              href={bar === "search" ? router.pathname : "?navigation=search"}
            >
              <a
                className={`navigation__item ps-toggle--sidebar ${
                  bar === "search" ? "active" : undefined
                }`}
              >
                <i
                  onClick={() => {
                    setBar("search");
                  }}
                  className="lnr lnr-magnifier"
                ></i>
                <span> {t("search")}</span>
              </a>
            </Link>
            {isAuthenticated ? (
              <Link
                href={bar === "cart" ? router.pathname : "?navigation=cart"}
              >
                <a
                  className={`navigation__item ps-toggle--sidebar ${
                    bar === "cart" ? "active" : null
                  }`}
                >
                  <i
                    onClick={() => {
                      setBar("cart");
                    }}
                    className="lnr lnr-cart"
                  ></i>
                  <span> {t("cart")}</span>
                </a>
              </Link>
            ) : (
              <Link href="/user/sign-in">
                <a className="navigation__item ps-toggle--sidebar">
                  <i className="lnr lnr-cart"></i>
                  <span> {t("cart")}</span>
                </a>
              </Link>
            )}
          </div>
        )}
      </div>
      <Search />
      <User />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  authSeller: state.authSeller,
  authCargo: state.authCargo,
  shopLoading: state.shopLoading 
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("common")
)(Sidebar);
