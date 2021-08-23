import Breadcrumb from "../layout/Breadcrumb";
import { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { getBuyerOrderProducts } from "../../actions/orders";
import Link from "next/link";
import { withTranslation } from "../../i18n";
import { compose } from "redux";
import LazyLoadImage from "../layout/LazyLoadImage";

const OrderDetail = ({
  orders: {
    buyerOrderProducts,
    buyerOrderProductsLoading,
    originalBuyerOrderProducts,
    originalBuyerOrderProductsLoading,
  },
  getBuyerOrderProducts,
  t
}) => {
  const router = useRouter();
  const { order_id } = router.query;
  useEffect(() => {
    order_id && getBuyerOrderProducts(order_id);
  }, [order_id]);
  return (
    <div className="ps-page--simple">
      <Breadcrumb
        page={t("order-detail")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      <div className="container mt-5">
        <div className="ps-block--vendor-dashboard">
          <div className="ps-block__header">
            <h3 className="figCap">{t("order-id")}: {order_id}</h3>
          </div>
          <div className="ps-block__content">
            <div className="table-responsive">
              <table className="table ps-table ps-table--vendor">
                <thead>
                  <tr>
                    <th>
                      <i className="lnr lnr-picture"></i>
                    </th>
                    <th>{t("title")}</th>
                    <th>{t("quantity")}</th>
                  </tr>
                </thead>
                <tbody>
                  {buyerOrderProductsLoading ||
                  originalBuyerOrderProductsLoading ||
                  buyerOrderProducts.length <= 0 ? (
                    <span className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="sr-only">{t("loading")}</span>
                      </div>
                    </span>
                  ) : (
                    <Fragment>
                      {buyerOrderProducts.map(({ _id, title, slides }) => (
                        <tr key={_id}>
                          <td>
                            <LazyLoadImage height={50}>
                              <Link href={`/products/product_detail?product_id=${_id}`}>
                                <a>
                                  <img src={slides[0]} alt={title} width="50" />
                                </a>
                              </Link>
                            </LazyLoadImage>
                          </td>
                          <td>
                            <Link href={`/products/product_detail?product_id=${_id}`}>
                              <a>{title}</a>
                            </Link>
                          </td>
                          <td>
                            {
                              originalBuyerOrderProducts[
                                originalBuyerOrderProducts
                                  .map((item) => item.productId)
                                  .indexOf(_id)
                              ].quantity
                            }
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default compose(
  connect(mapStateToProps, { getBuyerOrderProducts }),
  withTranslation("orders")
)(OrderDetail);