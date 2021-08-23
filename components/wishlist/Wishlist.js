import Breadcrumb from "../layout/Breadcrumb";
import { connect } from "react-redux";
import { getWishlistItems, removeWishlistItem } from "../../actions/wishlist";
import { addCartItem } from "../../actions/cart";
import Link from "next/link";
import { useEffect, Fragment } from "react";
import { withTranslation } from "../../i18n";
import { compose } from "redux";
import PriceFormat from "../layout/landing/PriceFormat";
import LazyLoadImage from "../layout/LazyLoadImage";

const Wishlist = ({
  shopLoading,
  cartLoading,
  auth: { wishlistItems },
  payment: { rate },
  getWishlistItems,
  addCartItem,
  removeWishlistItem,
  t
}) => {
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  useEffect(() => {
    getWishlistItems();
  }, [getWishlistItems]);
  return (
    <div classNameName="ps-page--simple">
      <Breadcrumb
        page={t("wishlist")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <div className="ps-section--shopping ps-whishlist">
        <div className="container">
          <div className="ps-section__header">
            <h1>{t("wishlist")}</h1>
          </div>
          <div className="ps-section__content">
            <div className="table-responsive">
              <table className="table ps-table--whishlist">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("product-name")}</th>
                    <th>{t("unit-price")}</th>
                    <th>{t("stock-status")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {shopLoading ? (
                    <span className="spinner-border" role="status"></span>
                  ) : (
                    <Fragment>
                      {wishlistItems.map(
                        ({ _id, slides, title, price, quantity }) => (
                          <tr key={_id}>
                            <td>
                              <a
                                onClick={() => {
                                  removeWishlistItem(_id);
                                }}
                                className="pointer-cursor"
                              >
                                <i className="lnr lnr-cross"></i>
                              </a>
                            </td>
                            <td>
                              <div className="ps-product--cart">
                                <div className="ps-product__thumbnail">
                                  <LazyLoadImage height={100}>
                                    <Link href={`/products/product_detail?product_id=${_id}`}>
                                      <a>
                                        <img src={slides[0]} alt={title} />
                                      </a>
                                    </Link>
                                  </LazyLoadImage>
                                </div>
                                <div className="ps-product__content">
                                  <Link href={`/products/product_detail?product_id=${_id}`}>
                                    <a>{title}</a>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="price">
                              <PriceFormat 
                              locale="en-US"
                              currencyCode="USD"
                              price={price * rate * commissionTwo} />
                            </td>
                            {quantity <= 0 ? (
                              <td>
                                <span className="ps-tag ps-tag--out-stock">
                                  {t("out-of-stock")}
                                </span>
                              </td>
                            ) : (
                              <Fragment>
                                <td>
                                  <span className="ps-tag ps-tag--in-stock">
                                    {t("in-stock")}
                                  </span>
                                </td>
                                <td>
                                  {cartLoading ? (
                                    <a className="ps-btn white-hover">
                                      <span
                                        className="spinner-border"
                                        role="status"
                                      ></span>{" "}
                                      {t("loading")}
                                    </a>
                                  ) : (
                                    <a
                                      onClick={() => {
                                        addCartItem(_id);
                                      }}
                                      className="ps-btn white-hover"
                                    >
                                      {t("add-to-cart")}
                                    </a>
                                  )}
                                </td>
                              </Fragment>
                            )}
                          </tr>
                        )
                      )}
                    </Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payment: state.payment,
  shopLoading: state.shopLoading.wishlistLoading,
  cartLoading: state.shopLoading.cartLoading,
});

export default compose(
  connect(mapStateToProps, {
    getWishlistItems,
    addCartItem,
    removeWishlistItem,
  }),
  withTranslation("wishlist")
)(Wishlist);