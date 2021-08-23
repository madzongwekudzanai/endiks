import { Fragment } from "react";
import ProductHeader from "../layout/header/ProductHeader";
import Sidebar from "../layout/header/Sidebar";
import ShopNavigation from "../layout/header/ShopNavigation";
import BottomNavigationMobile from "./layout/BottomNavigationMobile";
import Breadcrumb from "../layout/Breadcrumb";
import Product from "./product/Product";
import { connect } from "react-redux";
import { compose } from "redux";
import { getProduct } from "../../actions/product";
import { setOptionFormData } from "../../actions/common";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withTranslation } from "../../i18n";

const ProductDetail = ({
  product: { productLoading, singleProduct },
  authSeller: {isAuthenticated},
  getProduct,
  setOptionFormData,
  t
}) => {
  const router = useRouter();
  const {product_id} = router.query
  useEffect(() => {
    getProduct({id: product_id})
    setOptionFormData("firstOptionProductRef", (singleProduct && singleProduct.firstOptionProductRef) && singleProduct.firstOptionProductRef)
    setOptionFormData("secondOptionProductRef", (singleProduct && singleProduct.secondOptionProductRef) && singleProduct.secondOptionProductRef)
    setOptionFormData("thirdOptionProductRef", (singleProduct && singleProduct.thirdOptionProductRef) && singleProduct.thirdOptionProductRef)
    setOptionFormData("fourthOptionProductRef", (singleProduct && singleProduct.fourthOptionProductRef) && singleProduct.fourthOptionProductRef)
  }, []);
  return (
    <Fragment>
      {productLoading && !singleProduct ? (
        <span className="col d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t("loading")}</span>
          </div>
        </span>
      ) : (
        <ProductHeader />
      )}
      <header
        id="mobileHeader"
        className="header header--mobile header--mobile-product"
        data-sticky="true"
      >
        <ShopNavigation title={t("home")} />
      </header>
      {
        isAuthenticated ? (
          <Sidebar />
        ) : (
          <BottomNavigationMobile />
        )
      }
      <Breadcrumb
        page={t("product-detail")}
        pages={[
          {
            text: t("home"),
            location: isAuthenticated ? "/seller/dashboard" : "/",
          },
        ]}
      />
      {productLoading && !singleProduct ? (
        <span className="col d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t("loading")}</span>
          </div>
        </span>
      ) : (
        <Product />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  productOption: state.productOption,
  authSeller: state.authSeller,
});

export default compose(
  connect(mapStateToProps, { getProduct, setOptionFormData }),
  withTranslation("product")
)(ProductDetail);
