import ProductsHeader from "../layout/ProductsHeader";
import SearchAutocompleteCategoryTabs from "../layout/SearchAutocompleteCategoryTabs";
import SearchAutocompleteProductsTabs from "../layout/SearchAutocompleteProductsTabs";
import SearchAllProductsTabs from "../layout/SearchAllProductsTabs";
import SearchCategoryProductsTabs from "../layout/SearchCategoryProductsTabs";
import CatSubCatGroupTabs from "../layout/CatSubCatGroupTabs";
import CatSubCatTabs from "../layout/CatSubCatTabs";
import { useRouter } from "next/router";

const CategoryItems = () => {
  const router = useRouter();
  const { search, category, sub_category, group } = router.query;
  return (
    <div className="ps-shopping ps-tab-root">
      <ProductsHeader />
      {search === "true" && category !== "All" ? (
        <SearchAutocompleteCategoryTabs />
      ) : search === "true" && category === "All" ? (
        <SearchAutocompleteProductsTabs />
      ) : search === "false" && category !== "All" ? (
        <SearchCategoryProductsTabs />
      ) : search === "false" && category === "All" ? (
        <SearchAllProductsTabs />
      ) : category && sub_category && !group ? (
        <CatSubCatTabs />
      ) : category && sub_category && group ? (
        <CatSubCatGroupTabs />
      ) : null}
    </div>
  );
};

export default CategoryItems;
