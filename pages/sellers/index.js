import Layout from "../../components/layout/Layout";
import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import Stores from "../../components/vendor/store/stores/Stores";
import { withTranslation } from "../../i18n";

const Sellers = ({ t }) => {
  return (
    <Layout title={t("sellers")} description={t("endiks-sellers")}>
      <AuthFreightWrapper>
        <AuthSellerWrapper>
          <Stores />
        </AuthSellerWrapper>
      </AuthFreightWrapper>
    </Layout>
  );
};

Sellers.getInitialProps = async () => ({
  namespacesRequired: ["shop"],
});

export default withTranslation("shop")(Sellers);
