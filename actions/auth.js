import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_CART,
  CLEAR_WISHLIST,
  LOGOUT_SELLER,
  LOGOUT_FREIGHT,
  LOAD_FORM,
  UNLOAD_FORM,
} from "./types";
import { setAuthToken } from "../utils/setAuthToken";
import { setAlert } from "./alert";
import Router from "next/router";

// Load User
export const loadUser = () => async (dispatch) => {
  if (typeof window !== "undefined" && localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth-user");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Verify User
export const verifyUser = (token, msg) => async (dispatch) => {
  try {
    await axios.get(`/api/auth-user/verify/${token}`);
    dispatch({
      type: LOGOUT,
    });
    dispatch({
      type: LOGOUT_SELLER,
    });
    setAuthToken(token);
    dispatch(loadUser());
    dispatch(setAlert(msg, "success"));
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch({
      type: LOAD_FORM,
    });
    dispatch({
      type: LOGOUT_SELLER,
    });
    dispatch({
      type: LOGOUT_FREIGHT,
    });
    const res = await axios.post("/api/auth-user", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch({
      type: UNLOAD_FORM,
    });
    Router.push("/");
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
      type: LOGIN_FAIL,
      });
      dispatch(setAlert(err.response.data, "danger"));
    }
  }
};

// Logout
export const logout = (msg) => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
  dispatch({
    type: CLEAR_WISHLIST,
  });
  dispatch({ type: LOGOUT });
  dispatch({
    type: LOGOUT_SELLER,
  });
  dispatch({
    type: LOGOUT_FREIGHT,
  });
  dispatch(setAlert(msg, "success"));
};
