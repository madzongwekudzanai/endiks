import Breadcrumb from "../layout/Breadcrumb";
import Banner from "./Banner";
import About from "./About";
import Milestone from "./Milestone";
import { withTranslation } from "../../i18n";

const Vendor = ({ t }) => {
  return (
    <div className="ps-page--single">
      <Breadcrumb
        page={t("become-a-seller")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <Banner
        text={t("become-seller-banner-text")}
        location="/seller/auth/register"
        locationText={t("become-seller-location-text")}
      />
      <About />
      <Milestone />
      {/* <Fees />
      <Testimonials />
      <Faqs /> */}
      <Banner
        text={t("become-seller-banner-two-text")}
        location="/seller/auth/register"
        locationText={t("become-seller-location-text")}
      />
    </div>
  );
};

export default withTranslation("common")(Vendor);
