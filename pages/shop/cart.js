import PrivateRoute from "../../components/routing/PrivateRoute";
import ShoppingCart from "../../components/cart/Cart";
import Layout from "../../components/layout/Layout";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import { withTranslation } from "../../i18n";

const Cart = ({ t }) => {
  return (
    <Layout title={t("cart")} description={t("cart")}>
      <AuthSellerWrapper>
        <PrivateRoute>
          <ShoppingCart />
        </PrivateRoute>
      </AuthSellerWrapper>
    </Layout>
  );
};

Cart.getInitialProps = async () => ({
  namespacesRequired: ["cart"],
});

export default withTranslation("cart")(Cart);