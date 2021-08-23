const one = "../layout/coverimages/milestone-vendor/milestone-1.png";
const two = "../layout/coverimages/milestone-vendor/milestone-2.png";
const three = "../layout/coverimages/milestone-vendor/milestone-3.png";
const four = "../layout/coverimages/milestone-vendor/milestone-4.png";
import Link from "next/link";
import { withTranslation } from "../../i18n";

const Milestone = ({ t }) => {
  return (
    <div className="ps-section--vendor ps-vendor-milestone">
      <div className="container">
        <div className="ps-section__header">
          <p>{t("how-it-works")}</p>
          <h4>{t("how-it-works-caption")}</h4>
        </div>
        <div className="ps-section__content">
          <div className="ps-block--vendor-milestone">
            <div className="ps-block__left">
              <h4>{t("step-one-title")}</h4>
              <ul>
                <li>
                  {t("step-one-first-point")}{" "}
                  <Link href="/help/customer/contact-us">
                    <a>{t("step-one-first-point-link")}</a>
                  </Link>{" "}
                  {t("step-one-first-point-completion")}
                </li>
                <li>{t("step-one-second-point")}</li>
              </ul>
            </div>
            <div className="ps-block__right">
              <img src={one} alt="" />
            </div>
            <div className="ps-block__number">
              <span>1</span>
            </div>
          </div>
          <div className="ps-block--vendor-milestone reverse">
            <div className="ps-block__left">
              <h4>{t("step-two-title")}</h4>
              <ul>
                <li>{t("step-two-first-point")}</li>
                <li>{t("step-two-second-point")}</li>
              </ul>
            </div>
            <div className="ps-block__right">
              <img src={two} alt="" />
            </div>
            <div className="ps-block__number">
              <span>2</span>
            </div>
          </div>
          <div className="ps-block--vendor-milestone">
            <div className="ps-block__left">
              <h4>{t("step-three-title")}</h4>
              <ul>
                <li>{t("step-three-first-point")}</li>
                <li>{t("step-three-second-point")}</li>
              </ul>
            </div>
            <div className="ps-block__right">
              <img src={three} alt="" />
            </div>
            <div className="ps-block__number">
              <span>3</span>
            </div>
          </div>
          <div className="ps-block--vendor-milestone reverse">
            <div className="ps-block__left">
              <h4>{t("step-four-title")}</h4>
              <ul>
                <li>{t("step-four-first-point")}</li>
                <li>{t("step-four-second-point")}</li>
              </ul>
            </div>
            <div className="ps-block__right">
              <img src={four} alt="" />
            </div>
            <div className="ps-block__number">
              <span>4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("common")(Milestone);
