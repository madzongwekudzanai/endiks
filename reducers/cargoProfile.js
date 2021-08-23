import {
    GET_FREIGHT_PROFILE,
    FREIGHT_PROFILE_ERROR,
    CLEAR_FREIGHT_PROFILE,
    UPDATE_FREIGHT_PROFILE,
  } from "../actions/types";
  
  const initialState = {
    profile: null,
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_FREIGHT_PROFILE:
      case UPDATE_FREIGHT_PROFILE:
        return {
          ...state,
          profile: payload,
          loading: false,
        };
      case FREIGHT_PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
          profile: null,
        };
      case CLEAR_FREIGHT_PROFILE:
        return {
          ...state,
          profile: null,
          loading: false,
        };
      default:
        return state;
    }
  }
  