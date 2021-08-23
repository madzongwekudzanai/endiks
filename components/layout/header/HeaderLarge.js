import { Fragment } from "react";
import HeaderTop from "./HeaderTop";
import Navigation from "./Navigation";
import { connect } from "react-redux";
import FirstTopHeader from "./FirstTopHeader";

const HeaderLarge = ({ authSeller: { isAuthenticated }, authCargo }) => {
  return (
    <header
      id="allHeader"
      className="header header--standard header--electronic"
    >
      {(isAuthenticated || authCargo.isAuthenticated) ? (
        null
      ) : (
        <Fragment>
          <FirstTopHeader />
          <HeaderTop />
        </Fragment>
      )}
      <Navigation />
    </header>
  );
};

const mapStateToProps = (state) => ({
  authSeller: state.authSeller,
  authCargo: state.authCargo,
});

export default connect(mapStateToProps, null)(HeaderLarge);
