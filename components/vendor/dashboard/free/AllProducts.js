import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import {
  getPaginatedSellerProducts,
  deleteProduct
} from "../../../../actions/product";
import { useEffect } from "react";
import { compose } from "redux";
import { Fragment } from "react";
import { withTranslation } from "../../../../i18n";
import Pagination from "../../../layout/Pagination";
import LazyLoadImage from "../../../layout/LazyLoadImage";
import PriceFormat from "../../../layout/landing/PriceFormat";

const AllProducts = ({
  product: { paginatedSellerProducts, loadingPaginatedSellerProducts },
  formLoading,
  getPaginatedSellerProducts,
  shopLoading: { paginationLoading },
  deleteProduct,
  t,
}) => {
  const router = useRouter();
  const { page_number, store_id } = router.query;
  useEffect(() => {
    getPaginatedSellerProducts(store_id, page_number);
  }, [page_number, paginatedSellerProducts.length]);
  return (
    <div className="ps-block--vendor-dashboard">
      <div className="ps-block__header">
        <h3 className="figCap">{t("all-products")}</h3>
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
      <div className="ps-block__content">
        <div className="table-responsive">
          {!loadingPaginatedSellerProducts &&
          paginatedSellerProducts.length <= 0 ? (
            <span>
              {t("no-products")}{" "}
              <Link
                href="/seller/products/add-product"
              >
                <a>{t("add-product")}</a>
              </Link>
            </span>
          ) : (
            <Fragment>
              <table className="table products-table-min ps-table ps-table--vendor">
                <thead>
                  <tr>
                    <th>
                      <i className="lnr lnr-picture"></i>
                    </th>
                    <th>{t("product-title")}</th>
                    <th>{t("price")}</th>
                    <th>{t("quantity")}</th>
                    <th>{t("options")}</th>
                    <th>{t("status")}</th>
                    <th>{t("edit-delete")}</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingPaginatedSellerProducts || paginationLoading ? (
                    <Fragment>
                      <span className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">{t("loading")}</span>
                        </div>
                      </span>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {paginatedSellerProducts.map(
                        ({
                          _id,
                          locale,
                          currencyCode,
                          price,
                          quantity,
                          titles,
                          slides,
                          optionsLevel
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
                              <Link href={`/products/product_detail?product_id=${_id}`}><a>{titles.seller}</a></Link>
                            </td>
                            <td>
                              <PriceFormat 
                              locale={locale}
                              currencyCode={currencyCode}
                              price={price} />
                            </td>
                            <td>{quantity}</td>
                            <td>{optionsLevel} {
                              optionsLevel < 4 && (
                              <Link href={`/seller/products/add-product?quantity=options&product_id=${_id}`}>
                              <a>
                                <i
                                title={t("add-level-options", {optionsLevel: (optionsLevel+1)})}
                                className="lnr lnr-plus-circle"
                              ></i>
                              </a>
                              </Link>
                              )
                            }</td>
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
                            </td>
                            <td>
                              {formLoading.deleteLoading ? (
                                <Fragment>
                                  <span className="d-flex justify-content-center">
                                    <div
                                      className="spinner-border"
                                      role="status"
                                    >
                                      <span className="sr-only">
                                        {t("loading")}
                                      </span>
                                    </div>
                                  </span>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <Link
                                    href={`/seller/products/edit-product?product_id=${_id}`}
                                  >
                                    <a className="px-3">
                                      <i
                                        title={t("edit")}
                                        className="lnr lnr-pencil"
                                      ></i>
                                    </a>
                                  </Link>
                                  /
                                  <a
                                    onClick={() => {
                                      deleteProduct(_id, t("product-deleted"));
                                    }}
                                    className="px-3 pointer-cursor"
                                  >
                                    <i
                                      style={{ color: "red" }}
                                      title={t("delete")}
                                      className="lnr lnr-trash"
                                    ></i>
                                  </a>
                                </Fragment>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </Fragment>
                  )}
                </tbody>
              </table>
            </Fragment>
          )}
        </div>
        <Pagination what="seller_products" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
  formLoading: state.formLoading,
  shopLoading: state.shopLoading,
  authSeller: state.authSeller,
});

export default compose(
  connect(mapStateToProps, {
    getPaginatedSellerProducts,
    deleteProduct
  }),
  withTranslation("dashboard")
)(AllProducts);
