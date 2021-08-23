import Link from "next/link";
const logo_light = "/coverimages/logo_light.png";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { logoutSeller } from "../../../actions/authSeller";
import { logoutFreight } from "../../../actions/authCargo";
import {
  autocompleteProducts,
  autocompleteCategoryProducts,
} from "../../../actions/product";
import { Fragment, useEffect } from "react";
import SingleCategory from "./SingleCategory";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import HeaderCartContent from "./HeaderCartContent";
import UserButton from "../UserButton";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";

const HeaderTop = ({
  t,
  product: {
    categories,
    loadingCategories,
    autocompletedProducts,
    autocompletedCategoryProducts,
  },
  auth: { isAuthenticated, cartItems, wishlistItems },
  authSeller,
  language: { loc },
  authCargo,
  logout,
  logoutFreight,
  logoutSeller,
  autocompleteProducts,
  autocompleteCategoryProducts,
}) => {
  const router = useRouter();
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc])
  const [category, setCategory] = useState("All");
  const [content, setContent] = useState("");
  const searchCategory = category.split("&").join("-");
  const onSubmit = (e) => {
    e.preventDefault();
    Router.push(
      `/products/search-results?search=true&category=${category
        .split("&")
        .join("-")}&search_query=${content}&page_number=1`
    );
    setContent("");
  };
  return (
    <div
      className={authSeller.isAuthenticated || authCargo.isAuthenticated ? "header__top" : "header__content"}
    >
      <div className="container">
        <div className="header__left">
          <div className="menu--product-categories">
            <div className="menu__toggle">
              <i className="lnr lnr-menu"></i>
              <span> {t("shop-by-department")}</span>
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
          <Link href={authSeller.isAuthenticated ? "/seller/dashboard" : authCargo.isAuthenticated ? "/freight/dashboard" : "/"}>
            <a className="ps-logo">
              <img src={logo_light} alt="logo" />
            </a>
          </Link>
        </div>
        <div className="header__center">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
            className="ps-form--quick-search"
          >
            <div className="form-group--icon">
              <i className="lnr lnr-chevron-down"></i>
              {loadingCategories ? (
                <Fragment>
                  <span
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">{t("loading")}</span>
                </Fragment>
              ) : (
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  name="category"
                  className="form-control"
                >
                  <option value="All">{t("all")}</option>
                  {categories.map(({ _id, category }) => (
                    <option key={_id} value={category[locale]}>
                      {category[locale]}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <input
              type="text"
              required
              autoComplete="off"
              onChange={(e) => {
                setContent(e.target.value);
                category === "All" && autocompleteProducts(e.target.value);
                category !== "All" &&
                  autocompleteCategoryProducts({content: e.target.value, loc}, category);
              }}
              value={content}
              name="content"
              className="form-control"
              placeholder={t("shopping-for")}
            />
            <button>{t("search")}</button>
            <div
              className={`ps-panel--search-result ${
                content &&
                (autocompletedCategoryProducts.length > 0 ||
                  autocompletedProducts.length > 0)
                  ? "active"
                  : null
              }`}
            >
              <div className="ps-panel__content">
                {category === "All" ? (
                  <Fragment>
                    {autocompletedProducts.map(({ _id, en }) => (
                      <div
                        key={_id}
                        className="ps-product ps-product--wide ps-product--search-result"
                      >
                        <div className="ps-product__content">
                          {/* <span>Not found! Try with another keyword.</span> */}
                          <Link
                            href={`/products/search-results?search=false&category=All&search_query=${encodeURI(
                              en
                            )}&page_number=1`}
                          >
                            <a
                              onClick={() => {
                                setContent("");
                              }}
                              className="ps-product__title"
                            >
                              {en}
                            </a>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    {autocompletedCategoryProducts.map(({ _id, title }) => (
                      <div
                        key={_id}
                        className="ps-product ps-product--wide ps-product--search-result"
                      >
                        <div className="ps-product__content">
                          {/* <span>Not found! Try with another keyword.</span> */}
                          <Link
                            href={`/products/search-results?search=false&category=${searchCategory}&search_query=${encodeURI(
                              title
                            )}&page_number=1`}
                          >
                            <a
                              onClick={() => {
                                setContent("");
                              }}
                              className="ps-product__title"
                            >
                              {title}
                            </a>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Fragment>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="header__right">
          <div className="header__actions">
            {/* <Link href="/compare">
              <a className="header__extra">
                <i className="lnr lnr-chart-bars"></i>
                <span>
                  <i>0</i>
                </span>
              </a>
            </Link> */}
            <Link href="/shop/wishlist">
              <a className="header__extra">
                <i className="lnr lnr-heart"></i>
                <span>
                  <i>{wishlistItems.length}</i>
                </span>
              </a>
            </Link>
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
            <div className="ps-block--user-header">
              <UserButton />
              <div className="ps-block__right">
                {isAuthenticated ? (
                  <a
                    className="logout"
                    onClick={() => {
                      logout(t("logout-success"));
                    }}
                  >
                    {t("logout")}
                  </a>
                ) : authSeller.isAuthenticated ? (
                  <a
                    className="logout"
                    onClick={() => {
                      logoutSeller(t("logout-success"));
                    }}
                  >
                    {t("logout")}
                  </a>
                ) : authCargo.isAuthenticated ? (
                  <a
                    className="logout"
                    onClick={() => {
                      logoutFreight(t("logout-success"));
                    }}
                  >
                    {t("logout")}
                  </a>
                ) : router.pathname === "/seller/auth/[purpose]" ? (
                  <Fragment>
                    <Link href="/seller/auth/sign-in">
                      <a className="white-links">{t("login")}</a>
                    </Link>
                    <Link href="/seller/auth/register">
                      <a className="white-links">{t("register")}</a>
                    </Link>
                  </Fragment>
                ) : router.pathname === "/freight/auth/[purpose]" ? (
                  <Fragment>
                    <Link href="/freight/auth/sign-in">
                      <a className="white-links">{t("login")}</a>
                    </Link>
                    <Link href="/freight/auth/register">
                      <a className="white-links">{t("register")}</a>
                    </Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link href="/user/sign-in">
                      <a>{t("login")}</a>
                    </Link>
                    <Link href="/user/register">
                      <a>{t("register")}</a>
                    </Link>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
  authSeller: state.authSeller,
  authCargo: state.authCargo,
  language: state.language
});

export default compose(
  connect(mapStateToProps, {
    logout,
    logoutSeller,
    autocompleteProducts,
    autocompleteCategoryProducts,
    logoutFreight
  }),
  withTranslation("header")
)(HeaderTop);
