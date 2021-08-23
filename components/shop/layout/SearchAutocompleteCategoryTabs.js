import Pagination from "../../layout/Pagination";
import { useRouter } from "next/router";
import Head from "next/head";
import { connect } from "react-redux";
import { searchAutocompleteCategoryProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import SingleProduct2 from "./SingleProduct2";
import SingleProductTab1 from "./SingleProductTab1";

const SearchAutocompleteCategoryTabs = ({
  product: {
    autocompletedSearchCategoryProducts,
    loadingAutocompletedSearchCategoryProducts,
  },
  language: { loc },
  searchAutocompleteCategoryProducts,
  shopLoading: { paginationLoading },
}) => {
  const router = useRouter();
  const { page_number, category, search_query } = router.query;
  useEffect(() => {
    searchAutocompleteCategoryProducts(
      search_query,
      category.split("-").join("&"),
      page_number,
      loc
    );
  }, [category, search_query, page_number]);
  return (
    <Fragment>
      <Head>
        <title>{`Search results - ${search_query} - Endiks`}</title>
        <meta name="description" content={search_query} />
      </Head>
      <div className="ps-tabs">
        {typeof window !== "undefined" && window.innerWidth > 929 ? (
          <div className="ps-tab active" id="tab-2">
            <div className="ps-shopping-product">
              {loadingAutocompletedSearchCategoryProducts ||
              paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <Fragment>
                  {autocompletedSearchCategoryProducts.map((singleProd) => (
                    <SingleProductTab1
                      key={singleProd._id}
                      product={singleProd}
                    />
                  ))}
                </Fragment>
              )}
            </div>
            <Pagination what="autocompleted_category_products" />
          </div>
        ) : (
          <div className="ps-tab active" id="tab-1">
            <div className="ps-shopping-product">
              {loadingAutocompletedSearchCategoryProducts ||
              paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <div className="row">
                  {autocompletedSearchCategoryProducts.map((singleProd) => (
                    <SingleProduct2 key={singleProd._id} product={singleProd} />
                  ))}
                </div>
              )}
            </div>
            <Pagination what="autocompleted_category_products" />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  shopLoading: state.shopLoading,
  language: state.language
});

export default connect(mapStateToProps, { searchAutocompleteCategoryProducts })(
  SearchAutocompleteCategoryTabs
);
