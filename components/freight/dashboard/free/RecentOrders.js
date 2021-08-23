import { connect } from "react-redux";
import { getFreightOrders } from "../../../../actions/orders";
import { useEffect, useState } from "react";
import Link from "next/link";
import { compose } from "redux";
import Moment from "react-moment";
import { withTranslation } from "../../../../i18n";
import { Fragment } from "react";

const RecentOrders = ({
  orders: { freightOrders, freightOrdersLoading },
  language: { loc },
  getFreightOrders,
  t,
}) => {
  const [locale, setLocale] = useState(loc === "english" ? "en" : "zh");
  useEffect(() => {
    getFreightOrders();
    setLocale(loc === "english" ? "en" : "zh");
  }, [loc]);
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
                <th>{t("order-id")}</th>
                <th>{t("supplier-track-code")}</th>
                <th>{t("date-received")}</th>
                <th>{t("your-tracking-code")}</th>
                <th>{t("freight-type")}</th>
                <th>{t("shipping")}</th>
                <th>{t("destination-country")}</th>
                <th>{t("see-details")}</th>
              </tr>
            </thead>
            {freightOrdersLoading ? (
              <span className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">{t("loading")}</span>
                </div>
              </span>
            ) : (
              <tbody>
                {freightOrders.map(
                  ({
                      _id,
                      seller,
                      freight
                  }) => (
                    <tr>
                      <td className="text-trunk-order-cover">
                        <Link
                          href={`/freight/dashboard?page=order_detail&order_id=${_id}`}
                        >
                          <a className="text-trunk-order">{_id}</a>
                        </Link>
                      </td>
                      <td>
                        {seller.trackingCode ? seller.trackingCode : t("null")}
                      </td>
                      <td>
                        {freight.dateReceived ? (<Moment format="YYYY/MM/DD">{freight.dateReceived}</Moment>) : t("null")}
                      </td>
                      <td>
                        {freight.trackingCode ? freight.trackingCode : t("null")}
                      </td>
                      <td>
                        {freight.freightType[locale] ? freight.freightType[locale] : t("null")}
                      </td>
                      <td>
                        {freight.shipping ? <Fragment>
                          {new Intl.NumberFormat(freight.locale, {
                              style: "currency",
                              currency: freight.currencyCode,
                            }).format(freight.shipping)}
                        </Fragment> : t("null")}
                      </td>
                      <td>
                        {freight.country[locale] ? freight.country[locale] : t("null")}
                      </td>
                      <td>
                        <Link
                          href={`/freight/dashboard?page=order_detail&order_id=${_id}`}
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
  language: state.language,
});

export default compose(
  connect(mapStateToProps, { getFreightOrders }),
  withTranslation("dashboard")
)(RecentOrders);
