import { connect } from "react-redux";
import { withTranslation } from "../../i18n";
import { compose } from "redux";
import Link from "next/link";
import PriceFormat from "../layout/landing/PriceFormat";

const SingleItemTotal = ({ sell, cartItems, user, payment: { rate }, t }) => {
  return (
    <figure>
      <h4>{t("seller-to-agent")}</h4>
      <p>
        <PriceFormat 
        locale="en-US"
        currencyCode="USD"
        price={cartItems.filter(({ seller }) => seller === sell)[0].shipping * rate} />
      </p>
      {user && cartItems
        .filter(({ seller }) => seller === sell)
        .map(({ _id, title }) => (
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
        ))}
    </figure>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("checkout")
)(SingleItemTotal);