import { connect } from "react-redux";
import { getSellerOrders } from "../../../../actions/orders";
import { useEffect } from "react";
import Link from "next/link";
import { compose } from "redux";
import Moment from "react-moment";
import { withTranslation } from "../../../../i18n";
import PriceFormat from "../../../layout/landing/PriceFormat";

const RecentOrders = ({
  orders: { sellerOrdersLoading, sellerOrders },
  getSellerOrders,
  t,
}) => {
  useEffect(() => {
    getSellerOrders();
  }, [getSellerOrders]);
  return (
    <div className="ps-block--vendor-dashboard">
      <div className="ps-block__header">
        <h3>{t("orders")}</h3>
      </div>
      <div className="ps-block__content">
        <div className="table-responsive">
          <table className="table ps-table ps-table--vendor">
            <thead>
              <tr>
                <th>{t("date")}</th>
                <th>{t("order-id")}</th>
                <th>{t("tracking-code")}</th>
                <th>{t("shipping")}</th>
                <th>{t("total")}</th>
                <th>{t("status")}</th>
                <th>{t("see-details")}</th>
              </tr>
            </thead>
            {sellerOrdersLoading ? (
              <span className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">{t("loading")}</span>
                </div>
              </span>
            ) : (
              <tbody>
                {sellerOrders.map(
                  ({
                      _id, 
                      buyer: { received, dateOrdered }, 
                      seller: { trackingCode, sent, locale, currencyCode, shipping, totalPrice }
                  }) => (
                    <tr>
                      <td>
                        <Moment format="YYYY/MM/DD">{dateOrdered}</Moment>
                      </td>
                      <td className="text-trunk-order-cover">
                        <Link
                          href={`/seller/dashboard?page=order_detail&order_id=${_id}`}
                        >
                          <a className="text-trunk-order">{_id}</a>
                        </Link>
                      </td>
                      <td>
                        {trackingCode ? trackingCode : t("null")}
                      </td>
                      <td>
                        <PriceFormat 
                        locale={locale}
                        currencyCode={currencyCode}
                        price={shipping} />
                      </td>
                      <td>
                        <PriceFormat 
                        locale={locale}
                        currencyCode={currencyCode}
                        price={totalPrice} />
                      </td>
                      <td>
                        {!sent ? (
                            <span className="ps-tag--out-stock">
                              {t("pending")}
                            </span>
                          ) : (sent && !received) ? (
                            <span>
                              {t("in-transit")}
                            </span>
                          ) : (sent && received) && (
                            <span className="ps-tag--in-stock">
                              {t("received")}
                            </span>
                          )}
                      </td>
                      <td>
                        <Link
                          href={`/seller/dashboard?page=order_detail&order_id=${_id}`}
                        >
                          <a>{t("see-details")}</a>
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default compose(
  connect(mapStateToProps, { getSellerOrders }),
  withTranslation("dashboard")
)(RecentOrders);
