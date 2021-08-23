import Layout from "../../../components/layout/Layout";
import PrivateFreightRoute from "../../../components/routing/PrivateFreightRoute";
import Pro from "../../../components/freight/dashboard/pro/Pro";
import { withTranslation } from "../../../i18n";

const Dashboard = ({ t }) => {
  return (
    <Layout title={t("dashboard")} description={t("dashboard")}>
      <PrivateFreightRoute>
        <Pro />
      </PrivateFreightRoute>
    </Layout>
  );
};

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ["dashboard", "common"],
});

export default withTranslation("dashboard")(Dashboard);
