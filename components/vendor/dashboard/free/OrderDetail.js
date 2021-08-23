import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import { getSellerOrderProducts, sellerSendOrder } from "../../../../actions/orders";
import { useEffect, Fragment, useState } from "react";
import { compose } from "redux";
import { Button, Modal } from "react-bootstrap";
import { withTranslation } from "../../../../i18n";
import LazyLoadImage from "../../../layout/LazyLoadImage";

const OrderDetail = ({
  orders: {
    sellerOrderProducts,
    originalSellerOrder,
    sellerOrderProductsLoading,
    originalSellerOrderLoading,
  },
  shopLoading: { orderLoading },
  getSellerOrderProducts,
  sellerSendOrder,
  t,
}) => {
  const [formData, setFormData] = useState({
    trackingCode: ""
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const { order_id } = router.query;
  useEffect(() => {
    order_id && getSellerOrderProducts(order_id);
  }, [order_id]);
  return (
    <Fragment>
      {!originalSellerOrder ? (
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
            <li>
              <strong>{t("shipment-address")}</strong>:{" "}
              {originalSellerOrder.seller.shipmentAddress}
            </li>
          </ul>
          <div className="ps-block__header">
            <h3 className="figCap">
              {t("order-id")}: {order_id}
            </h3>
            {!originalSellerOrder.seller.sent ? (
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
                      sellerSendOrder(order_id, formData, t("send-order-success"));
                      handleClose();
                    }}
                  >
                    <Modal.Body>
                      <input
                        className="form-control"
                        type="text"
                        name="trackingCode"
                        onChange={(e) => {
                          setFormData({
                            ...formData, trackingCode: e.target.value
                          })
                        }}
                        required
                        disabled={orderLoading}
                        value={formData.trackingCode}
                        placeholder={t("tracking-code")}
                      />
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
            ) : null}
          </div>
          <div className="ps-block__content">
            <div className="table-responsive">
              <Fragment>
                <table className="table ps-table ps-table--vendor">
                  <thead>
                    <tr>
                      <th>
                        <i className="lnr lnr-picture"></i>
                      </th>
                      <th>{t("product-title")}</th>
                      <th>{t("quantity")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerOrderProductsLoading ||
                    originalSellerOrderLoading ? (
                      <span className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                          <span className="sr-only">{t("loading")}</span>
                        </div>
                      </span>
                    ) : (
                      <Fragment>
                        {sellerOrderProducts.map(({ _id, titles, slides }) => (
                          <tr key={_id}>
                            <td>
                              <LazyLoadImage height={50}>
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
                            </td>
                            <td>
                              {
                                originalSellerOrder.products.items[
                                  originalSellerOrder.products.items
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
              </Fragment>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  shopLoading: state.shopLoading,
});

export default compose(
  connect(mapStateToProps, {
    getSellerOrderProducts,
    sellerSendOrder
  }),
  withTranslation("dashboard")
)(OrderDetail);
