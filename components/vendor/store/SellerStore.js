import Breadcrumb from "../../layout/Breadcrumb";
import Left from "./Left";
import Filter from "./right/Filter";
import { useRouter } from "next/router";
// import BestSeller from "./right/BestSeller";
// import ProductsHeader from "../../shop/layout/ProductsHeader";
import ProductsTabs from "../../shop/layout/ProductsTabs";
import AutoCompleteTabs from "../../shop/layout/AutoCompleteTabs";
import SearchProductsTabs from "../../shop/layout/SearchProductsTabs";
import { withTranslation } from "../../../i18n";

const SellerStore = ({ t }) => {
  const router = useRouter();
  const { search } = router.query;
  return (
    <div className="ps-page--single">
      <Breadcrumb
        page={t("seller-store")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <div className="ps-vendor-store">
        <div className="container">
          <div className="ps-section__container">
            <Left />
            <div className="ps-section__right">
              <Filter />
              {/* <BestSeller /> */}
              <div className="ps-shopping ps-tab-root">
                {/* <ProductsHeader /> */}
                {search === "true" ? (
                  <AutoCompleteTabs />
                ) : search === "false" ? (
                  <SearchProductsTabs />
                ) : (
                  <ProductsTabs />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("shop")(SellerStore);
