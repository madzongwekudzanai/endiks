import PrivateRoute from "../../components/routing/PrivateRoute";
import Wishlist from "../../components/wishlist/Wishlist";
import Layout from "../../components/layout/Layout";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import { withTranslation } from "../../i18n";

const wishlist = ({ t }) => {
  return (
    <Layout title={t("wishlist")} description={t("wishlist")}>
      <AuthSellerWrapper>
        <PrivateRoute>
          <Wishlist />
        </PrivateRoute>
      </AuthSellerWrapper>
    </Layout>
  );
};

wishlist.getInitialProps = async () => ({
  namespacesRequired: ["wishlist"],
});

export default withTranslation("wishlist")(wishlist);