import Link from "next/link";
import { withTranslation } from "../../i18n";

const ContactInfo = ({ t }) => {
  return (
    <div className="ps-contact-info">
      <div className="container">
        <div className="ps-section__header">
          <h3>{t("contact-for-questions")}</h3>
        </div>
        <div className="ps-section__content">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
              <div className="ps-block--contact-info">
                <h4>{t("contact-directly")}</h4>
                <p>
                  <a href="mailto:support@endiks.com">support@endiks.com</a>
                  <span>(+004) 912-3548-07</span>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
              <div className="ps-block--contact-info">
                <h4>{t("head-quarter")}</h4>
                <p>
                  <span>
                    17 Queen St, Southbank, Melbourne 10560, Australia
                  </span>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
              <div className="ps-block--contact-info">
                <h4>{t("work-with-us")}</h4>
                <p>
                  <span>{t("send-your-cv")}</span>
                  <a href="mailto:jobs@endiks.com">jobs@endiks.com</a>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
              <div className="ps-block--contact-info">
                <h4>{t("customer-service")}</h4>
                <p>
                  <a href="mailto:customersupport@endiks.com">
                    customersupport@endiks.com
                  </a>
                  <span>(800) 843-2446</span>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
              <div className="ps-block--contact-info">
                <h4>{t("media-relations")}</h4>
                <p>
                  <a href="mailto:mediarelations@endiks.com">
                    mediarelations@endiks.com
                  </a>
                  <span>(801) 947-3564</span>
                </p>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
              <div className="ps-block--contact-info">
                <h4>{t("seller-support")}</h4>
                <p>
                  <a href="mailto:sellersupport@endiks.com">
                    sellersupport@endiks.com
                  </a>
                  <span>(801) 947-3100</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("contact")(ContactInfo);
