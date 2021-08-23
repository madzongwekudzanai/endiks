import Pagination from "../../layout/Pagination";
import { useRouter } from "next/router";
import Head from "next/head";
import { connect } from "react-redux";
import { searchAutocompleteProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import SingleProduct2 from "./SingleProduct2";
import SingleProductTab1 from "./SingleProductTab1";

const SearchAutocompleteProductsTabs = ({
  product: {
    autocompletedSearchedProducts,
    loadingAutocompletedSearchedProducts,
  },
  searchAutocompleteProducts,
  shopLoading: { paginationLoading },
}) => {
  const router = useRouter();
  const { page_number, search_query } = router.query;
  useEffect(() => {
    searchAutocompleteProducts(search_query, page_number);
  }, [search_query, page_number]);
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
              {loadingAutocompletedSearchedProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <Fragment>
                  {autocompletedSearchedProducts.map((singleProd) => (
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
              {loadingAutocompletedSearchedProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <div className="row">
                  {autocompletedSearchedProducts.map((singleProd) => (
                    <SingleProduct2 key={singleProd._id} product={singleProd} />
                  ))}
                </div>
              )}
            </div>
            <Pagination what="all_autocomplete_products" />
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  shopLoading: state.shopLoading,
});

export default connect(mapStateToProps, { searchAutocompleteProducts })(
  SearchAutocompleteProductsTabs
);
