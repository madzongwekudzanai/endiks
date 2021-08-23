import axios from "axios";
import {
  SELLER_LOADED,
  AUTH_SELLER_ERROR,
  LOGIN_SELLER_SUCCESS,
  LOGIN_SELLER_FAIL,
  LOGOUT_SELLER,
  LOGOUT,
  LOGOUT_FREIGHT,
  CLEAR_SELLER_PROFILE,
  LOAD_FORM,
  UNLOAD_FORM,
} from "./types";
import { setSellerAuthToken } from "../utils/setAuthToken";
import { setAlert } from "./alert";
import router from "next/router";

// Load Seller
export const loadSeller = () => async (dispatch) => {
  if (typeof window !== "undefined" && localStorage.sellerToken) {
    setSellerAuthToken(localStorage.sellerToken);
  }

  try {
    const res = await axios.get("/api/auth-seller");

    dispatch({
      type: SELLER_LOADED,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: AUTH_SELLER_ERROR,
    });
  }
};

// Verify Seller
export const verifySeller = (token, history) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });
    const res = await axios.get(`/api/auth-seller/verify/${token}`);
    dispatch({
      type: LOGOUT,
    });
    setSellerAuthToken(token);
    dispatch(loadSeller());
    dispatch(setAlert(res.data, "success"));
    router.push("/seller/dashboard/create-profile");
    dispatch({
      type: UNLOAD_FORM,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    dispatch({
      type: AUTH_SELLER_ERROR,
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};

// Login Seller
export const login = (formData, by) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: LOAD_FORM,
    });
    dispatch({
      type: LOGOUT_FREIGHT,
    });
    dispatch({
      type: LOGOUT,
    });
    const res = await axios.post(
      by === "email"
        ? "/api/auth-seller/email"
        : by === "phone number" && "/api/auth-seller/phone",
      formData,
      config
    );
    dispatch({
      type: LOGIN_SELLER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadSeller());
    dispatch({
      type: UNLOAD_FORM,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
      type: LOGIN_SELLER_FAIL,
      });
      dispatch(setAlert(err.response.data, "danger"));
    }
  }
};

// Logout
export const logoutSeller = (msg) => (dispatch) => {
  dispatch({ type: LOGOUT_SELLER });
  dispatch({ type: CLEAR_SELLER_PROFILE });
  dispatch({
    type: LOGOUT_FREIGHT,
  });
  dispatch({
    type: LOGOUT,
  });
  router.push("/");
  dispatch(setAlert(msg, "success"));
};
