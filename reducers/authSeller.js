import {
  SELLER_LOADED,
  AUTH_SELLER_ERROR,
  LOGIN_SELLER_SUCCESS,
  LOGIN_SELLER_FAIL,
  LOGOUT_SELLER,
  SELLER_ACCOUNT_DELETED,
} from "../actions/types";

const initialState = {
  token: typeof window !== "undefined" && localStorage.getItem("sellerToken"),
  isAuthenticated: false,
  loading: true,
  seller: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SELLER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        seller: payload,
      };
    case LOGIN_SELLER_SUCCESS:
      typeof window !== "undefined" &&
        localStorage.setItem("sellerToken", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_SELLER_ERROR:
    case LOGIN_SELLER_FAIL:
    case LOGOUT_SELLER:
    case SELLER_ACCOUNT_DELETED:
      typeof window !== "undefined" && localStorage.removeItem("sellerToken");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        seller: null,
      };
    default:
      return state;
  }
}
