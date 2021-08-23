import { Fragment } from "react";
import Breadcrumb from "../layout/Breadcrumb";
import ShopHeader from "../layout/header/ShopHeader";
import Sidebar from "../layout/header/Sidebar";
// import CategoryShopBanner from "./category/CategoryShopBanner";
// import CategoryShopBrand from "./category/CategoryShopBrand";
import CategoryLayout from "./category/CategoryLayout";
import { withTranslation } from "../../i18n";

const Category = ({ t }) => {
  return (
    <Fragment>
      <ShopHeader />
      <Sidebar />
      <Breadcrumb
        page={t("search-sellers")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <div className="ps-page--shop pt-5">
        <div className="ps-container">
          {/* <CategoryShopBanner />
          <CategoryShopBrand /> */}
          <CategoryLayout />
        </div>
      </div>
    </Fragment>
  );
};

export default withTranslation("shop")(Category);
