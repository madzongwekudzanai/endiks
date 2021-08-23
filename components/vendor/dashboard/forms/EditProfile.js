import AvatarEditor from "react-avatar-editor";
import { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Router from "next/router";
import {
  createProfile,
  getCurrentProfile,
} from "../../../../actions/sellerProfile";
import { withTranslation } from "../../../../i18n";

const EditProfile = ({
  formLoading,
  sellerProfile: { profile, loading },
  createProfile,
  t,
  getCurrentProfile,
}) => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const [scale, setScale] = useState(1);
  const [filename, setFilename] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setScale(scale);
  };
  const [formData, setFormData] = useState({
    storeAddress: "",
    storeImage: "",
    aliPayID: "",
    weChatID: "",
    bio: "",
  });

  useEffect(() => {
    getCurrentProfile();
    !profile && !loading && Router.push("/seller/dashboard/create-profile");
    setFormData({
      storeAddress: loading || !profile ? "" : profile.storeAddress,
      aliPayID: loading || !profile ? "" : profile.aliPayID,
      weChatID: loading || !profile ? "" : profile.weChatID,
      bio: loading || !profile ? "" : profile.bio,
    });
    setImageUrl(loading || !profile ? "" : profile.storeImage);
  }, [loading]);

  const { storeAddress, aliPayID, bio, weChatID } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const canvas = document.getElementById("updateProf").childNodes[0];
    const dataURL = canvas.toDataURL();
    let obj = {};
    obj.storeAddress = storeAddress;
    obj.edit = true;
    obj.aliPayID = aliPayID;
    obj.weChatID = weChatID;
    obj.bio = bio;
    obj.storeImage = dataURL;
    // setFormData({ ...formData, storeImage: dataURL });
    createProfile(obj, t("profile-updated"));
  };
  return (
    <div className="ps-contact-form">
      <div className={width > 470 && "container"}>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          className="ps-form--contact-us"
        >
          <h3 className="final">{t("edit-profile-title")}</h3>
          <div style={{ textAlign: "center" }}>
            <div id="updateProf" style={{ display: !imageUrl && "none" }}>
              <AvatarEditor
                image={imageUrl}
                width={width <= 470 ? width - 20 : 450}
                height={width <= 470 ? width - 20 : 450}
                scale={scale}
                rotate={0}
                border={0}
              />
            </div>
            {imageUrl && t("zoom")}
            <input
              style={{ display: !imageUrl && "none" }}
              onChange={(e) => handleScale(e)}
              type="range"
              disabled={loading || formLoading ? true : false}
              min="1"
              max="2"
              value={scale}
              step="0.01"
            />
            <br />
            <div className="custom-file mb-3">
              <input
                type="file"
                className="custom-file-input"
                name="image"
                accept="image/*"
                disabled={loading || formLoading ? true : false}
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                  setFilename(e.target.files[0].name);
                }}
              />
              <label className="custom-file-label" htmlFor="image">
                {filename ? t("drag-logo") : t("logo")}
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
              <div className="form-group">
                <label htmlFor="aliPayID">{t("ali-pay-id")}</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={loading || formLoading ? true : false}
                  name="aliPayID"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={aliPayID}
                  placeholder={`${t("ali-pay-id")} *`}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
              <div className="form-group">
                <label htmlFor="weChatID">{t("we-chat-id")}</label>
                <input
                  className="form-control"
                  type="text"
                  disabled={loading || formLoading ? true : false}
                  name="weChatID"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={weChatID}
                  placeholder={`${t("we-chat-id")} *`}
                />
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="form-group">
                <label htmlFor="storeAddress">{t("address")}</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="storeAddress"
                  value={storeAddress}
                  disabled={loading || formLoading ? true : false}
                  placeholder={`${t("address")} *`}
                />
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="form-group">
                <label htmlFor="bio">{t("about-store")}</label>
                <textarea
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="form-control"
                  rows="5"
                  name="bio"
                  type="text"
                  value={bio}
                  minLength="100"
                  placeholder={`${t("about-store")} *`}
                  disabled={loading || formLoading ? true : false}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-group submit">
            <button
              disabled={loading || formLoading ? true : false}
              type={loading || formLoading ? "button" : "submit"}
              className="ps-btn"
            >
              {loading || formLoading ? (
                <Fragment>
                  <span
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  {t("loading")}
                </Fragment>
              ) : (
                <Fragment>{t("save-changes")}</Fragment>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfile,
  authSeller: state.authSeller,
  formLoading: state.formLoading.formLoading,
});

export default compose(
  connect(mapStateToProps, { createProfile, getCurrentProfile }),
  withTranslation("dashboard")
)(EditProfile);
