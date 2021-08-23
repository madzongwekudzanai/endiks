import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProductCategories } from "../../actions/product";
import { getCartItems } from "../../actions/cart";
import { getWishlistItems } from "../../actions/wishlist";
import { getCurrentRate } from "../../actions/payment";
import { setAuthToken, setSellerAuthToken, setCargoAuthToken } from "../../utils/setAuthToken";
import { loadUser } from "../../actions/auth";
import { loadSeller } from "../../actions/authSeller";
import { loadFreight } from "../../actions/authCargo";
import { i18n, withTranslation } from "../../i18n";
import { compose } from "redux";

if (typeof window !== "undefined") {
  localStorage.token
    ? setAuthToken(localStorage.token)
    : localStorage.freightToken ? setCargoAuthToken(localStorage.freightToken) : localStorage.sellerToken && setSellerAuthToken(localStorage.sellerToken);
}

const Wrapper = ({
  t,
  children,
  getProductCategories,
  getCartItems,
  getWishlistItems,
  getCurrentRate,
  loadUser,
  loadSeller,
  loadFreight
}) => {
  const [language, setLanguage] = useState(
    typeof window !== "undefined" && localStorage.getItem("language")
  );
  useEffect(() => {
    getCurrentRate();
    loadUser();
    loadSeller();
    loadFreight()
    getProductCategories();
    getCartItems();
    getWishlistItems();
    i18n.changeLanguage(
      !language ? "en" : language === "english" ? "en" : "zh"
    );
  }, []);
  return <Fragment>{children}</Fragment>;
};

export default compose(
  connect(null, {
    getProductCategories,
    getCartItems,
    getWishlistItems,
    getCurrentRate,
    loadUser,
    loadSeller,
    loadFreight
  }),
  withTranslation()
)(Wrapper);
