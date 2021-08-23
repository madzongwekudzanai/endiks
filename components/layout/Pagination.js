import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { compose } from "redux";
import { withTranslation } from "../../i18n";

const Pagination = ({
  documentCount: {
    profilesCount,
    searchedProfilesCount,
    paginatedSellerProductsCount,
    autocompletedSellerSearchProductsCount,
    searchedSellerProductsCount,
    autocompletedSearchCategoryProductsCount,
    searchedProductsCount,
    autocompletedSearchedProductsCount,
    searchedCategoryProductsCount,
    categorySubCategoryGroupCount,
    categorySubCategoryCount,
  },
  what,
  t,
}) => {
  const router = useRouter();
  const { page_number } = router.query;
  const firstString = Object.keys(router.query)
    .filter((str) => str !== "page_number")
    .map((val) => `${val}=${router.query[val]}`)
    .join("&");
  const pages =
    what === "profiles"
      ? profilesCount
      : what === "seller_search"
      ? searchedProfilesCount
      : what === "seller_products"
      ? paginatedSellerProductsCount
      : what === "autocompleted_products"
      ? autocompletedSellerSearchProductsCount
      : what === "autocompleted_category_products"
      ? autocompletedSearchCategoryProductsCount
      : what === "searched_products"
      ? searchedSellerProductsCount
      : what === "all_searched_products"
      ? searchedProductsCount
      : what === "all_autocomplete_products"
      ? autocompletedSearchedProductsCount
      : what === "all_search_category_products"
      ? searchedCategoryProductsCount
      : what === "category_sub_category_group"
      ? categorySubCategoryGroupCount
      : what === "category_sub_category"
      ? categorySubCategoryCount
      : 0;
  return (
    <div className="ps-pagination">
      {pages > 0 && (
        <ul className="pagination">
          {Array.from(Array(pages).keys()).map((page) => {
            const pageNum = page + 1;
            const routPage = +page_number;
            return (
              <li key={page} className={pageNum === routPage ? "active" : null}>
                <Link
                  href={`${router.pathname}?${firstString}&page_number=${pageNum}`}
                >
                  <a>{pageNum}</a>
                </Link>
              </li>
            );
          })}
          {+page_number < pages ? (
            <li>
              <Link
                href={`${router.pathname}?${firstString}&page_number=${
                  +page_number + 1
                }`}
              >
                <a>
                  {t("next-page")}
                  <i className="lnr lnr-chevron-right"></i>
                </a>
              </Link>
            </li>
          ) : null}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  documentCount: state.documentCount,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("common")
)(Pagination);
