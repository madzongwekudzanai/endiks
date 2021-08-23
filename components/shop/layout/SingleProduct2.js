import { connect } from "react-redux";
import { addCartItem } from "../../../actions/cart";
import { addWishlistItem } from "../../../actions/wishlist";
import Link from "next/link";
import { Fragment } from "react";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import LazyLoadImage from "../../layout/LazyLoadImage";
import PriceFormat from "../../layout/landing/PriceFormat";

const SingleProduct2 = ({
  product: { slides, seller, title, price, _id },
  auth: { isAuthenticated },
  payment: { rate },
  shopLoading: { cartLoading, wishlistLoading },
  addCartItem,
  addWishlistItem,
  t
}) => {
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  return (
    <div key={_id} className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6">
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
          <Link href={`/seller/store?store_id=${seller}&page_number=1`}>
            <a className="ps-product__vendor">{t("view-store")}</a>
          </Link>
          <div className="ps-product__content">
            <Link href={`/products/product_detail?product_id=${_id}`}>
              <a className="ps-product__title">{title}</a>
            </Link>
            <p className="ps-product__price">
              {!rate ? (
                <span className="spinner-border" role="status"></span>
              ) : (
                <PriceFormat 
                locale="en-US"
                currencyCode="USD"
                price={price * rate * commissionTwo} />
              )}
            </p>
          </div>
          <div className="ps-product__content hover">
            <Link href={`/products/product_detail?product_id=${_id}`}>
              <a className="ps-product__title">{title}</a>
            </Link>
            <p className="ps-product__price">
              {!rate ? (
                <span className="spinner-border" role="status"></span>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payment: state.payment,
  shopLoading: state.shopLoading,
});

export default compose(
  connect(mapStateToProps, { addCartItem, addWishlistItem }),
  withTranslation("shop")
)(SingleProduct2);