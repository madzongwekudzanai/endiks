import axios from "axios";
import { setAlert } from "./alert";
import Router from "next/router";

import {
  GET_SELLER_PROFILE,
  SELLER_PROFILE_ERROR,
  CLEAR_SELLER_PROFILE,
  SELLER_ACCOUNT_DELETED,
  GET_SELLER_PROFILES,
  AUTOCOMPLETED_SELLER_PROFILES,
  SEARCHED_SELLER_PROFILES,
  LOAD_FORM,
  UNLOAD_FORM,
  GET_PROFILES_COUNT,
  GET_SEARCHED_PROFILES_COUNT,
} from "./types";

// Get current sellers profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_SELLER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SELLER_PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = (pageNumber) => async (dispatch) => {
  dispatch({ type: CLEAR_SELLER_PROFILE });
  try {
    const res = await axios.get(`/api/profile/${pageNumber}`);
    dispatch({
      type: GET_SELLER_PROFILES,
      payload: res.data.profiles,
    });
    dispatch({
      type: GET_PROFILES_COUNT,
      payload: res.data.pages,
    });
  } catch (err) {
    dispatch({
      type: SELLER_PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Autocomplete seller profiles
export const autocompleteProfiles = (content) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/profile/autocomplete",
      { content },
      config
    );

    dispatch({
      type: AUTOCOMPLETED_SELLER_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SELLER_PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Search seller profiles
export const searchProfiles = (content, page) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/profile/search/${page}`,
      { content },
      config
    );

    dispatch({
      type: SEARCHED_SELLER_PROFILES,
      payload: res.data.results,
    });
    dispatch({
      type: GET_SEARCHED_PROFILES_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_FORM,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    dispatch({
      type: SELLER_PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/seller/${userId}`);

    dispatch({
      type: GET_SELLER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SELLER_PROFILE_ERROR,
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

    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_SELLER_PROFILE,
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
      type: SELLER_PROFILE_ERROR,
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
      await axios.delete("/api/profile");

      dispatch({
        type: CLEAR_SELLER_PROFILE,
      });
      dispatch({
        type: SELLER_ACCOUNT_DELETED,
      });

      dispatch(
        setAlert("Your account has been permanently deleted", "success")
      );
    } catch (err) {
      dispatch({
        type: SELLER_PROFILE_ERROR,
        payload: { msg: err.response.data, status: err.response.data },
      });
    }
  }
};
