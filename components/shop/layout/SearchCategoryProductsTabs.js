import Pagination from "../../layout/Pagination";
import Head from "next/head";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { searchCategoryProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import SingleProductTab1 from "./SingleProductTab1";
import SingleProduct2 from "./SingleProduct2";

const SearchCategoryProductsTabs = ({
  product: { searchedCategoryProducts, loadingSearchedCategoryProducts },
  searchCategoryProducts,
  shopLoading: { paginationLoading },
  language: { loc }
}) => {
  const router = useRouter();
  const { page_number, category, search_query } = router.query;
  useEffect(() => {
    searchCategoryProducts(
      search_query,
      category.split("-").join("&"),
      page_number,
      loc
    );
  }, [page_number]);
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
              {loadingSearchedCategoryProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <Fragment>
                  {searchedCategoryProducts.map((singleProd) => (
                    <SingleProductTab1
                      key={singleProd._id}
                      product={singleProd}
                    />
                  ))}
                </Fragment>
              )}
            </div>
            <Pagination what="all_search_category_products" />
          </div>
        ) : (
          <div className="ps-tab active" id="tab-1">
            <div className="ps-shopping-product">
              {loadingSearchedCategoryProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <div className="row">
                  {searchedCategoryProducts.map((singleProd) => (
                    <SingleProduct2 key={singleProd._id} product={singleProd} />
                  ))}
                </div>
              )}
            </div>
            <Pagination what="all_search_category_products" />
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

export default connect(mapStateToProps, { searchCategoryProducts })(
  SearchCategoryProductsTabs
);
