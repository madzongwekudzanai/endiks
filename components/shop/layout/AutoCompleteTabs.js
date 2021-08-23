import Head from "next/head";
import Pagination from "../../layout/Pagination";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { searchAutocompleteSellerProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import SingleProduct2 from "./SingleProduct2";

const AutoCompleteTabs = ({
  product: {
    autocompletedSellerSearchProducts,
    loadingAutocompletedSellerSearchProducts,
  },
  shopLoading: { paginationLoading },
  searchAutocompleteSellerProducts,
}) => {
  const router = useRouter();
  const { search_query, page_number, store_id } = router.query;
  useEffect(() => {
    searchAutocompleteSellerProducts(search_query, store_id, page_number);
  }, [page_number, search_query, store_id]);
  return (
    <Fragment>
      <Head>
        <title>{`Search results - ${search_query} - Endiks`}</title>
        <meta name="description" content={search_query} />
      </Head>
      <div className="ps-tabs">
        <div className="ps-tab active" id="tab-1">
          <div className="ps-shopping-product">
            {loadingAutocompletedSellerSearchProducts || paginationLoading ? (
              <span className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">loading...</span>
                </div>
              </span>
            ) : (
              <div className="row">
                <Fragment>
                  {autocompletedSellerSearchProducts.map((singleProd) => (
                    <SingleProduct2 key={singleProd._id} product={singleProd} />
                  ))}
                </Fragment>
              </div>
            )}
          </div>
          <Pagination what="autocompleted_products" />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  authSeller: state.authSeller,
  shopLoading: state.shopLoading,
});

export default connect(mapStateToProps, { searchAutocompleteSellerProducts })(
  AutoCompleteTabs
);
