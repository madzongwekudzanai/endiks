import Left from "./Left";
import Right from "./Right";
import { Fragment } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "../../../i18n";
// import CustomerBought from "./CustomerBought";
// import RelatedProducts from "./RelatedProducts";

const Product = ({ product: { singleProduct }, t }) => {
  return (
    <Fragment>
      <Head>
        <title>{`${
          singleProduct ? singleProduct.title : t("loading")
        } - Endiks`}</title>
        <meta
          name="description"
          content={singleProduct ? singleProduct.title : t("loading")}
        />
      </Head>
      <div className="ps-page--product">
        <div className="ps-container">
          <div className="ps-page__container">
            {!singleProduct ? (
              <span className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">{t("loading")}</span>
                </div>
              </span>
            ) : (
              <Fragment>
                <Left />
                <Right />
              </Fragment>
            )}
          </div>
          {/* <CustomerBought />
        <RelatedProducts /> */}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default compose(
  connect(mapStateToProps, null),
  withTranslation("product")
)(Product);
