import { Fragment } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/Breadcrumb";
// import DashboardHeader from "../DashboardHeader";
import ProContent from "./ProContent";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../../actions/sellerProfile";
import { useEffect } from "react";
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";

const Pro = ({ sellerProfile: { loading, profile }, getCurrentProfile, t }) => {
  useEffect(() => {
    getCurrentProfile();
    !profile && !loading && Router.push("/seller/dashboard/create-profile");
  }, [loading]);

  return (
    <Fragment>
      <div className="ps-page--single">
        <Breadcrumb
          page={t("seller-dashboard")}
          pages={[
            {
              text: t("dashboard"),
              location: "/seller/dashboard",
            },
          ]}
        />
      </div>
      <div className="ps-vendor-dashboard pro">
        <div className="container">
          {/* <DashboardHeader
            title="Seller Dashboard Pro"
            text="Designed base on WC Vendor Plugin. Martfury also fully comptatiable with
        other popular plugins as Dokan, YITH, etc .Can help you turns your site
        into multi-vendor eCommerce site."
          /> */}
          <ProContent />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfile,
});

export default compose(
  connect(mapStateToProps, { getCurrentProfile }),
  withTranslation("dashboard")
)(Pro);
