const one = "/coverimages/about-vendor/vendor-1.png";
const two = "/coverimages/about-vendor/vendor-2.png";
const three = "/coverimages/about-vendor/vendor-3.png";
import { withTranslation } from "../../i18n";

const About = ({ t }) => {
  return (
    <div className="ps-section--vendor ps-vendor-about">
      <div className="container">
        <div className="ps-section__header">
          <p>{t("why-sell-title")}</p>
          <h4>
            {t("why-sell-caption")} <br /> {t("why-sell-caption-completion")}
          </h4>
        </div>
        <div className="ps-section__content">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
              <div className="ps-block--icon-box-2">
                <div className="ps-block__thumbnail">
                  <img src={one} alt={t("why-sell-one-title")} />
                </div>
                <div className="ps-block__content">
                  <h4>{t("why-sell-one-title")}</h4>
                  <div className="ps-block__desc" data-mh="about-desc">
                    <p>{t("why-sell-one-first")}</p>
                  </div>
                  {/* <Link href="#">
                    <a>Learn more</a>
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
              <div className="ps-block--icon-box-2">
                <div className="ps-block__thumbnail">
                  <img src={two} alt={t("why-sell-two-title")} />
                </div>
                <div className="ps-block__content">
                  <h4>{t("why-sell-two-title")}</h4>
                  <div className="ps-block__desc" data-mh="about-desc">
                    <p>{t("why-sell-two-first")}</p>
                  </div>
                  {/* <Link href="#">
                    <a>Learn more</a>
                  </Link> */}
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
              <div className="ps-block--icon-box-2">
                <div className="ps-block__thumbnail">
                  <img src={three} alt={t("why-sell-three-title")} />
                </div>
                <div className="ps-block__content">
                  <h4>{t("why-sell-three-title")}</h4>
                  <div className="ps-block__desc" data-mh="about-desc">
                    <p>{t("why-sell-three-first")}</p>
                  </div>
                  {/* <Link href="#">
                    <a>Learn more</a>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("common")(About);
