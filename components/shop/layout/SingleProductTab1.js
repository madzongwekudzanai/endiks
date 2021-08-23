import { connect } from "react-redux";
import { addCartItem } from "../../../actions/cart";
import { addWishlistItem } from "../../../actions/wishlist";
import Link from "next/link";
import { Fragment } from "react";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import PriceFormat from "../../layout/landing/PriceFormat";
import LazyLoadImage from "../../layout/LazyLoadImage";

const SingleProductTab1 = ({
  shopLoading: { cartLoading, wishlistLoading },
  payment: { rate },
  auth: { isAuthenticated },
  product: { slides, seller, title, price, _id, description },
  addWishlistItem,
  addCartItem,
  t
}) => {
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  return (
    <div className="ps-product ps-product--wide">
      <div className="ps-product__thumbnail">
        <LazyLoadImage height={188}>
          <Link href={`/products/product_detail?product_id=${_id}`}>
            <a>
              <img src={slides[0]} alt={title} />
            </a>
          </Link>
        </LazyLoadImage>
      </div>
      <div className="ps-product__container">
        <div className="ps-product__content">
          <Link href={`/products/product_detail?product_id=${_id}`}>
            <a className="ps-product__title">{title}</a>
          </Link>
          <div style={{ display: "none" }} className="ps-product__rating">
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
            <Link href={`/seller/store?store_id=${seller}&page_number=1`}>
              <a>{t("view-store")}</a>
            </Link>
          </p>
          <ul className="ps-product__desc text-trunk-cont">
            {description.split(",").slice(0,5).map((des, index) => (
              <li className="text-trunk" key={index}>
                {" "}
                {des.trim()}
              </li>
            ))}
          </ul>
        </div>
        <div className="ps-product__shopping">
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
          {cartLoading ? (
            <a className="ps-btn white-hover">
              <span className="spinner-border" role="status"></span> {t("loading")}
            </a>
          ) : (
            <Fragment>
              {isAuthenticated ? (
                <a
                  onClick={() => {
                    addCartItem(_id);
                  }}
                  className="ps-btn white-hover"
                >
                  {t("add-to-cart")}
                </a>
              ) : (
                <Link href="/user/sign-in">
                  <a className="ps-btn white-hover">{t("add-to-cart")}</a>
                </Link>
              )}
            </Fragment>
          )}
          <ul className="ps-product__actions">
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
                    className="pointer-cursor"
                  >
                    <i className="lnr lnr-heart"></i> {t("wishlist")}
                  </a>
                ) : (
                  <Link href="/user/sign-in">
                    <a className="pointer-cursor">
                      <i className="lnr lnr-heart"></i> {t("wishlist")}
                    </a>
                  </Link>
                )}
              </li>
            )}
            {/* <li>
              <Link href="#">
                <a>
                  <i className="lnr lnr-chart-bars"></i> Compare
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  shopLoading: state.shopLoading,
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, { addCartItem, addWishlistItem }),
  withTranslation("shop")
)(SingleProductTab1);