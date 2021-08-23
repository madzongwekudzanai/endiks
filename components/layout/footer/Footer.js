import Link from "next/link";
const en = "/coverimages/en.png";
import { i18n, withTranslation } from "../../../i18n";
import { connect } from "react-redux";
import { compose } from "redux";
import { setLanguage } from "../../../actions/language";
import { logout } from "../../../actions/auth";
import { logoutFreight } from "../../../actions/authCargo";
import { logoutSeller } from "../../../actions/authSeller";
import { Fragment } from "react";

const Footer = ({ t,
  language: { loc },
  auth: { isAuthenticated },
  authCargo,
  authSeller,
  setLanguage,
  logout,
  logoutFreight,
  logoutSeller
}) => {
  const handleChange = (e) => {
    setLanguage(e);
    i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
  };
  return (
    <footer className="ps-footer ps-footer--2">
      <div className="container">
        <div className="ps-footer__content">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 ">
              <aside className="widget widget_footer">
                <h4 className="widget-title">{t("quick-links")}</h4>
                <ul className="ps-list--link">
                  {
                    isAuthenticated ? (
                      <a onClick={() => {
                        logout(t("logout-success"))
                      }} className="pointer-cursor">{t("sign-out")}</a>
                    ) : (
                      <Fragment>
                        <li>
                          <Link href="/user/sign-in">
                            <a>{t("sign-in")}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/user/register">
                            <a>{t("sign-up")}</a>
                          </Link>
                        </li>
                      </Fragment>
                    )
                  }
                  <li>
                    <Link href="/shop/tracking">
                      <a>{t("track-your-order")}</a>
                    </Link>
                  </li>
                  {
                    isAuthenticated && (
                      <Fragment>
                        <li>
                          <Link href="/shop/cart">
                            <a>{t("cart")}</a>
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop/wishlist">
                            <a>{t("wishlist")}</a>
                          </Link>
                        </li>
                      </Fragment>
                    )
                  }
                </ul>
              </aside>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 ">
              <aside className="widget widget_footer">
                <h4 className="widget-title">{t("company")}</h4>
                <ul className="ps-list--link">
                  {/* <li>
                    <Link href="">
                      <a>{t("about-us")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>{t("new-updates")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>{t("contact")}</a>
                    </Link>
                  </li> */}
                  <li>
                    <Link href="/help/customer/contact-us">
                      <a>{t("contact-us")}</a>
                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 ">
              <aside className="widget widget_footer">
                <h4 className="widget-title">{t("business")}</h4>
                <ul className="ps-list--link">
                  <li>
                    <div className="dropdown show">
                      <a className="dropdown-toggle pointer-cursor" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {t("seller")}
                      </a>
                      <div style={{fontSize: 14}} className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {
                          authSeller.isAuthenticated ? (
                            <a onClick={() => {
                              logoutSeller(t("logout-success"))
                            }} className="pointer-cursor">{t("sign-out")}</a>
                          ) : (
                            <Fragment>
                              <Link href="/business/become-a-seller">
                                <a className="dropdown-item">{t("sell-on-endiks")}</a>
                              </Link>
                              <Link href="/seller/auth/register">
                                <a className="dropdown-item">{t("sign-up")}</a>
                              </Link>
                              <Link href="/seller/auth/sign-in">
                                <a className="dropdown-item">{t("sign-in")}</a>
                              </Link>
                            </Fragment>
                          )
                        }
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="dropdown show">
                      <a className="dropdown-toggle pointer-cursor" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {t("freight-logistics")}
                      </a>
                      <div style={{fontSize: 14}} className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        {
                          authCargo.isAuthenticated ? (
                            <a onClick={() => {
                              logoutFreight(t("logout-success"))
                            }} className="pointer-cursor">{t("sign-out")}</a>
                          ) : (
                            <Fragment>
                              <Link href="/freight/auth/register">
                                <a className="dropdown-item">{t("sign-up")}</a>
                              </Link>
                              <Link href="/freight/auth/sign-in">
                                <a className="dropdown-item">{t("sign-in")}</a>
                              </Link>
                            </Fragment>
                          )
                        }
                      </div>
                    </div>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 ">
              <aside className="widget widget_footer">
                <h4 className="widget-title">
                  {t("language")}{" "}
                  <i
                  >
                    <img src={en} />
                  </i>
                </h4>
                <form>
                  <div className="form-group--nest">
                    <select
                      className="ps-select select2-hidden-accessible"
                      required
                      name="language"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={!loc ? "english" : loc}
                    >
                      <option value="english">english</option>
                      <option value="简体中文">简体中文</option>
                    </select>
                  </div>
                  {/* <ul className="ps-list--social">
                    <li>
                      <a className="facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a className="twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a className="google-plus">
                        <i className="fab fa-google-plus-g"></i>
                      </a>
                    </li>
                    <li>
                      <a className="instagram">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul> */}
                </form>
              </aside>
            </div>
          </div>
        </div>
        <div className="ps-footer__copyright">
          <p>
            © {new Date().getFullYear()} {t("rights-reserved")}
          </p>
          {/* <p>
            <span>{t("trust-badge")}</span>
            <a>
              <img src="/coverimages/payment/1.jpg" alt="" />
            </a>
            <a>
              <img src="/coverimages/payment/2.jpg" alt="" />
            </a>
            <a>
              <img src="/coverimages/payment/3.jpg" alt="" />
            </a>
            <a>
              <img src="/coverimages/payment/4.jpg" alt="" />
            </a>
            <a>
              <img src="/coverimages/payment/5.jpg" alt="" />
            </a>
          </p> */}
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  language: state.language,
  auth: state.auth,
  authCargo: state.authCargo,
  authSeller: state.authSeller
});

export default compose(
  connect(mapStateToProps, {
    setLanguage,
    logout,
    logoutFreight,
    logoutSeller
  }),
  withTranslation("footer")
)(Footer);
