import { connect } from "react-redux";
import { hideDismissible } from "../../actions/common";
import {
  updateCategories,
  getPaginatedSellerProducts,
} from "../../actions/product";
import { Alert, Button } from "react-bootstrap";
import { compose } from "redux";
import { withTranslation } from "../../i18n";

const Alerts = ({
  alerts,
  product: { showDis, disMsg },
  hideDismissible,
  updateCategories,
  authSeller: { seller },
  getPaginatedSellerProducts,
  t,
}) => {
  return (
    <div
      className="alertContainer"
      style={{
        position: "fixed",
        left: "15px",
        zIndex: "100",
      }}
    >
      <Alert show={showDis} variant="success">
        <Alert.Heading>{t("products-added")}</Alert.Heading>
        <p>{disMsg}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            size="lg"
            onClick={() => {
              getPaginatedSellerProducts(seller && seller._id, "1");
              updateCategories();
              hideDismissible();
            }}
            variant="outline-success"
          >
            {t("update-store")}
          </Button>
        </div>
      </Alert>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <div
            style={{
              borderRadius: "0",
            }}
            className={`alert alert-${alert.alertType}`}
            key={alert.id}
            role="alert"
          >
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  product: state.product,
  authSeller: state.authSeller,
});

export default compose(
  connect(mapStateToProps, {
    hideDismissible,
    updateCategories,
    getPaginatedSellerProducts,
  }),
  withTranslation("products")
)(Alerts);
