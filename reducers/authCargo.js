import {
    FREIGHT_LOADED,
    AUTH_FREIGHT_ERROR,
    LOGIN_FREIGHT_SUCCESS,
    LOGIN_FREIGHT_FAIL,
    LOGOUT_FREIGHT,
    FREIGHT_ACCOUNT_DELETED,
  } from "../actions/types";
  
  const initialState = {
    token: typeof window !== "undefined" && localStorage.getItem("freightToken"),
    isAuthenticated: false,
    loading: true,
    freight: null,
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case FREIGHT_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          freight: payload,
        };
      case LOGIN_FREIGHT_SUCCESS:
        typeof window !== "undefined" &&
          localStorage.setItem("freightToken", payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
        };
      case AUTH_FREIGHT_ERROR:
      case LOGIN_FREIGHT_FAIL:
      case LOGOUT_FREIGHT:
      case FREIGHT_ACCOUNT_DELETED:
        typeof window !== "undefined" && localStorage.removeItem("freightToken");
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          freight: null,
        };
      default:
        return state;
    }
  }
  