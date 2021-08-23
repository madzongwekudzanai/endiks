import PrivateRoute from "../../components/routing/PrivateRoute";
import Checkout from "../../components/checkout/Checkout";
import Layout from "../../components/layout/Layout";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import { withTranslation } from "../../i18n";

const CheckoutPage = ({ t }) => {
  return (
    <Layout title={t("checkout")} description={t("checkout")}>
      <AuthSellerWrapper>
        <PrivateRoute>
          <Checkout />
        </PrivateRoute>
      </AuthSellerWrapper>
    </Layout>
  );
};

CheckoutPage.getInitialProps = async () => ({
  namespacesRequired: ["checkout"],
});

export default withTranslation("checkout")(CheckoutPage);