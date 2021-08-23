import React from "react";
import Links from "../Links";
import DatePicker from "../DatePicker";
import RecentOrders from "./RecentOrders";
import FreeReport from "./FreeReport";

const FreeContent = () => {
  return (
    <div className="ps-section__content">
      <Links />
      <div className="ps-block--vendor-dashboard">
        <div className="ps-block__header">
          <h3>Sale Report</h3>
        </div>
        <div className="ps-block__content">
          <DatePicker />
          <FreeReport />
        </div>
      </div>
      <RecentOrders />
    </div>
  );
};

export default FreeContent;
