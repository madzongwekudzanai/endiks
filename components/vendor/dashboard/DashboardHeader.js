import PropTypes from "prop-types";

const DashboardHeader = ({ title, text }) => {
  return (
    <div className="ps-section__header">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default DashboardHeader;
