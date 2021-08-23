import ShopNavigation from "./ShopNavigation";
import ShopFilter from "./ShopFilter";
import { withTranslation } from "../../../i18n";

const ShopHeader = ({ t }) => {
  return (
    <header
      id="mobileHeader"
      className="header header--mobile header--mobile-categories"
    >
      <ShopNavigation title={t("home")} />
      <ShopFilter />
    </header>
  );
};

export default withTranslation("header")(ShopHeader);
