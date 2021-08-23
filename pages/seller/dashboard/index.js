import Layout from "../../../components/layout/Layout";
import PrivateSellerRoute from "../../../components/routing/PrivateSellerRoute";
import Pro from "../../../components/vendor/dashboard/pro/Pro";
import { withTranslation } from "../../../i18n";

const Dashboard = ({ t }) => {
  return (
    <Layout title={t("dashboard")} description={t("seller-dashboard")}>
      <PrivateSellerRoute>
        <Pro />
      </PrivateSellerRoute>
    </Layout>
  );
};

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ["dashboard", "common"],
});

export default withTranslation("dashboard")(Dashboard);
