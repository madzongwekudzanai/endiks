import React, { Fragment } from "react";
import Breadcrumb from "../../../layout/Breadcrumb";
import DashboardHeader from "../DashboardHeader";
import FreeContent from "./FreeContent";

const Free = () => {
  return (
    <Fragment>
      <div className="ps-page--single">
        <Breadcrumb
          page="Seller Dashboard Free"
          pages={[
            {
              text: "Home",
              location: "/",
            },
            {
              text: "Pages",
              location: "/",
            },
            {
              text: "Vendor Pages",
              location: "/",
            },
          ]}
        />
      </div>
      <div className="ps-vendor-dashboard">
        <div className="container">
          <DashboardHeader
            title="Seller Dashboard Free"
            text="Designed base on WC Vendor Plugin. Martfury also fully comptatiable with
        other popular plugins as Dokan, YITH, etc .Can help you turns your site
        into multi-vendor eCommerce site."
          />
          <FreeContent />
        </div>
      </div>
    </Fragment>
  );
};

export default Free;
