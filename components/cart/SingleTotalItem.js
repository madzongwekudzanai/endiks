import { connect } from "react-redux";
import { Fragment } from "react";
import Link from "next/link";
import { compose } from "redux";
import { withTranslation } from "../../i18n";
import PriceFormat from "../layout/landing/PriceFormat";

const SingleTotalItem = ({ sell, cartItems, user, payment: { rate }, t }) => {
  return (
    <li>
      <span className="ps-block__shop">{t("seller-to-agent")}</span>
      <span className="ps-block__shipping">
        <PriceFormat 
        locale="en-US"
        currencyCode="USD"
        price={cartItems.filter(({ seller }) => seller === sell)[0].shipping * rate} />
      </span>
      <span className="ps-block__estimate">
        {cartItems
          .filter(({ seller }) => seller === sell)
          .map(({ _id, title }) => (
            <Fragment key={_id}>
              <Link href={`/products/product_detail?product_id=${_id}`}>
                <a>
                  {" "}
                  {title} ×
                  {
                    user.cart.items[
                      user.cart.items.map((item) => item.productId).indexOf(_id)
                    ].quantity
                  }
                </a>
              </Link>
            </Fragment>
          ))}
      </span>
    </li>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("cart")
)(SingleTotalItem);