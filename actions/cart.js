import axios from "axios";
import {
  ADD_TO_CART,
  GET_CART_ITEMS,
  CART_ERROR,
  UPDATE_CART,
  LOAD_CART,
  UNLOAD_CART,
  CLEAR_CART,
  UPDATE_CART_QUANTITY,
  LOAD_FORM,
  UNLOAD_FORM,
  USER_LOADED,
  CART_LOAD,
  CART_UNLOAD,
} from "./types";
import { setAlert } from "./alert";

// Get cart items
export const getCartItems = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });

    const res = await axios.get("/api/cart");
    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data,
    });
    dispatch({
      type: UNLOAD_FORM,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Add item to cart
export const addCartItem = (productId, quantity = 1) => async (dispatch) => {
  try {
    dispatch({
      type: CART_LOAD,
    });
    const res = await axios.put(`/api/cart/${productId}/${quantity}`);
    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
    dispatch(setAlert("Item added to cart", "success"));
    dispatch(getCartItems());
    dispatch({
      type: CART_UNLOAD,
    });
  } catch (err) {
    dispatch({
      type: CART_UNLOAD,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: CART_ERROR,
        payload: { msg: err, status: err.response.status },
      });
    }
  }
};

// Update cart quantity
export const updateCartQuantity = (quantity, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: LOAD_CART,
    });

    const res = await axios.post(
      `/api/cart/quantity/${id}`,
      { quantity },
      config
    );
    dispatch({
      type: UPDATE_CART_QUANTITY,
      payload: { id, quantity },
    });
    dispatch({
      type: UPDATE_CART,
      payload: { id, quantity },
    });
    dispatch(setAlert(res.data, "success"));
    dispatch({
      type: UNLOAD_CART,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_CART,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
      type: CART_ERROR,
      payload: { msg: err, status: err.response.status },
      });
    }
  }
};

// Remove item from cart
export const removeCartItem = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_CART,
    });
    const res = await axios.put(`/api/cart/cart-items/remove/${id}`);
    dispatch({
      type: CLEAR_CART,
    });
    const secondRes = await axios.get("/api/auth-user");

    dispatch({
      type: USER_LOADED,
      payload: secondRes.data,
    });
    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data,
    });
    dispatch(setAlert("item removed from cart", "success"));
    dispatch({
      type: UNLOAD_CART,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_CART,
    });
    dispatch({
      type: CART_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};
