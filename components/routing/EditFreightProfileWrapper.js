import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { getCurrentProfile } from "../../actions/cargoProfile";

const EditFreightProfileWrapper = ({
  children,
  cargoProfile: { profile, loading },
  getCurrentProfile,
}) => {
  const router = useRouter();
  useEffect(() => {
    !profile && !loading && router.push("/freight/dashboard/create-profile");
    getCurrentProfile();
  }, [loading, getCurrentProfile]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  cargoProfile: state.cargoProfile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  EditFreightProfileWrapper
);
