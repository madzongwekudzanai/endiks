import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { freightReceiveOrder, freightSendOrder, freightNotifyUser, confirmBuyerReceive } from "../../../../actions/orders";
import { useEffect, Fragment, useState } from "react";
import { compose } from "redux";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "../../../../i18n";
import PriceFormat from "../../../layout/landing/PriceFormat";

const OrderDetail = ({
  orders: {
    freightOrders,
    freightOrdersLoading
  },
  language: { loc },
  shopLoading: { orderLoading },
  freightReceiveOrder, 
  freightSendOrder, 
  freightNotifyUser, 
  confirmBuyerReceive,
  t,
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  const [formData, setFormData] = useState({
    actualWeight: "",
    shipping: "",
    trackingCode: "",
  });
  const { actualWeight,
    shipping,
    trackingCode } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFocus = (e) => {
    e.target.placeholder = "";
  };
  const onBlur = (e, text) => {
    e.target.placeholder = text;
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const { order_id } = router.query;
  const [trackedOrder, setTrackedOrder] = useState(null)
  useEffect(() => {
    setLocale(loc === "english" ? "en" : "zh");
    order_id && freightOrders.length > 0 && setTrackedOrder(freightOrders.filter(fre => fre._id === order_id)[0]);
  }, [loc]);
  return (
    <Fragment>
      {!trackedOrder ? (
        <span className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">{t("loading")}</span>
          </div>
        </span>
      ) : (
        <div className="ps-block--vendor-dashboard">
          <div className="ps-block__header">
            <h3 className="figCap">{t("order-detail")}</h3>
          </div>
          <ul>
            {
              trackedOrder.seller.trackingCode && (
                <li>
                  <strong>
                    {t("supplier-track-code")}
                  </strong>:{" "}
                  {trackedOrder.seller.trackingCode}
                </li>
              )
            }
            <li>
              <strong>
                {t("destination-country")}
              </strong>:{" "}
              {trackedOrder.freight.country[locale]}
            </li>
            {
              trackedOrder.freight.city[locale] && (
                <li>
              <strong>
                {t("destination-city")}
              </strong>:{" "}
              {trackedOrder.freight.city[locale]}
            </li>
              )
            }
            {
              trackedOrder.freight.stateObject && (
                <Fragment>
                  <li>
                    <strong>{t("destination-state")}</strong>:{" "}
                    {trackedOrder.freight.stateObject.state[locale]}
                  </li>
                  <li>
                    <strong>{t("destination-city-state")}</strong>:{" "}
                    {trackedOrder.freight.stateObject.city[locale]}
                  </li>
                </Fragment>
              )
            }
            <li>
              <strong>{t("freight-type")}</strong>:{" "}
              {trackedOrder.freight.freightType[locale]}
            </li>
            <li>
              <strong>{t("recipient-name")}</strong>:{" "}
              {trackedOrder.buyer.name}
            </li>
            <li>
              <strong>{t("recipient-phone")}</strong>:{" "}
              {trackedOrder.buyer.phone}
            </li>
            <li>
              <strong>{t("recipient-email")}</strong>:{" "}
              {trackedOrder.buyer.email}
            </li>
          </ul>
          <div className="ps-block__header">
            <h3 className="figCap">
                {t("order-id")}: {order_id}
            </h3>
            {(trackedOrder.seller.sent && !trackedOrder.freight.freightReceived) ? (
              <Fragment>
                <button
                  type="button"
                  onClick={handleShow}
                  disabled={orderLoading}
                  className="ps-btn textBoxBtn"
                >
                  {t("received-order")}
                </button>
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {t("freight-received-title", {orderId: trackedOrder.seller.trackingCode ? trackedOrder.seller.trackingCode : order_id})}
                    </Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                    <p>
                      {t("freight-received-body", {orderId: trackedOrder.seller.trackingCode ? trackedOrder.seller.trackingCode : order_id})}
                    </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        type="button"
                        disabled={orderLoading}
                        onClick={handleClose}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          freightReceiveOrder(order_id, t("freight-received-order", {trackingCode: trackedOrder.seller.trackingCode ? trackedOrder.seller.trackingCode : order_id}))
                          handleClose();
                        }}
                        disabled={orderLoading}
                      >
                        {t("received-order")}
                      </Button>
                    </Modal.Footer>
                </Modal>
              </Fragment>
            ) : (trackedOrder.freight.freightReceived && !trackedOrder.freight.freightSent) ? (
              <Fragment>
                <button
                  type="button"
                  onClick={handleShow}
                  disabled={orderLoading}
                  className="ps-btn textBoxBtn"
                >
                  {t("send-order")}
                </button>
                <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>{t("tracking-code")}</Modal.Title>
                  </Modal.Header>
                  <form
                    autoComplete="off"
                    onSubmit={(e) => {
                      e.preventDefault();
                      freightSendOrder(order_id, formData, t("freight-send-order", {orderId: order_id}))
                      handleClose();
                    }}
                  >
                    <Modal.Body>
                    <div className="form-group">
                      <label htmlFor="actualWeight">{t("weight")}</label>
                      <input
                        value={actualWeight}
                        className="form-control"
                        type="text"
                        name="actualWeight"
                        disabled={orderLoading}
                        required
                        onFocus={(e) => onFocus(e)}
                        onBlur={(e) => {
                          onBlur(e, t("weight-placeholder"));
                        }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder={t("weight-placeholder")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shipping">{t("shipping-cost")}</label>
                      <input
                        value={shipping}
                        className="form-control"
                        type="number"
                        step="0.1"
                        min="0"
                        name="shipping"
                        disabled={orderLoading}
                        required
                        onFocus={(e) => onFocus(e)}
                        onBlur={(e) => {
                          onBlur(e, t("shipping-cost-placeholder"));
                        }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder={t("shipping-cost-placeholder")}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="trackingCode">{t("tracking-code-optional")}</label>
                      <input
                        value={trackingCode}
                        className="form-control"
                        type="text"
                        required
                        name="trackingCode"
                        disabled={orderLoading}
                        onFocus={(e) => onFocus(e)}
                        onBlur={(e) => {
                          onBlur(e, t("tracking-code"));
                        }}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        placeholder={t("tracking-code")}
                      />
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        type="button"
                        disabled={orderLoading}
                        onClick={handleClose}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        type="submit"
                        disabled={orderLoading}
                        variant="success"
                      >
                        {t("send-order")}
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </Fragment>
            ) : (trackedOrder.freight.freightSent && !trackedOrder.buyer.readyForCollection) ? (
              <Fragment>
                <button
                type="button"
                onClick={handleShow}
                disabled={orderLoading}
                className="ps-btn textBoxBtn"
              >
                {t("notify-user-button")}
              </button>
              <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {t("notify-title", {name: trackedOrder.buyer.name})}
                    </Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                    <p>
                      {t("notify-user", {orderId: trackedOrder.freight.trackingCode ? trackedOrder.freight.trackingCode : order_id})}
                    </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        type="button"
                        disabled={orderLoading}
                        onClick={handleClose}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          freightNotifyUser(order_id, t("freight-notify-user", {name: trackedOrder.buyer.name, orderId : order_id}))
                          handleClose();
                        }}
                        disabled={orderLoading}
                      >
                        {t("notify-user-button")}
                      </Button>
                    </Modal.Footer>
                </Modal>
              </Fragment>
            ) : (trackedOrder.buyer.readyForCollection && !trackedOrder.buyer.received) && (
              <Fragment>
                <button
                type="button"
                onClick={handleShow}
                disabled={orderLoading}
                className="ps-btn textBoxBtn"
              >
                {t("user-received-button")}
              </button>
              <Modal
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {t("user-received-title", {name: trackedOrder.buyer.name, orderId : trackedOrder.freight.trackingCode ? trackedOrder.freight.trackingCode : order_id})}
                    </Modal.Title>
                  </Modal.Header>
                    <Modal.Body>
                    <p>
                      {t("user-received-body", {name: trackedOrder.buyer.name, orderId : trackedOrder.freight.trackingCode ? trackedOrder.freight.trackingCode : order_id})}
                    </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="danger"
                        type="button"
                        disabled={orderLoading}
                        onClick={handleClose}
                      >
                        {t("cancel")}
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          confirmBuyerReceive(order_id, t("user-received", {name: trackedOrder.buyer.name, orderId: trackedOrder.freight.trackingCode ? trackedOrder.freight.trackingCode : order_id}))
                          handleClose();
                        }}
                        disabled={orderLoading}
                      >
                        {t("user-received-button")}
                      </Button>
                    </Modal.Footer>
                </Modal>
              </Fragment>
            )}
          </div>
          {
            (trackedOrder.freight.shipping && trackedOrder.freight.actualWeight) && (
              <div className="ps-block__content">
                <div className="table-responsive">
                  <Fragment>
                    <table className="table ps-table ps-table--vendor">
                      <thead>
                        <tr>
                          <th>{t("shipping")}</th>
                          <th>{t("order-weight")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                          <PriceFormat 
                          locale={trackedOrder.freight.locale}
                          currencyCode={trackedOrder.freight.currencyCode}
                          price={trackedOrder.freight.shipping} />
                          </td>
                          <td>
                            {trackedOrder.freight.actualWeight}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Fragment>
                </div>
              </div>
            )
          }
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  language: state.language,
  shopLoading: state.shopLoading,
});

export default compose(
  connect(mapStateToProps, {
    freightReceiveOrder, 
    freightSendOrder, 
    freightNotifyUser, 
    confirmBuyerReceive,
  }),
  withTranslation("dashboard")
)(OrderDetail);
