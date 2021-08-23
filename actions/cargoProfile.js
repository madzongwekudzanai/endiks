import axios from "axios";
import { setAlert } from "./alert";
import Router from "next/router";

import {
  GET_FREIGHT_PROFILE,
  FREIGHT_PROFILE_ERROR,
  CLEAR_FREIGHT_PROFILE,
  FREIGHT_ACCOUNT_DELETED,
  LOAD_FORM,
  UNLOAD_FORM,
} from "./types";

// Get current cargo profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/cargo-profile/me");

    dispatch({
      type: GET_FREIGHT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FREIGHT_PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};


// Create or update profile
export const createProfile = (formData, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/cargo-profile", formData, config);
    dispatch({
      type: GET_FREIGHT_PROFILE,
      payload: res.data,
    });

    dispatch({
      type: UNLOAD_FORM,
    });
    dispatch(setAlert(msg, "success"));
    Router.push("/seller/dashboard");
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
      type: FREIGHT_PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
      });
    }
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (
    typeof window !== "undefined" &&
    window.confirm("Are you sure? This can NOT be undone!")
  ) {
    try {
      await axios.delete("/api/cargo-profile");

      dispatch({
        type: CLEAR_FREIGHT_PROFILE,
      });
      dispatch({
        type: FREIGHT_ACCOUNT_DELETED,
      });

      dispatch(
        setAlert("Your account has been permanently deleted", "success")
      );
    } catch (err) {
      dispatch({
        type: FREIGHT_PROFILE_ERROR,
        payload: { msg: err.response.data, status: err.response.data },
      });
    }
  }
};
