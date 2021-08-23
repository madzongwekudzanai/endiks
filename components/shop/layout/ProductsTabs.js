import Link from "next/link";
import Pagination from "../../layout/Pagination";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { addCartItem } from "../../../actions/cart";
import { addWishlistItem } from "../../../actions/wishlist";
import { getPaginatedSellerProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import PriceFormat from "../../layout/landing/PriceFormat";
import LazyLoadImage from "../../layout/LazyLoadImage";

const ProductsTabs = ({
  authSeller,
  payment: { rate },
  auth: { isAuthenticated },
  formLoading,
  shopLoading: { cartLoading, wishlistLoading },
  product: { paginatedSellerProducts, loadingPaginatedSellerProducts },
  getPaginatedSellerProducts,
  addCartItem,
  addWishlistItem,
  t
}) => {
  const router = useRouter();
  const { page_number, store_id } = router.query;
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  useEffect(() => {
    getPaginatedSellerProducts(store_id, page_number);
  }, [page_number]);
  return (
    <div className="ps-tabs">
      <div className="ps-tab active" id="tab-1">
        <div className="ps-shopping-product">
          {loadingPaginatedSellerProducts || formLoading ? (
            <span className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">{t("loading")}</span>
              </div>
            </span>
          ) : (
            <div className="row">
              <Fragment>
                {paginatedSellerProducts.map(
                  ({ slides, seller, title, titles, price, _id }) => (
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
                            {cartLoading || wishlistLoading ? (
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
                            {cartLoading || wishlistLoading ? (
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
                              <a className="ps-product__title">{authSeller.seller &&
                                  authSeller.seller._id === seller
                                  ? titles.seller
                                  : title}
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
            </div>
          )}
        </div>
        <Pagination what="seller_products" />
      </div>
      {/* <div className="ps-tab" id="tab-2">
        <div className="ps-shopping-product">
          <div className="ps-product ps-product--wide">
            <div className="ps-product__thumbnail">
              <Link href={`/products/product_detail?product_id=${_id}`}>
                <a>
                  <img src={eleven} alt="" />
                </a>
              </Link>
            </div>
            <div className="ps-product__container">
              <div className="ps-product__content">
                <Link href={`/products/product_detail?product_id=${_id}`}>
                  <a className="ps-product__title">
                    Men’s Sports Runnning Swim Board Shorts
                  </a>
                </Link>
                <div className="ps-product__rating">
                  <div className="br-wrapper br-theme-fontawesome-stars">
                    <select
                      style={{ display: "none" }}
                      className="ps-rating"
                      data-read-only="true"
                    >
                      <option value="1">1</option>
                      <option value="1">2</option>
                      <option value="1">3</option>
                      <option value="1">4</option>
                      <option value="2">5</option>
                    </select>
                    <div className="br-widget br-readonly">
                      <Link href="#">
                        <a className="br-selected br-current">
                          <i className="fas fa-star"></i>
                        </a>
                      </Link>
                      <Link href="#">
                        <a className="br-selected br-current">
                          <i className="fas fa-star"></i>
                        </a>
                      </Link>
                      <Link href="#">
                        <a className="br-selected br-current">
                          <i className="fas fa-star"></i>
                        </a>
                      </Link>
                      <Link href="#">
                        <a className="br-selected br-current">
                          <i className="fas fa-star"></i>
                        </a>
                      </Link>
                      <Link href="#">
                        <a>
                          <i className="nonSelect fas fa-star"></i>
                        </a>
                      </Link>
                      <div className="br-current-rating">1</div>
                      <span>02</span>
                    </div>
                  </div>
                </div>
                <p className="ps-product__vendor">
                  Sold by:
                  <Link href="#">
                    <a>Robert's Store</a>
                  </Link>
                </p>
                <ul className="ps-product__desc">
                  <li> Unrestrained and portable active stereo speaker</li>
                  <li> Free from the confines of wires and chords</li>
                  <li> 20 hours of portable capabilities</li>
                  <li>
                    {" "}
                    Double-ended Coil Cord with 3.5mm Stereo Plugs Included
                  </li>
                  <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
                </ul>
              </div>
              <div className="ps-product__shopping">
                <p className="ps-product__price">$13.43</p>
                <Link className="ps-btn" href="#">
                  <a>Add to cart</a>
                </Link>
                <ul className="ps-product__actions">
                  <li>
                    <Link href="#">
                      <a>
                        <i className="lnr lnr-heart"></i> Wishlist
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>
                        <i className="lnr lnr-chart-bars"></i> Compare
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Pagination api="/api/products/all_products/product_count/count" />
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
  payment: state.payment,
  authSeller: state.authSeller,
  formLoading: state.formLoading.formLoading,
  shopLoading: state.shopLoading,
});

export default compose(
  connect(mapStateToProps, {
    getPaginatedSellerProducts,
    addCartItem,
    addWishlistItem
  }),
  withTranslation("shop")
)(ProductsTabs);