import Head from "next/head";
import Pagination from "../../layout/Pagination";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getCatSubCatGroupProducts } from "../../../actions/product";
import { useEffect, Fragment } from "react";
import SingleProduct2 from "./SingleProduct2";
import SingleProductTab1 from "./SingleProductTab1";

const CatSubCatGroupTabs = ({
  product: {
    categorySubCategoryGroupProducts,
    loadingCategorySubCategoryGroupProducts,
  },
  shopLoading: { paginationLoading },
  language: { loc },
  getCatSubCatGroupProducts,
}) => {
  const router = useRouter();
  const { category, sub_category, group, page_number } = router.query;
  useEffect(() => {
    getCatSubCatGroupProducts(
      category.split("-").join("&"),
      sub_category.split("-").join("&"),
      group.split("-").join("&"),
      page_number,
      loc
    );
  }, [page_number, category, sub_category, group]);
  return (
    <Fragment>
      <Head>
        <title>{`${category} / ${sub_category} / ${group} - Endiks`}</title>
        <meta
          name="description"
          content={`${category} / ${sub_category} / ${group}`}
        />
      </Head>
      <div className="ps-tabs">
        {typeof window !== "undefined" && window.innerWidth > 929 ? (
          <div className="ps-tab active" id="tab-2">
            <div className="ps-shopping-product">
              {loadingCategorySubCategoryGroupProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <Fragment>
                  {categorySubCategoryGroupProducts.map((singleProd) => (
                    <SingleProductTab1
                      key={singleProd._id}
                      product={singleProd}
                    />
                  ))}
                </Fragment>
              )}
            </div>
            <Pagination what="category_sub_category_group" />
          </div>
        ) : (
          <div className="ps-tab active" id="tab-1">
            <div className="ps-shopping-product">
              {loadingCategorySubCategoryGroupProducts || paginationLoading ? (
                <span className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">loading...</span>
                  </div>
                </span>
              ) : (
                <div className="row">
                  {categorySubCategoryGroupProducts.map((singleProd) => (
                    <SingleProduct2 key={singleProd._id} product={singleProd} />
                  ))}
                </div>
              )}
            </div>
            <Pagination what="category_sub_category_group" />
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

export default connect(mapStateToProps, { getCatSubCatGroupProducts })(
  CatSubCatGroupTabs
);
