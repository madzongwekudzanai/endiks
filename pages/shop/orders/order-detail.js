import PrivateRoute from "../../../components/routing/PrivateRoute";
import OrderDetail from "../../../components/orders/OrderDetail";
import Layout from "../../../components/layout/Layout";
import { withTranslation } from "../../../i18n";

const UserOrderDetail = ({ t }) => {
  return (
    <Layout title={t("order-detail")} description={t("order-detail")}>
      <PrivateRoute>
        <OrderDetail />
      </PrivateRoute>
    </Layout>
  );
};

UserOrderDetail.getInitialProps = async () => ({
  namespacesRequired: ["orders"],
});

export default withTranslation("orders")(UserOrderDetail);