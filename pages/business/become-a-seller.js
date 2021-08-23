import Vendor from "../../components/vendor/Vendor";
import Layout from "../../components/layout/Layout";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";
import { withTranslation } from "../../i18n";

const Seller = () => {
  return (
    <Layout
      title="Sell on Endiks"
      description="Ready to be an Endiks Seller? Learn how to reach million of shoppers, grow your ecommerce business with Endiks, and stay profitable on Endiks."
    >
      <AuthFreightWrapper>
        <AuthSellerWrapper>
          <Vendor />
        </AuthSellerWrapper>
      </AuthFreightWrapper>
    </Layout>
  );
};

Seller.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation()(Seller);
