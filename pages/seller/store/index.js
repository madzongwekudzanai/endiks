import Layout from "../../../components/layout/Layout";
import SellerStore from "../../../components/vendor/store/SellerStore";
import { withTranslation } from "../../../i18n";

const VendorStore = ({ t }) => {
  return (
    <Layout title={t("seller-store")}>
      <SellerStore />
    </Layout>
  );
};

VendorStore.getInitialProps = async () => ({
  namespacesRequired: ["shop"],
});

export default withTranslation("shop")(VendorStore);