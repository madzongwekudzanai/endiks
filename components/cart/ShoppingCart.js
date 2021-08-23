import Link from "next/link";
import { connect } from "react-redux";
import { getCartItems } from "../../actions/cart";
import { useEffect, Fragment } from "react";
import SingleCartItem from "./SingleCartItem";
import SingleTotalItem from "./SingleTotalItem";
import { compose } from "redux";
import { withTranslation } from "../../i18n";
import PriceFormat from "../layout/landing/PriceFormat";

const ShoppingCart = ({
  auth: { cartItems, user },
  payment: { rate },
  formLoading,
  getCartItems,
  t
}) => {
  const arr = cartItems.map(
    ({ _id, price }) =>
      price *
      user.cart.items[
        user.cart.items.map((item) => item.productId).indexOf(_id)
      ].quantity
  );
  const subTotal = arr.reduce((a, b) => a + b, 0);
  let sellers = new Set();
  cartItems.forEach(({ seller }) => sellers.add(seller));
  const sellersArr = Array.from(sellers);
  const shippingArr = sellersArr.map(
    (sell) => cartItems.filter(({ seller }) => seller === sell)[0].shipping
  );
  const shippingTotal = shippingArr.reduce((a, b) => a + b, 0);
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  const totalOrderPrice = (
    subTotal * commissionTwo * rate +
    shippingTotal * rate
  ).toFixed(2);
  useEffect(() => {
    getCartItems();
  }, [subTotal]);
  return (
    <div className="ps-section--shopping ps-shopping-cart">
      <div className="container">
        <div className="ps-section__header">
          <h1>{t("shopping-cart")}</h1>
        </div>
        <div className="ps-section__content">
          <div className="table-responsive">
            <table className="table ps-table--shopping-cart">
              <thead>
                <tr className="text-uppercase">
                  <th>{t("product-name")}</th>
                  <th>{t("price")}</th>
                  <th>{t("quantity")}</th>
                  <th>{t("total")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {formLoading ? (
                  <span className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">{t("loading")}</span>
                    </div>
                  </span>
                ) : (
                  <Fragment>
                    {cartItems.map((item) => (
                      <SingleCartItem key={item._id} item={item} user={user} />
                    ))}
                  </Fragment>
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="ps-section__cart-actions">
            <Link href="/">
              <a className="ps-btn">
                <i className="lnr lnr-arrow-left"></i> Back to Shop
              </a>
            </Link>
            <Link href="shop-default.html">
              <a className="ps-btn ps-btn--outline">
                <i className="lnr lnr-sync"></i> Update cart
              </a>
            </Link>
          </div> */}
        </div>
        <div className="ps-section__footer pt-5">
          <div className="row">
            {/* <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
              <figure>
                <figcaption>
                  Coupon Discount
                  <i className="lnr lnr-chevron-down cartIcon"></i>
                </figcaption>
                <div className="form-group">
                  <input className="form-control" type="text" placeholder="" />
                </div>
                <div className="form-group">
                  <button className="ps-btn ps-btn--outline">Apply</button>
                </div>
              </figure>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
              <figure>
                <figcaption>
                  Calculate shipping
                  <i className="lnr lnr-chevron-down cartIcon"></i>
                </figcaption>
                <div className="form-group">
                  <select className="ps-select countrySelect">
                    <option value="1">America</option>
                    <option value="2">Italia</option>
                    <option value="3">Vietnam</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Town/City"
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Postcode/Zip"
                  />
                </div>
                <div className="form-group">
                  <button className="ps-btn ps-btn--outline">Update</button>
                </div>
              </figure>
            </div> */}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="ps-block--shopping-total">
                <div className="ps-block__header">
                  <p>
                    {t("sub-total")}{" "}
                    {!rate || !subTotal ? (
                      <span className="spinner-border" role="status"></span>
                    ) : (
                      <span>
                        {" "}<PriceFormat locale="en-US" currencyCode="USD" price={subTotal * commissionTwo * rate} />
                      </span>
                    )}
                  </p>
                </div>
                <div className="ps-block__content">
                  <ul className="ps-block__product">
                    {sellersArr.map((sell) => (
                      <SingleTotalItem
                        key={sell}
                        sell={sell}
                        cartItems={cartItems}
                        user={user}
                      />
                    ))}
                  </ul>
                  <h3>
                    {t("total")}{" "}
                    {!subTotal || !rate || !totalOrderPrice ? (
                      <span className="spinner-border" role="status"></span>
                    ) : (
                      <span>
                        <PriceFormat 
                        locale="en-US"
                        currencyCode="USD"
                        price={totalOrderPrice} />
                      </span>
                    )}
                  </h3>
                </div>
              </div>
              <Link href="/shop/checkout">
                <a className="ps-btn ps-btn--fullwidth">{t("proceed-to-checkout")}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  formLoading: state.formLoading.formLoading,
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, {
    getCartItems,
  }),
  withTranslation("cart")
)(ShoppingCart);
