import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { updateCartQuantity, removeCartItem } from "../../actions/cart";
import { useEffect } from "react";
import Link from "next/link";
import PriceFormat from "../layout/landing/PriceFormat";
import { compose } from "redux";
import { withTranslation } from "../../i18n";
import LazyLoadImage from "../layout/LazyLoadImage";

const SingleCartItem = ({
  item: { _id, slides, title, name, price, quantity },
  user: { cart },
  shopLoading,
  payment: { rate },
  updateCartQuantity,
  removeCartItem,
  t
}) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  useEffect(() => {
    setCartQuantity(cart.items[qIndex].quantity);
  }, []);
  const qIndex = cart.items.map((item) => item.productId).indexOf(_id);
  return (
    <tr>
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
            <p>
              {t("sold-by")}<strong> {name}</strong>
            </p>
          </div>
        </div>
      </td>
      <td className="price">
        {!rate ? (
          <span className="spinner-border" role="status"></span>
        ) : (
          <PriceFormat 
          locale="en-US"
          currencyCode="USD"
          price={price * rate * commissionTwo} />
        )}
      </td>
      <td>
        <div className="form-group--number">
          <button
            disabled={cartQuantity >= quantity || shopLoading ? true : false}
            onClick={() => {
              setCartQuantity(cartQuantity + 1);
              updateCartQuantity(cartQuantity + 1, _id);
            }}
            className="up"
          >
            +
          </button>
          <button
            onClick={() => {
              setCartQuantity(cartQuantity - 1);
              updateCartQuantity(cartQuantity - 1, _id);
            }}
            disabled={cartQuantity <= 1 || shopLoading ? true : false}
            className="down"
          >
            -
          </button>
          {shopLoading ? (
            <span className="spinner-border" role="status"></span>
          ) : (
            <input
              disabled={shopLoading}
              value={cartQuantity}
              className="form-control"
              onChange={(e) => {
                setCartQuantity(e.target.value);
                updateCartQuantity(e.target.value, _id);
              }}
              type="number"
            />
          )}
        </div>
      </td>
      <td>
        {!rate ? (
          <span className="spinner-border" role="status"></span>
        ) : (
          <PriceFormat 
          locale="en-US"
          currencyCode="USD"
          price={price * cartQuantity * rate * commissionTwo} />
        )}
      </td>
      <td>
        {shopLoading ? (
          <span className="spinner-border" role="status"></span>
        ) : (
          <a
            onClick={() => {
              removeCartItem(_id);
            }}
            className="pointer-cursor"
          >
            <i className="lnr lnr-cross"></i>
          </a>
        )}
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
  shopLoading: state.shopLoading.cartLoading,
});

export default compose(
  connect(mapStateToProps, { updateCartQuantity, removeCartItem }),
  withTranslation("cart")
)(SingleCartItem);
