import Link from "next/link";
import OwlCarousel from "react-owl-carousel2";
import axios from "axios";
import { addCartItem } from "../../../actions/cart";
import { addWishlistItem } from "../../../actions/wishlist";
import { connect } from "react-redux";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import { useEffect, useState, Fragment } from "react";
import PriceFormat from "./PriceFormat";

const CategoryProducts = ({
  cat: { category, subCategory },
  auth: { isAuthenticated },
  payment: { rate },
  shopLoading: { cartLoading, wishlistLoading },
  addCartItem,
  addWishlistItem,
  language: { loc },
  t
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          `/api/products/category_products/all/only_categories/categories/${category.en}`
        );
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    setLocale(loc === "english" ? "en" : "zh");
    category && fetchData();
  }, [loc]);
  const options = {
    navText: ["&#xe875;", "&#xe876;"],
    items: data.length,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    fluidSpeed: 1000,
    dots: true,
    stagePadding: 0,
    loop: true,
    nav: true,
    mouseDrag: true,
    rewind: true,
    autoplay: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 5,
      },
    },
  };
  return (
    <div className="ps-product-list ps-product-list--2">
      <div className="container">
        <div className="ps-section__header">
          <h3>{category[locale]}</h3>
          <ul className="ps-section__links">
            {Object.keys(subCategory[locale]).map((subCat, index) => (
              <li key={index}>
                <Link
                  href={`/products?category=${category[locale]
                    .split("&")
                    .join("-")}&sub_category=${subCat
                    .split("&")
                    .join("-")}&page_number=1`}
                >
                  <a>{subCat}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {loading ? (
          <span className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">{t("loading")}</span>
            </div>
          </span>
        ) : (
          <div className="ps-section__content">
            <OwlCarousel
              className="ps-carousel--nav owl-slider owl-carousel owl-loaded owl-drag"
              options={options}
            >
              {data.map(
                ({
                  _id,
                  title,
                  seller,
                  oldPrice,
                  price,
                  priceChange,
                  slides,
                }) => (
                  <div key={_id} className="ps-product">
                    <div className="ps-product__thumbnail">
                      <Link href={`/products/product_detail?product_id=${_id}`}>
                        <a>
                          <img src={slides[0]} alt={title} />
                        </a>
                      </Link>
                      {/* <div className="ps-product__badge">-16%</div>
                      <div className="ps-product__badge out-stock">Out Of Stock</div> */}
                      <ul className="ps-product__actions">
                        {cartLoading ? (
                          <li>
                            <a>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></span>
                            </a>
                          </li>
                        ) : (
                          <li>
                            {isAuthenticated ? (
                              <a
                              className="pointer-cursor"
                              >
                                <i
                                  onClick={() => {
                                    addCartItem(_id);
                                  }}
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title={t("add-to-cart")}
                                  className="lnr lnr-cart"
                                ></i>
                              </a>
                            ) : (
                              <Link href="/user/sign-in">
                                <a>
                                  <i
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t("add-to-cart")}
                                    className="lnr lnr-cart"
                                  ></i>
                                </a>
                              </Link>
                            )}
                          </li>
                        )}
                        <li>
                          <Link href={`/products/product_detail?product_id=${_id}`}>
                            <a>
                              <i
                                data-placement="top"
                                title={t("quick-view")}
                                data-toggle="modal"
                                data-target="#product-quickview"
                                className="lnr lnr-eye"
                              ></i>
                            </a>
                          </Link>
                        </li>
                        {wishlistLoading ? (
                          <li>
                            <a>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                              ></span>
                            </a>
                          </li>
                        ) : (
                          <li>
                            {isAuthenticated ? (
                              <a
                                onClick={() => {
                                  addWishlistItem(_id);
                                }}
                              >
                                <i
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title={t("add-to-wishlist")}
                                  className="lnr lnr-heart"
                                ></i>
                              </a>
                            ) : (
                              <Link href="/user/sign-in">
                                <a>
                                  <i
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={t("add-to-wishlist")}
                                    className="lnr lnr-heart"
                                  ></i>
                                </a>
                              </Link>
                            )}
                          </li>
                        )}
                        {/* <li>
              <Link href="#">
                <a>
                  <i
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                    className="lnr lnr-chart-bars"
                  ></i>
                </a>
              </Link>
            </li> */}
                      </ul>
                    </div>
                    <div className="ps-product__container">
                      <Link
                        href={`/seller/store?store_id=${seller}&page_number=1`}
                      >
                        <a className="ps-product__vendor">{t("view-store")}</a>
                      </Link>
                      <div className="ps-product__content">
                        <Link href={`/products/product_detail?product_id=${_id}`}>
                          <a className="ps-product__title">{title}</a>
                        </Link>
                        {/* <p className="ps-product__price sale">
                        $567.99 <del>$670.00 </del>
                        </p> */}
                        <p className="ps-product__price">
                          {!rate ? (
                            <span
                              className="spinner-border"
                              role="status"
                            ></span>
                          ) : (
                            <Fragment>
                              ${(price * rate * commissionTwo).toFixed(2)}
                            </Fragment>
                          )}
                        </p>
                      </div>
                      <div className="ps-product__content hover">
                        <Link href={`/products/product_detail?product_id=${_id}`}>
                          <a className="ps-product__title">{title}</a>
                        </Link>
                        <p className="ps-product__price">
                          {!rate ? (
                            <span
                              className="spinner-border"
                              role="status"
                            ></span>
                          ) : (
                            <PriceFormat 
                            locale="en-US"
                            currencyCode="USD"
                            price={price * rate * commissionTwo} />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </OwlCarousel>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payment: state.payment,
  shopLoading: state.shopLoading,
  language: state.language
});

export default compose(
  connect(mapStateToProps, { addCartItem, addWishlistItem }),
  withTranslation("landing")
)(CategoryProducts);