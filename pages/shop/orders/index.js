import PrivateRoute from "../../../components/routing/PrivateRoute";
import Orders from "../../../components/orders/Orders";
import Layout from "../../../components/layout/Layout";
import { withTranslation } from "../../../i18n";

const UserOrders = ({ t }) => {
  return (
    <Layout title={t("orders")} description={t("view-your-orders")}>
      <PrivateRoute>
        <Orders />
      </PrivateRoute>
    </Layout>
  );
};

UserOrders.getInitialProps = async () => ({
  namespacesRequired: ["orders"],
});

export default withTranslation("orders")(UserOrders);