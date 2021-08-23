import Link from "next/link";
const en = "/coverimages/en.png";
import { withTranslation } from "../../../i18n";

const FirstTopHeader = ({ t }) => {
  return (
    <div className="header__top">
      <div className="container">
        <div className="header__left">
          <p>{t("welcome-to-endiks")}</p>
        </div>
        <div className="header__right">
          <ul className="header__top-links">
            <li>
              <Link href="/business/become-a-seller">
                <a>{t("sell-on-endiks")}</a>
              </Link>
            </li>
            <li>
              <Link href="/shop/tracking">
                <a>{t("track-your-order")}</a>
              </Link>
            </li>
            <li>
              <div className="ps-dropdown">
                <a>{t("us-dollar")}</a>
              </div>
            </li>
            <li>
              <div className="ps-dropdown language">
                <a>
                  <img src={en} alt="" />
                  {t("english")}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("header")(FirstTopHeader);
