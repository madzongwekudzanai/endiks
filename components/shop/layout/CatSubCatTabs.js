import Head from "next/head";
import Pagination from "../../layout/Pagination";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getCatSubCatProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import SingleProduct2 from "./SingleProduct2";
import SingleProductTab1 from "./SingleProductTab1";

const CatSubCatGroupTabs = ({
  product: { categorySubCategoryProducts, loadingCategorySubCategoryProducts },
  shopLoading: { paginationLoading },
  language: { loc },
  getCatSubCatProducts,
}) => {
  const router = useRouter();
  const { category, sub_category, page_number } = router.query;
  useEffect(() => {
    getCatSubCatProducts(
      category.split("-").join("&"),
      sub_category.split("-").join("&"),
      page_number,
      loc
    );
  }, [page_number, category, sub_category]);
  return (
    <Fragment>
      <Head>
        <title>{`${category} / ${sub_category} - Endiks`}</title>
        <meta name="description" content={`${category} / ${sub_category}`} />
      </Head>
      <div className="ps-tabs">
        {typeof window !== "undefined" && window.innerWidth > 929 ? (
          <div className="ps-tab active" id="tab-2">
            <div className="ps-shopping-product">
              {loadingCategorySubCategoryProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <Fragment>
                  {categorySubCategoryProducts.map((singleProd) => (
                    <SingleProductTab1
                      key={singleProd._id}
                      product={singleProd}
                    />
                  ))}
                </Fragment>
              )}
            </div>
            <Pagination what="category_sub_category" />
          </div>
        ) : (
          <div className="ps-tab active" id="tab-1">
            <div className="ps-shopping-product">
              {loadingCategorySubCategoryProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <div className="row">
                  {categorySubCategoryProducts.map((singleProd) => (
                    <SingleProduct2 key={singleProd._id} product={singleProd} />
                  ))}
                </div>
              )}
            </div>
            <Pagination what="category_sub_category" />
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

export default connect(mapStateToProps, { getCatSubCatProducts })(
  CatSubCatGroupTabs
);
