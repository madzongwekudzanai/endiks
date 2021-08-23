import axios from "axios";
import {
  GET_CHECKOUT_FREIGHT_COMPANIES,
  GET_FREIGHT_DESTINATIONS,
  GET_ALL_FREIGHT_DESTINATIONS,
  GET_ALL_USER_DESTINATIONS,
  DESTINATION_ERROR,
  DELETE_DESTINATION,
  ADD_DESTINATION,
  LOAD_FORM,
  UNLOAD_FORM,
  LOAD_DELETE,
  UNLOAD_DELETE,
  GET_FREIGHT_TYPES,
  UPDATE_DESTINATION,
  GET_RECENT_FREIGHT_DESTINATIONS
} from "./types";
import { setAlert } from "./alert";
import Router from "next/router";

// Get checkout shipping companies
export const getCheckoutShippingCompanies = (formData) => async (dispatch) => {
  try {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    const res = await axios.post("/api/destinations/freight-companies", formData, config);
    dispatch({
      type: GET_CHECKOUT_FREIGHT_COMPANIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DESTINATION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get destinations by freight
export const getDestinationsByFreight = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/destinations/freight-destination/me");
    dispatch({
      type: GET_FREIGHT_DESTINATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DESTINATION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get recent destinations by freight
export const getRecentFreightDestinations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/destinations/recent-freight-destination/me");
    dispatch({
      type: GET_RECENT_FREIGHT_DESTINATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DESTINATION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get Freight types
export const getFreightTypes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/destinations/freight-types/all");
    dispatch({
      type: GET_FREIGHT_TYPES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DESTINATION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get all freight destinations
export const getAllFreightDestinations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/destinations/freight-destinations/all");
    dispatch({
      type: GET_ALL_FREIGHT_DESTINATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DESTINATION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get all user destinations
export const getAllUserDestinations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/destinations/user-destinations/all");
    dispatch({
      type: GET_ALL_USER_DESTINATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DESTINATION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Create a destination
export const createDestination = (formData, msg) => async (dispatch) => {
    try {
      dispatch({
        type: LOAD_FORM,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/destinations", formData, config);
      dispatch({
        type: ADD_DESTINATION,
        payload: res.data,
      });
      dispatch(setAlert(msg, "success"));
      await axios.get("/api/destinations/user-destinations");
      Router.push(
        `/freight/dashboard?page=destinations`
      );
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
        dispatch(setAlert(err.response.data, "danger"));
        dispatch({
          type: PRODUCT_ERROR,
          payload: { msg: err, status: err.response.status },
        });
      }
      
    }
  };

// Update a destination
export const editDestination = (formData, id, msg) => async (dispatch) => {
    try {
      dispatch({
        type: LOAD_FORM,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(`/api/destinations/${id}`, formData, config);
      dispatch({
        type: UPDATE_DESTINATION,
        payload: { id, dest: res.data },
      });
      dispatch(setAlert(msg, "success"));
      await axios.get("/api/destinations/user-destinations");
      Router.push(
        `/freight/dashboard?page=destinations`
      );
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
        dispatch(setAlert(err.response.data, "danger"));
        dispatch({
          type: PRODUCT_ERROR,
          payload: { msg: err, status: err.response.status },
        });
      }
    }
  };

// Delete a destination
export const deleteDestination = (id, msg) => async (dispatch) => {
    try {
      dispatch({
        type: LOAD_DELETE,
      });
      await axios.delete(`/api/destinations/${id}`);
  
      dispatch({
        type: DELETE_DESTINATION,
        payload: id,
      });
      await axios.get("/api/destinations/user-destinations");
      dispatch(setAlert(msg, "success"));
      dispatch({
        type: UNLOAD_DELETE,
      });
    } catch (err) {
      dispatch({
        type: UNLOAD_DELETE,
      });
      dispatch({
        type: DESTINATION_ERROR,
        payload: { msg: err.response.data, status: err.response.status },
      });
    }
  };
