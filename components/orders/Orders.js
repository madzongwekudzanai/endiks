import Breadcrumb from "../layout/Breadcrumb";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getBuyerOrders } from "../../actions/orders";
import Link from "next/link";
import Moment from "react-moment";
import { withTranslation } from "../../i18n";
import { compose } from "redux";

const Orders = ({
  orders: { buyerOrders, buyerOrdersLoading },
  getBuyerOrders,
  t
}) => {
  useEffect(() => {
    getBuyerOrders();
  }, [getBuyerOrders]);
  return (
    <div className="ps-page--simple">
      <Breadcrumb
        page={t("orders")}
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
            <h3 className="figCap">{t("orders")}</h3>
          </div>
          <div className="ps-block__content">
            <div className="table-responsive">
              <table className="table ps-table ps-table--vendor">
                <thead>
                  <tr>
                    <th>{t("date-ordered")}</th>
                    <th>{t("order-id")}</th>
                    <th>{t("status")}</th>
                    <th>{t("estimate-weight")}</th>
                    <th>{t("information")}</th>
                  </tr>
                </thead>
                {buyerOrdersLoading ? (
                  <span className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">{t("loading")}</span>
                    </div>
                  </span>
                ) : (
                  <tbody>
                    {buyerOrders.map(
                      ({ _id, buyer: { received, dateOrdered }, seller: { sent, estimateWeight } }) => (
                        <tr>
                          <td>
                            <Moment format="MMM DD, YYYY">{dateOrdered}</Moment>
                          </td>
                          <td className="text-trunk-order-cover">
                            <Link
                              href={`/shop/orders/order-detail?order_id=${_id}`}
                            >
                              <a className="text-trunk-order">{_id}</a>
                            </Link>
                          </td>
                          <td>
                            {!sent
                              ? t("pending")
                              : sent && !received
                              ? t("in-transit")
                              : sent && received && t("received")}
                          </td>
                          <td>{estimateWeight}</td>
                          <td>
                            <Link
                              href={`/shop/orders/order-detail?order_id=${_id}`}
                            >
                              <a>{t("view-detail")}</a>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default compose(
  connect(mapStateToProps, { getBuyerOrders }),
  withTranslation("orders")
)(Orders);