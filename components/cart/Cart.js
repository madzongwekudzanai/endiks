import Breadcrumb from "../layout/Breadcrumb";
import ShoppingCart from "./ShoppingCart";
import { withTranslation } from "../../i18n";

const Cart = ({ t }) => {
  return (
    <div className="ps-page--simple">
      <Breadcrumb
        page={t("cart")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <ShoppingCart />
    </div>
  );
};

export default withTranslation("cart")(Cart);
