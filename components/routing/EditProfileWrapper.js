import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { getCurrentProfile } from "../../actions/sellerProfile";

const EditProfileWrapper = ({
  children,
  sellerProfile: { profile, loading },
  getCurrentProfile,
}) => {
  const router = useRouter();
  useEffect(() => {
    !profile && !loading && router.push("/seller/dashboard/create-profile");
    getCurrentProfile();
  }, [loading, getCurrentProfile]);
  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  EditProfileWrapper
);
