import Breadcrumb from "../../../layout/Breadcrumb";
import SearchList from "./SearchList";
import { withTranslation } from "../../../../i18n";

const SearchResult = ({ t }) => {
  return (
    <div className="ps-page--single ps-page--vendor">
      <Breadcrumb
        page={t("search-sellers")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <SearchList />
    </div>
  );
};

export default withTranslation("shop")(SearchResult);
