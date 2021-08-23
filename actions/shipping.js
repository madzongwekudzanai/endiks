import axios from "axios";
import { GET_SHIPPING_DESTINATIONS, SHIPPING_ERROR } from "./types";

// Get shipping destinations
export const getShippingDestinations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/shipping-agents/destinations");
    dispatch({
      type: GET_SHIPPING_DESTINATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SHIPPING_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};
