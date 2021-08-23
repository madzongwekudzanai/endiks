import Link from "next/link";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getRecentSellerOrders } from "../../../../actions/orders";
import { compose } from "redux";
import { useEffect } from "react";
import { withTranslation } from "../../../../i18n";

const RecentOrders = ({
  orders: { recentSellerOrders, recentSellerOrdersLoading },
  getRecentSellerOrders,
  t,
}) => {
  useEffect(() => {
    getRecentSellerOrders();
  }, []);
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
      <figure className="ps-block--vendor-status table-responsive">
        <figcaption>{t("recent-orders-title")}</figcaption>
        <table className="table ps-table ps-table--vendor">
          <thead>
            <tr>
              <th>{t("order-id")}</th>
              <th>{t("order-detail")}</th>
              <th>{t("total")}</th>
            </tr>
          </thead>
          {recentSellerOrdersLoading ? (
            <span className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">{t("loading")}</span>
              </div>
            </span>
          ) : (
            <tbody>
              {recentSellerOrders.map(
                ({
                  _id,
                  buyer: { dateOrdered },
                  seller: { locale, currencyCode, totalPrice, shipping },
                }) => (
                  <tr key={_id}>
                    <td>
                      <Link
                        href={`/seller/dashboard?page=order_detail&order_id=${_id}`}
                      >
                        <a className="text-trunk">{_id}</a>
                      </Link>
                      <p>
                        <Moment format="YYYY/MM/DD">{dateOrdered}</Moment>
                      </p>
                    </td>
                    <td>
                      <Link
                        href={`/seller/dashboard?page=order_detail&order_id=${_id}`}
                      >
                        <a>{t("see-details")}</a>
                      </Link>
                      <p>{t("shipping")}</p>
                    </td>
                    <td>
                      <p>
                        {new Intl.NumberFormat(locale, {
                          style: "currency",
                          currency: currencyCode,
                        }).format(totalPrice)}
                      </p>
                      <p>
                        {new Intl.NumberFormat(locale, {
                          style: "currency",
                          currency: currencyCode,
                        }).format(shipping)}
                      </p>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          )}
        </table>
        {!recentSellerOrdersLoading && recentSellerOrders.length > 0 && (
          <div className="ps-block__footer">
            <Link href="?page=orders">
              <a>{t("view-all-orders")}</a>
            </Link>
          </div>
        )}
      </figure>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default compose(
  connect(mapStateToProps, { getRecentSellerOrders }),
  withTranslation("dashboard")
)(RecentOrders);
