import axios from "axios";
import {
  ORDER_ERROR,
  GET_SELLER_ORDERS,
  GET_BUYER_ORDERS,
  GET_RECENT_SELLER_ORDERS,
  GET_SELLER_ORDER_PRODUCTS,
  GET_ORIGINAL_SELLER_ORDER,
  GET_BUYER_ORDER_PRODUCTS,
  GET_ORIGINAL_BUYER_ORDER_PRODUCTS,
  GET_TRACKED_ORDER,
  SELLER_SEND_ORDER,
  CLEAR_CART,
  LOAD_ORDER,
  CLEAR_TRACKED_ORDER,
  UNLOAD_ORDER,
  CLEAR_BUYER_ORDER_PRODUCTS,
  CLEAR_SELLER_ORDER_PRODUCTS,
  GET_FREIGHT_ORDERS,
  GET_RECENT_FREIGHT_ORDERS,
  FREIGHT_RECEIVE_ORDER,
  FREIGHT_SEND_ORDER,
  FREIGHT_NOTIFY_USER,
  BUYER_RECEIVE
} from "./types";
import { setAlert } from "./alert";
import Router from "next/router";

// Get seller orders
export const getSellerOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/seller");
    dispatch({
      type: GET_SELLER_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get freight orders
export const getFreightOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/freight");
    dispatch({
      type: GET_FREIGHT_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get recent freight orders
export const getRecentFreightOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/freight/recent-orders");
    dispatch({
      type: GET_RECENT_FREIGHT_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get buyer orders
export const getBuyerOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/buyer");
    dispatch({
      type: GET_BUYER_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get recent seller orders
export const getRecentSellerOrders = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/orders/seller/recent-orders");
    dispatch({
      type: GET_RECENT_SELLER_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get seller order products
export const getSellerOrderProducts = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_SELLER_ORDER_PRODUCTS,
    });
    const res = await axios.get(
      `/api/orders/view-detail/seller/products/${orderId}`
    );
    dispatch({
      type: GET_SELLER_ORDER_PRODUCTS,
      payload: res.data.products,
    });
    dispatch({
      type: GET_ORIGINAL_SELLER_ORDER,
      payload: res.data.order,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get buyer order products
export const getBuyerOrderProducts = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_BUYER_ORDER_PRODUCTS,
    });
    const res = await axios.get(
      `/api/orders/view-detail/buyer/products/${orderId}`
    );
    dispatch({
      type: GET_BUYER_ORDER_PRODUCTS,
      payload: res.data.products,
    });
    dispatch({
      type: GET_ORIGINAL_BUYER_ORDER_PRODUCTS,
      payload: res.data.originalProducts,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Seller send order
export const sellerSendOrder = (orderId, formData, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_ORDER,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/orders/send-order-seller/${orderId}`,
      formData,
      config
    );
    dispatch({
      type: SELLER_SEND_ORDER,
      payload: {id: orderId, order: res.data},
    });
    dispatch(setAlert(msg, "success", 10000));
    Router.push("/seller/dashboard?page=orders");
    dispatch({
      type: UNLOAD_ORDER,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_ORDER,
    });

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: ORDER_ERROR,
        payload: { msg: err.response.data, status: err.response.status },
      });
    }
  }
};

// Freight receive order
export const freightReceiveOrder = (orderId, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_ORDER,
    });
    const res = await axios.put(`/api/orders/freight-receive-order/${orderId}`);
    dispatch({
      type: FREIGHT_RECEIVE_ORDER,
      payload: {id: orderId, order: res.data},
    });
    dispatch(setAlert(msg, "success", 10000));
    Router.push("/freight/dashboard?page=orders");
    dispatch({
      type: UNLOAD_ORDER,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_ORDER,
    });
    dispatch(setAlert(err.response.data, "danger"));
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Freight send order
export const freightSendOrder = (orderId, formData, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_ORDER,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put(
      `/api/orders/freight-send-order/${orderId}`,
      formData,
      config
    );
    dispatch({
      type: FREIGHT_SEND_ORDER,
      payload: {id: orderId, order: res.data},
    });
    dispatch(setAlert(msg, "success", 10000));
    Router.push("/freight/dashboard?page=orders");
    dispatch({
      type: UNLOAD_ORDER,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_ORDER,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: ORDER_ERROR,
        payload: { msg: err.response.data, status: err.response.status },
      });
    }
  }
};

// Freight notify user that order is ready for collection
export const freightNotifyUser = (orderId, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_ORDER,
    });
    const res = await axios.put(`/api/orders/freight-notify-user/${orderId}`);
    dispatch({
      type: FREIGHT_NOTIFY_USER,
      payload: {id: orderId, order: res.data},
    });
    dispatch(setAlert(msg, "success", 10000));
    Router.push("/freight/dashboard?page=orders");
    dispatch({
      type: UNLOAD_ORDER,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_ORDER,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: ORDER_ERROR,
        payload: { msg: err.response.data, status: err.response.status },
      });
    }
  }
};

// Freight Confirm that buyer has received order
export const confirmBuyerReceive = (orderId, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_ORDER,
    });
    const res = await axios.put(`/api/orders/freight-confirm-buyer-receive/${orderId}`);
    dispatch({
      type: BUYER_RECEIVE,
      payload: {id: orderId, order: res.data},
    });
    dispatch(setAlert(msg, "success", 10000));
    Router.push("/freight/dashboard?page=orders");
    dispatch({
      type: UNLOAD_ORDER,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_ORDER,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: ORDER_ERROR,
        payload: { msg: err.response.data, status: err.response.status },
      });
    }
  }
};

// Track order
export const trackOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_TRACKED_ORDER,
    });
    dispatch({
      type: LOAD_ORDER,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/orders/track-order`,
      { orderId },
      config
    );
    dispatch({
      type: GET_TRACKED_ORDER,
      payload: res.data,
    });
    dispatch({
      type: UNLOAD_ORDER,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_ORDER,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
    }
  }
};

// Order cart products
export const createOrder = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_ORDER,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/orders", formData, config);
    dispatch({
      type: CLEAR_CART,
    });
    dispatch(setAlert(res.data, "success"));
    Router.push("/shop/orders");
    dispatch({
      type: UNLOAD_ORDER,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_ORDER,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));

      dispatch({
        type: ORDER_ERROR,
        payload: { msg: err.response.data, status: err.response.status },
      });
    }
  }
};
