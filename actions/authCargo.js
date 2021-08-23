import axios from "axios";
import {
  FREIGHT_LOADED,
  AUTH_FREIGHT_ERROR,
  LOGIN_FREIGHT_SUCCESS,
  LOGIN_FREIGHT_FAIL,
  LOGOUT_FREIGHT,
  LOGOUT,
  LOGOUT_SELLER,
  CLEAR_FREIGHT_PROFILE,
  LOAD_FORM,
  UNLOAD_FORM,
} from "./types";
import { setCargoAuthToken } from "../utils/setAuthToken";
import { setAlert } from "./alert";
import router from "next/router";

// Load Freight
export const loadFreight = () => async (dispatch) => {
  if (typeof window !== "undefined" && localStorage.freightToken) {
    setCargoAuthToken(localStorage.freightToken);
  }

  try {
    const res = await axios.get("/api/auth-freight");

    dispatch({
      type: FREIGHT_LOADED,
      payload: res.data,
    });

  } catch (err) {
    dispatch({
      type: AUTH_FREIGHT_ERROR,
    });
  }
};

// Verify Freight
export const verifyFreight = (token, history) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });
    const res = await axios.get(`/api/auth-freight/verify/${token}`);
    dispatch({
      type: LOGOUT,
    });
    dispatch({
      type: LOGOUT_SELLER,
    });
    setCargoAuthToken(token);
    dispatch(loadFreight());
    dispatch(setAlert(res.data, "success"));
    router.push("/freight/dashboard/create-profile");
    dispatch({
      type: UNLOAD_FORM,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    dispatch({
      type: AUTH_FREIGHT_ERROR,
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};

// Login Freight
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
      type: LOGOUT,
    });
    dispatch({
      type: LOGOUT_SELLER,
    });
    const res = await axios.post(
      by === "email"
        ? "/api/auth-freight/email"
        : by === "phone number" && "/api/auth-freight/phone",
      formData,
      config
    );
    dispatch({
      type: LOGIN_FREIGHT_SUCCESS,
      payload: res.data,
    });
    dispatch(loadFreight());
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
      type: LOGIN_FREIGHT_FAIL,
      });
      dispatch(setAlert(err.response.data, "danger"));
    }
  }
};

// Logout
export const logoutFreight = (msg) => (dispatch) => {
  dispatch({ type: LOGOUT_FREIGHT });
  dispatch({ type: CLEAR_FREIGHT_PROFILE });
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: LOGOUT_SELLER,
  });
  router.push("/");
  dispatch(setAlert(msg, "success"));
};
