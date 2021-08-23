import ProfileForm from "../../../components/freight/dashboard/forms/CreateProfile";
import Layout from "../../../components/layout/Layout";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import PrivateFreightRoute from "../../../components/routing/PrivateFreightRoute";
import { withTranslation } from "../../../i18n";
import CreateFreightProfileWrapper from "../../../components/routing/CreateFreightProfileWrapper";

const CreateProfile = ({ t }) => {
  return (
    <Layout title={t("create-profile-title")} description={t("create-profile-title")}>
      <CreateFreightProfileWrapper>
        <PrivateFreightRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={t("create-profile")}
              pages={[
                {
                  text: t("dashboard"),
                  location: "/freight/dashboard",
                },
              ]}
            />
            <ProfileForm />
          </div>
        </PrivateFreightRoute>
      </CreateFreightProfileWrapper>
    </Layout>
  );
};

CreateProfile.getInitialProps = async () => ({
  namespacesRequired: ["dashboard"],
});

export default withTranslation("dashboard")(CreateProfile);
