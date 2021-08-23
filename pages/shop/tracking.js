import Tracking from "../../components/tracking/Tracking";
import Layout from "../../components/layout/Layout";
import AuthSellerWrapper from "../../components/routing/AuthSellerWrapper";
import { withTranslation } from "../../i18n";
import AuthFreightWrapper from "../../components/routing/AuthFreightWrapper";

const OrderTracking = ({ t }) => {
  return (
    <Layout title={t("order-tracking")} description={t("tack-your-order")}>
      <AuthFreightWrapper>
        <AuthSellerWrapper>
          <Tracking />
        </AuthSellerWrapper>
      </AuthFreightWrapper>
      
    </Layout>
  );
};

OrderTracking.getInitialProps = async () => ({
  namespacesRequired: ["tracking"],
});

export default withTranslation("tracking")(OrderTracking);