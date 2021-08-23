import Breadcrumb from "../layout/Breadcrumb";
import { useState, Fragment } from "react";
import { connect } from "react-redux";
import { trackOrder } from "../../actions/orders";
import { withTranslation } from "../../i18n";
import { compose } from "redux";
import PriceFormat from "../layout/landing/PriceFormat";

const Tracking = ({ orders: { trackedOrder }, shopLoading, trackOrder, payment: { rate }, t }) => {
  const [orderId, setOrderId] = useState("");
  return (
    <div className="ps-page--simple">
      <Breadcrumb
        page={t("order-tracking")}
        pages={[
          {
            text: t("home"),
            location: "/",
          },
        ]}
      />
      {!trackedOrder && (
        <div className="ps-order-tracking">
          <div className="container">
            <div className="ps-section__header">
              <h3>{t("order-tracking")}</h3>
              <p>
                {t("track-desc")}
              </p>
            </div>
            <div className="ps-section__content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  trackOrder(orderId);
                }}
                className="ps-form--order-tracking"
              >
                <div className="form-group">
                  <label>{t("order-id")}</label>
                  <input
                    disabled={shopLoading}
                    value={orderId}
                    onChange={(e) => {
                      setOrderId(e.target.value);
                    }}
                    required
                    className="form-control"
                    type="text"
                    placeholder={t("enter-order-id")}
                  />
                </div>
                {/* <div className="form-group">
                <label>Billing Email</label>
                <input className="form-control" type="text" placeholder="" />
              </div> */}
                <div className="form-group">
                  <button
                    disabled={shopLoading}
                    type="submit"
                    className="ps-btn ps-btn--fullwidth"
                  >
                    {t("tack-your-order")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="container mt-5">
        {trackedOrder && (
          <div className="ps-block--vendor-dashboard">
            <div className="ps-block__header">
              <h3 className="figCap">{t("current-location")}</h3>
            </div>
            <ul>
              <li>
                <Fragment>{trackedOrder.currentLocation}</Fragment>
              </li>
            </ul>
            <div className="ps-block__header">
              <h3 className="figCap">{t("order-details")}</h3>
            </div>
            <div className="ps-block__content">
              <div className="table-responsive">
                <table className="table ps-table ps-table--vendor">
                  <thead>
                    <tr>
                      {
                        trackedOrder.freight.freightSent && (
                          <Fragment>
                            <th>{t("freight-tracking-code")}</th>
                            <th>{t("shipping-cost")}</th>
                            <th>{t("actual-weight")}</th>
                          </Fragment>
                        )
                      }
                      <th>{t("seller-sent")}</th>
                      <th>{t("freight-received")}</th>
                      <th>{t("freight-sent")}</th>
                      <th>{t("ready-for-collection")}</th>
                      <th>{t("buyer-received")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {
                        trackedOrder.freight.freightSent && (
                          <Fragment>
                            <td>
                              {trackedOrder.freight.trackingCode}
                            </td>
                            <td>
                              <PriceFormat 
                              locale="en-US"
                              currencyCode="USD"
                              price={trackedOrder.freight.shipping*rate} />
                            </td>
                            <td>
                              {trackedOrder.freight.actualWeight}
                            </td>
                          </Fragment>
                        )
                      }
                      <td>
                        <span className={trackedOrder.seller.sent ? "ps-tag--in-stock" : "ps-tag--out-stock"}>{trackedOrder.seller.sent ? t("true") : t("false")}</span>
                      </td>
                      <td>
                        <span className={trackedOrder.freight.freightReceived ? "ps-tag--in-stock" : "ps-tag--out-stock"}>{trackedOrder.freight.freightReceived ? t("true") : t("false")}</span>
                      </td>
                      <td>
                        <span className={trackedOrder.freight.freightSent ? "ps-tag--in-stock" : "ps-tag--out-stock"}>{trackedOrder.freight.freightSent ? t("true") : t("false")}</span>
                      </td>
                      <td>
                        <span className={trackedOrder.buyer.readyForCollection ? "ps-tag--in-stock" : "ps-tag--out-stock"}>{trackedOrder.buyer.readyForCollection ? t("true") : t("false")}</span>
                      </td>
                      <td>
                        <span className={trackedOrder.buyer.received ? "ps-tag--in-stock" : "ps-tag--out-stock"}>{trackedOrder.buyer.received ? t("true") : t("false")}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shopLoading: state.shopLoading.orderLoading,
  payment: state.payment,
  orders: state.orders,
});

export default compose(
  connect(mapStateToProps, { trackOrder }),
  withTranslation("tracking")
)(Tracking);
