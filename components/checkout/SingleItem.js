import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withTranslation } from "../../i18n";
import { compose } from "redux";
import Link from "next/link";
import PriceFormat from "../layout/landing/PriceFormat";

const SingleItem = ({
  item: { _id, title, name, price },
  payment: { rate },
  user: { cart },
  t
}) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  useEffect(() => {
    setCartQuantity(cart.items[qIndex].quantity);
  }, []);
  const qIndex = cart.items.map((item) => item.productId).indexOf(_id);
  const commissionTwo = process.env.NEXT_PUBLIC_COMMISSION_TWO;
  return (
    <tr>
      <td>
        <Link href={`/products/product_detail?product_id=${_id}`}>
          <a>
            {" "}
            {title}×{cartQuantity}
          </a>
        </Link>
        <p>
          {t("sold-by")} <strong className="text-uppercase">{name}</strong>
        </p>
      </td>
      <td>
        <PriceFormat 
        locale="en-US"
        currencyCode="USD"
        price={price * cartQuantity * rate * commissionTwo} />
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("checkout")
)(SingleItem);