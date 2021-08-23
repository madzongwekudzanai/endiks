import ProfileForm from "../../../components/vendor/dashboard/forms/CreateProfile";
import Layout from "../../../components/layout/Layout";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import PrivateSellerRoute from "../../../components/routing/PrivateSellerRoute";
import { withTranslation } from "../../../i18n";
import CreateProfileWrapper from "../../../components/routing/CreateProfileWrapper";

const CreateProfile = ({ t }) => {
  return (
    <Layout title={t("create-profile-title")} description={t("create-profile-title")}>
      <CreateProfileWrapper>
        <PrivateSellerRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={t("create-profile")}
              pages={[
                {
                  text: t("dashboard"),
                  location: "/seller/dashboard",
                },
              ]}
            />
            <ProfileForm />
          </div>
        </PrivateSellerRoute>
      </CreateProfileWrapper>
    </Layout>
  );
};

CreateProfile.getInitialProps = async () => ({
  namespacesRequired: ["dashboard"],
});

export default withTranslation("dashboard")(CreateProfile);
