import Link from "next/link";
const en = "/coverimages/en.png";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";
import { connect } from "react-redux";

const TopHeader = ({ t, language: { loc } }) => {
  return (
    <div className="header__top">
      <div className="header__left">
        <p>{t("welcome-to-endiks")}</p>
      </div>
      <div className="header__right">
        <ul className="navigation__extra">
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
              {/* <ul className="ps-dropdown-menu">
                    <li>
                      <Link href="#">
                        <a>Us Dollar</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Euro</a>
                      </Link>
                    </li>
                  </ul> */}
            </div>
          </li>
          <li>
            <div className="ps-dropdown language">
              <a>
                <img src={en} alt="" />
                {loc}
              </a>
              {/* <ul className="ps-dropdown-menu">
                    <li>
                      <Link href="#">
                        <a>
                          <img src={germany} alt="" /> Germany
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>
                          <img src={fr} alt="" /> France
                        </a>
                      </Link>
                    </li>
                  </ul> */}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  language: state.language
})

export default compose(
  connect(mapStateToProps, null),
  withTranslation("header")
)(TopHeader);
