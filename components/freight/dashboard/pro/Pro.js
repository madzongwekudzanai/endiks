import { Fragment } from "react";
import Router from "next/router";
import Breadcrumb from "../../../layout/Breadcrumb";
import ProContent from "./ProContent";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../../actions/cargoProfile";
import { useEffect } from "react";
import { compose } from "redux";
import { withTranslation } from "../../../../i18n";

const Pro = ({ cargoProfile: { loading, profile }, getCurrentProfile, t }) => {
  useEffect(() => {
    getCurrentProfile();
    !profile && !loading && Router.push("/freight/dashboard/create-profile");
  }, [loading]);

  return (
    <Fragment>
      <div className="ps-page--single">
        <Breadcrumb
          page={t("freight-logistics-dashboard")}
          pages={[
            {
              text: t("dashboard"),
              location: "/freight/dashboard",
            },
          ]}
        />
      </div>
      <div className="ps-vendor-dashboard pro">
        <div className="container">
          <ProContent />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  cargoProfile: state.cargoProfile,
});

export default compose(
  connect(mapStateToProps, { getCurrentProfile }),
  withTranslation("dashboard")
)(Pro);
