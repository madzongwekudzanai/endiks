import CreateDestination from "../../../components/freight/store/forms/CreateDestination";
import Layout from "../../../components/layout/Layout";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import PrivateFreightRoute from "../../../components/routing/PrivateFreightRoute";
import { withTranslation } from "../../../i18n";
import AddDestinationWrapper from "../../../components/routing/AddDestinationWrapper";

const AddDestination = ({ t }) => {
  return (
    <Layout
      title={t("add-destination")}
      description={t("add-destination")}
    >
      <AddDestinationWrapper>
        <PrivateFreightRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={t("add-destination")}
              pages={[
                {
                  text: t("dashboard"),
                  location: "/freight/dashboard",
                },
              ]}
            />
              <CreateDestination />
          </div>
        </PrivateFreightRoute>
      </AddDestinationWrapper>
    </Layout>
  );
};

AddDestination.getInitialProps = async () => ({
  namespacesRequired: ["products"],
});

export default withTranslation("products")(AddDestination);
