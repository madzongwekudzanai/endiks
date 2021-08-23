import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { logout } from "../../../actions/auth";
import { withTranslation } from "../../../i18n";
import { compose } from "redux";

const User = ({
  auth: { isAuthenticated, user },
  logout,
  t
}) => {
  const router = useRouter();
  const { navigation } = router.query;
  const [hash, setHash] = useState(navigation);
  useEffect(() => {
    setHash(navigation);
  }, [navigation]);
  return (
    <div
      className={`ps-panel--sidebar ${hash === "account" ? "active" : null}`}
    >
      {isAuthenticated && user ? (
        <Fragment>
          <div className="ps-panel__header">
            <h3>{user.name}</h3>
          </div>
          <div className="ps-panel__content">
            <ul className="menu--mobile">
              <li className="current-menu-item menu-item-has-children">
                <Link href="/shop/orders">
                  <a>{t("orders")}</a>
                </Link>
              </li>
              <li className="current-menu-item menu-item-has-children">
                <Link href="/shop/tracking">
                  <a>{t("track-your-order")}</a>
                </Link>
              </li>
              <li className="current-menu-item menu-item-has-children">
                <Link href="/shop/wishlist">
                  <a>{t("wishlist")}</a>
                </Link>
              </li>
              <li
                onClick={() => {
                  logout();
                }}
                className="current-menu-item menu-item-has-children"
              >
                <a>{t("logout")}</a>
              </li>
            </ul>
          </div>
        </Fragment>
      ) : (<Fragment>
              <div className="ps-panel__header">
                <h3>{t("welcome-user")}</h3>
              </div>
              <div className="ps-panel__content">
                <ul className="menu--mobile">
                  <li className="current-menu-item menu-item-has-children">
                    <Link href="/user/register">
                      <a>{t("register")}</a>
                    </Link>
                  </li>
                  <li className="current-menu-item menu-item-has-children">
                    <Link href="/user/sign-in">
                      <a>{t("sign-in")}</a>
                    </Link>
                  </li>
                </ul>
              </div>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(
  connect(mapStateToProps, { logout }),
  withTranslation("sidebar")
)(User);