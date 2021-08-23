import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getCartItems, removeCartItem } from "../../../actions/cart";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import PriceFormat from "../landing/PriceFormat";
import LazyLoadImage from "../LazyLoadImage";

const Cart = ({
  shopLoading,
  auth: { cartItems, user },
  payment: { rate },
  getCartItems,
  removeCartItem,
  t
}) => {
  const arr =
    user &&
    cartItems.map(
      ({ _id, price }) =>
        price *
        user.cart.items[
          user.cart.items.map((item) => item.productId).indexOf(_id)
        ].quantity
    );
  const subTotal = user && arr.reduce((a, b) => a + b, 0);
  const router = useRouter();
  const { navigation } = router.query;
  const [hash, setHash] = useState(navigation);
  const commission = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  useEffect(() => {
    getCartItems();
    setHash(navigation);
  }, [navigation]);
  return (
    <div className={`ps-panel--sidebar ${hash === "cart" ? "active" : null}`}>
      <div className="ps-panel__header">
        <h3>{t("shopping-cart")}</h3>
      </div>
      <div className="navigation__content">
        <div className="ps-cart--mobile">
          <div
            style={{
              position: "relative",
              overflowY: "scroll",
              width: "auto",
              height: "100%",
            }}
            className="ps-cart__content"
          >
            {cartItems.map(({ slides, title, _id, name, price }) => (
              <div key={_id} className="ps-product--cart-mobile">
                <div className="ps-product__thumbnail">
                  <LazyLoadImage height={56}>
                    <Link href={`/products/product_detail?product_id=${_id}`}>
                      <a>
                        <img src={slides[0]} alt={title} />
                      </a>
                    </Link>
                  </LazyLoadImage>
                </div>
                <div className="ps-product__content">
                  {shopLoading ? (
                    <span className="spinner-border" role="status"></span>
                  ) : (
                    <a
                      onClick={() => {
                        removeCartItem(_id);
                      }}
                      className="ps-product__remove pointer-cursor"
                    >
                      <i className="lnr lnr-cross"></i>
                    </a>
                  )}
                  <Link href={`/products/product_detail?product_id=${_id}`}>
                    <a>{title}</a>
                  </Link>
                  <p>
                    <strong>{t("sold-by")}</strong> {name}
                  </p>
                  {!rate ? (
                    <span className="spinner-border" role="status"></span>
                  ) : (
                    <small>
                      {
                        user.cart.items[
                          user.cart.items
                            .map((item) => item.productId)
                            .indexOf(_id)
                        ].quantity
                      }{" "}
                      x <PriceFormat 
                        locale="en-US"
                        currencyCode="USD"
                        price={price * rate * commission} />
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <div className="ps-cart__footer">
              <h3>
                {t("sub-total")}
                <strong>
                  <PriceFormat 
                  locale="en-US"
                  currencyCode="USD"
                  price={subTotal * commission * rate} />
                </strong>
              </h3>
              <figure>
                <Link href="/shop/cart">
                  <a className="ps-btn">{t("view-cart")}</a>
                </Link>
                <Link href="/shop/checkout">
                  <a className="ps-btn">{t("checkout")}</a>
                </Link>
              </figure>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  payment: state.payment,
  shopLoading: state.shopLoading.cartLoading,
});

export default compose(
  connect(mapStateToProps, { getCartItems, removeCartItem }),
  withTranslation("sidebar")
)(Cart);