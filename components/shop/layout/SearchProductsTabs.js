import Link from "next/link";
import Pagination from "../../layout/Pagination";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { addCartItem } from "../../../actions/cart";
import { addWishlistItem } from "../../../actions/wishlist";
import Head from "next/head";
import { searchSellerProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import PriceFormat from "../../layout/landing/PriceFormat";
import LazyLoadImage from "../../layout/LazyLoadImage";

const SearchProductTabs = ({
  authSeller,
  payment: { rate },
  auth: { isAuthenticated },
  product: { searchedSellerProducts, loadingSearchedSellerProducts },
  shopLoading: { cartLoading, wishlistLoading },
  formLoading,
  searchSellerProducts,
  addCartItem,
  addWishlistItem,
  t
}) => {
  const router = useRouter();
  const { search_query, page_number, store_id } = router.query;
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  useEffect(() => {
    searchSellerProducts(search_query, store_id, page_number);
  }, [page_number, search_query, store_id]);
  return (
    <Fragment>
      <Head>
        <title>{`Search results - ${search_query} - Endiks`}</title>
        <meta name="description" content={search_query} />
      </Head>
      <div className="ps-tabs">
        <div className="ps-tab active" id="tab-1">
          <div className="ps-shopping-product">
            {loadingSearchedSellerProducts || formLoading ? (
              <span className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">{t("loading")}</span>
                </div>
              </span>
            ) : (
              <div className="row">
                {!loadingSearchedSellerProducts &&
                !formLoading &&
                searchedSellerProducts.length <= 0 ? (
                  <span className="col">
                    {t("no-results")} "{search_query.trim()}"
                  </span>
                ) : (
                  <Fragment>
                    {searchedSellerProducts.map(
                      ({ slides, seller, title, price, _id }) => (
                        <div
                          key={_id}
                          className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6"
                        >
                          <div className="ps-product">
                            <div className="ps-product__thumbnail">
                              <LazyLoadImage height={188}>
                                <Link href={`/products/product_detail?product_id=${_id}`}>
                                  <a>
                                    <img src={slides[0]} alt={title} />
                                  </a>
                                </Link>
                              </LazyLoadImage>
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
                                        onClick={() => {
                                          addCartItem(_id);
                                        }}
                                      >
                                        <i
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
                                  <a className="ps-product__title">
                                    {title}
                                  </a>
                                </Link>
                                <p className="ps-product__price">
                                  {authSeller.seller &&
                                  authSeller.seller._id === seller ? (
                                    <PriceFormat 
                                    locale={authSeller.seller.locale}
                                    currencyCode={authSeller.seller.currencyCode}
                                    price={price} />
                                  ) : (
                                    <Fragment>
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
                                    </Fragment>
                                  )}
                                </p>
                              </div>
                              <div className="ps-product__content hover">
                                <Link href={`/products/product_detail?product_id=${_id}`}>
                                  <a className="ps-product__title">{title}</a>
                                </Link>
                                <p className="ps-product__price">
                                  {authSeller.seller &&
                                  authSeller.seller._id === seller ? (
                                    <PriceFormat 
                                    locale={authSeller.seller.locale}
                                    currencyCode={authSeller.seller.currencyCode}
                                    price={price} />
                                  ) : (
                                    <Fragment>
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
                                    </Fragment>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </Fragment>
                )}
              </div>
            )}
          </div>
          <Pagination what="searched_products" />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
  authSeller: state.authSeller,
  formLoading: state.formLoading.formLoading,
  shopLoading: state.shopLoading,
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, {
    searchSellerProducts,
    addCartItem,
    addWishlistItem
  }),
  withTranslation("shop")
)(SearchProductTabs);