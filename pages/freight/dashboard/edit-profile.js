import ProfileForm from "../../../components/freight/dashboard/forms/EditProfile";
import Layout from "../../../components/layout/Layout";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import PrivateFreightRoute from "../../../components/routing/PrivateFreightRoute";
import { withTranslation } from "../../../i18n";
import EditFreightProfileWrapper from "../../../components/routing/EditFreightProfileWrapper";

const EditProfile = ({ t }) => {
  return (
    <Layout title={t("edit-profile-title")} description={t("edit-profile-title")}>
      <EditFreightProfileWrapper>
        <PrivateFreightRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={t("edit-profile")}
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
      </EditFreightProfileWrapper>
    </Layout>
  );
};

EditProfile.getInitialProps = async () => ({
  namespacesRequired: ["dashboard"],
});

export default withTranslation("dashboard")(EditProfile);
