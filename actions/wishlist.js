import axios from "axios";
import {
  WISHLIST_ERROR,
  GET_WISHLIST_ITEMS,
  REMOVE_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  LOAD_WISHLIST,
  UNLOAD_WISHLIST,
} from "./types";
import { setAlert } from "./alert";

// Get wishlist items
export const getWishlistItems = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_WISHLIST,
    });
    const res = await axios.get("/api/wishlist");
    dispatch({
      type: GET_WISHLIST_ITEMS,
      payload: res.data,
    });
    dispatch({
      type: UNLOAD_WISHLIST,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_WISHLIST,
    });
    dispatch({
      type: WISHLIST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Add item to wishlist
export const addWishlistItem = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_WISHLIST,
    });
    const res = await axios.put(`/api/wishlist/${productId}`);
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: res.data,
    });
    dispatch(setAlert("Item added to wishlist", "success"));
    dispatch(getWishlistItems());
    dispatch({
      type: UNLOAD_WISHLIST,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_WISHLIST,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: WISHLIST_ERROR,
        payload: { msg: err, status: err.response.status },
      });
    }
  }
};

// Remove item from wishlist
export const removeWishlistItem = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_WISHLIST,
    });
    const res = await axios.put(`/api/wishlist/remove/${id}`);

    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: id,
    });
    dispatch({
      type: REMOVE_WISHLIST,
      payload: id,
    });
    dispatch(setAlert(res.data, "success"));
    dispatch({
      type: UNLOAD_WISHLIST,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_WISHLIST,
    });
    dispatch({
      type: WISHLIST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};
