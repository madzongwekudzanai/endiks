import Layout from "../../../components/layout/Layout";
import ContactInfo from "../../../components/contact/ContactInfo";
import ContactForm from "../../../components/contact/ContactForm";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import { withTranslation } from "../../../i18n";

const Contact = ({ t }) => {
  return (
    <Layout
      title={t("contact-us")}
      description={t("contact-us-desc")}
    >
        <div className="ps-page--single" id="contact-us">
        <Breadcrumb
          page={t("contact-us")}
          pages={[
            {
              text: t("home"),
              location: "/",
            },
          ]}
        />
        {/* <ContactInfo /> */}
        <ContactForm />
      </div>
    </Layout>
  );
};

Contact.getInitialProps = async () => ({
  namespacesRequired: ["contact"],
});

export default withTranslation("contact")(Contact);