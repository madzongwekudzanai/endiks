import EditDestination from "../../../../components/freight/store/forms/EditDestination";
import Layout from "../../../../components/layout/Layout";
import Breadcrumb from "../../../../components/layout/Breadcrumb";
import PrivateFreightRoute from "../../../../components/routing/PrivateFreightRoute";
import { withTranslation } from "../../../../i18n";
import EditDestinationWrapper from "../../../../components/routing/EditDestinationWrapper";

const UpdateDestination = ({ t }) => {
  return (
    <Layout title={t("edit-destination")} description={t("edit-destination")}>
      <EditDestinationWrapper>
        <PrivateFreightRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={t("edit-destination")}
              pages={[
                {
                  text: t("dashboard"),
                  location: "/freight/dashboard",
                },
              ]}
            />
            <EditDestination />
          </div>
        </PrivateFreightRoute>
      </EditDestinationWrapper>
    </Layout>
  );
};

UpdateDestination.getInitialProps = async () => ({
  namespacesRequired: ["products"],
});

export default withTranslation("products")(UpdateDestination);
