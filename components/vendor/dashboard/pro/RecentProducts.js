import Link from "next/link";
import { connect } from "react-redux";
import { getRecentProducts } from "../../../../actions/product";
import { useEffect, Fragment } from "react";
import Moment from "react-moment";
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";
import PriceFormat from "../../../layout/landing/PriceFormat";
import LazyLoadImage from "../../../layout/LazyLoadImage";

const RecentProducts = ({
  product: { loading, recentProducts },
  getRecentProducts,
  authSeller: { seller },
  t,
}) => {
  useEffect(() => {
    getRecentProducts();
  }, [getRecentProducts]);
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
      <figure className="ps-block--vendor-status table-responsive">
        <div className="text-box">
          <figcaption className="figCap">{t("latest-products")}</figcaption>
          <div className="dropdown show">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle textBoxBtn btn-lg dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {t("add-product")}
            </button>
            <div style={{ fontSize: 14 }} className="dropdown-menu">
              <Link href="/seller/products/add-product">
                <a className="dropdown-item">{t("single")}</a>
              </Link>
              <Link href="/seller/products/add-product?quantity=multiple">
                <a className="dropdown-item">{t("bulk")}</a>
              </Link>
            </div>
          </div>
        </div>
        <table className="table ps-table ps-table--vendor">
          <thead>
            <tr>
              <th>
                <i className="lnr lnr-picture"></i>
              </th>
              <th>{t("product-title")}</th>
              <th>{t("status")}</th>
            </tr>
          </thead>
          {!loading && recentProducts.length <= 0 ? (
            <span>
              {t("no-products")}{" "}
              <Link href="/seller/products/add-product">
                <a>{t("add-product")}</a>
              </Link>
            </span>
          ) : (
            <Fragment>
              <tbody>
                {loading ? (
                  <Fragment>
                    <span className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">{t("loading")}</span>
                      </div>
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    {recentProducts.map(
                      ({
                        _id,
                        locale,
                        currencyCode,
                        price,
                        quantity,
                        date,
                        titles,
                        slides,
                      }) => (
                        <tr key={_id}>
                          <td>
                            <LazyLoadImage height={50} width={50}>
                              <Link href={`/products/product_detail?product_id=${_id}`}>
                                <a>
                                  <img
                                  src={slides[0]}
                                  alt={titles.seller}
                                  width="50"
                                  />
                                </a>
                              </Link>
                            </LazyLoadImage>
                          </td>
                          <td>
                            <Link href={`/products/product_detail?product_id=${_id}`}>
                              <a>{titles.seller}</a>
                            </Link>
                            <p>
                              <PriceFormat 
                              locale={locale}
                              currencyCode={currencyCode}
                              price={price} />
                            </p>
                          </td>
                          <td>
                            {quantity > 0 ? (
                              <p className="ps-tag--in-stock">
                                {t("in-stock")}
                              </p>
                            ) : (
                              <p className="ps-tag--out-stock">
                                {t("out-stock")}
                              </p>
                            )}
                            <p>
                              {t("creation-date")}{" "}
                              <Moment format="YYYY/MM/DD">{date}</Moment>
                            </p>
                          </td>
                        </tr>
                      )
                    )}
                  </Fragment>
                )}
              </tbody>
            </Fragment>
          )}
        </table>
        {!loading && recentProducts.length > 0 && (
          <div className="ps-block__footer">
            <Link
              href={`?page=products&store_id=${
                seller && seller._id
              }&page_number=1`}
            >
              <a>{t("view-all-products")}</a>
            </Link>
          </div>
        )}
      </figure>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  authSeller: state.authSeller,
});

export default compose(
  connect(mapStateToProps, { getRecentProducts }),
  withTranslation("dashboard")
)(RecentProducts);
