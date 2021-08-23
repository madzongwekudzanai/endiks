import Link from "next/link";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getRecentFreightOrders, getFreightOrders } from "../../../../actions/orders";
import { compose } from "redux";
import { Fragment, useEffect } from "react";
import { withTranslation } from "../../../../i18n";

const RecentOrders = ({
  orders: { recentFreightOrders, recentFreightOrdersLoading, freightOrdersLoading },
  getRecentFreightOrders,
  getFreightOrders,
  t,
}) => {
  useEffect(() => {
    getRecentFreightOrders();
    getFreightOrders()
  }, []);
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
      <figure className="ps-block--vendor-status table-responsive">
        <figcaption>{t("recent-orders-title")}</figcaption>
        <table className="table ps-table ps-table--vendor">
          <thead>
            <tr>
              <th>{t("supplier-track-code")}</th>
              <th>{t("order-detail")}</th>
              <th>{t("total")}</th>
            </tr>
          </thead>
          {recentFreightOrdersLoading || freightOrdersLoading ? (
            <span className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">{t("loading")}</span>
              </div>
            </span>
          ) : (
            <tbody>
              {recentFreightOrders.map(
                ({
                  _id,
                  seller: { dateSent, trackingCode },
                  freight
                }) => (
                  <tr key={_id}>
                    <td>
                      <Link
                        href={`/freight/dashboard?page=order_detail&order_id=${_id}`}
                      >
                        <a className="text-trunk">{trackingCode}</a>
                      </Link>
                      <p>
                        <Moment format="YYYY/MM/DD">{dateSent}</Moment>
                      </p>
                    </td>
                    <td>
                      <Link
                        href={`/freight/dashboard?page=order_detail&order_id=${_id}`}
                      >
                        <a>{t("see-details")}</a>
                      </Link>
                      <p>{t("shipping")}</p>
                    </td>
                    <td>
                      <p>
                      {freight.actualWeight ? t("kg", {kg: freight.actualWeight}) : t("null")}
                      </p>
                      <p>
                      {freight.shipping ? <PriceFormat 
                          locale={freight.locale}
                          currencyCode={freight.currencyCode}
                          price={freight.shipping} /> : t("null")}
                      </p>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          )}
        </table>
        {!recentFreightOrdersLoading && recentFreightOrders.length > 0 && (
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
  connect(mapStateToProps, { getRecentFreightOrders, getFreightOrders }),
  withTranslation("dashboard")
)(RecentOrders);
