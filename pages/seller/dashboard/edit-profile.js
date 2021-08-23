import ProfileForm from "../../../components/vendor/dashboard/forms/EditProfile";
import Layout from "../../../components/layout/Layout";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import PrivateSellerRoute from "../../../components/routing/PrivateSellerRoute";
import { withTranslation } from "../../../i18n";
import EditProfileWrapper from "../../../components/routing/EditProfileWrapper";

const EditProfile = ({ t }) => {
  return (
    <Layout title={t("edit-profile-title")} description={t("edit-profile-title")}>
      <EditProfileWrapper>
        <PrivateSellerRoute>
          <div className="ps-page--single" id="contact-us">
            <Breadcrumb
              page={t("edit-profile")}
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
      </EditProfileWrapper>
    </Layout>
  );
};

EditProfile.getInitialProps = async () => ({
  namespacesRequired: ["dashboard"],
});

export default withTranslation("dashboard")(EditProfile);
