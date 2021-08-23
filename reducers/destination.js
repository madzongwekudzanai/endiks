import {
    DESTINATION_ERROR,
    GET_CHECKOUT_FREIGHT_COMPANIES,
    GET_FREIGHT_DESTINATIONS,
    GET_ALL_FREIGHT_DESTINATIONS,
    GET_ALL_USER_DESTINATIONS,
    GET_FREIGHT_TYPES,
    ADD_DESTINATION,
    UPDATE_DESTINATION,
    DELETE_DESTINATION,
    GET_RECENT_FREIGHT_DESTINATIONS
  } from "../actions/types";
  
  const initialState = {
    checkoutFreightCompanies: [],
    freightDestinations: [],
    freightTypes: [],
    allFreightDestinations: [],
    allUserDestinations: [],
    recentFreightDestinations: [],
    singleProduct: null,
    checkoutFreightCompaniesLoading: true,
    freightDestinationsLoading: true,
    allFreightDestinationsLoading: true,
    allUserDestinationsLoading: true,
    freightTypesLoading: true,
    recentFreightDestinationsLoading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_CHECKOUT_FREIGHT_COMPANIES:
        return {
            ...state,
            checkoutFreightCompanies: payload,
            checkoutFreightCompaniesLoading: false,
        };
        case GET_FREIGHT_TYPES:
        return {
            ...state,
            freightTypes: payload,
            freightTypesLoading: false,
        };
        case GET_FREIGHT_DESTINATIONS:
        return {
            ...state,
            freightDestinations: payload,
            freightDestinationsLoading: false,
        };
        case GET_RECENT_FREIGHT_DESTINATIONS:
        return {
            ...state,
            recentFreightDestinations: payload,
            recentFreightDestinationsLoading: false,
        };
        case GET_ALL_FREIGHT_DESTINATIONS:
        return {
            ...state,
            allFreightDestinations: payload,
            allFreightDestinationsLoading: false,
        };
        case GET_ALL_USER_DESTINATIONS:
        return {
            ...state,
            allUserDestinations: payload,
            allUserDestinationsLoading: false,
        };
      case ADD_DESTINATION:
        return {
          ...state,
          freightDestinations: [payload, ...state.freightDestinations],
          recentFreightDestinations: [payload, ...state.recentFreightDestinations],
          freightDestinationsLoading: false,
          recentFreightDestinationsLoading: false,
        };
      case UPDATE_DESTINATION:
        return {
          ...state,
          freightDestinations: state.freightDestinations.map((dest) =>
            dest._id === payload.id ? payload.dest : dest
          ),
          recentFreightDestinations: state.recentFreightDestinations.map((dest) =>
            dest._id === payload.id ? payload.dest : dest
          ),
          freightDestinationsLoading: false,
          recentFreightDestinationsLoading: false,
        };
      case DELETE_DESTINATION:
        return {
          ...state,
          freightDestinations: state.freightDestinations.filter(
            (destination) => destination._id !== payload
          ),
          freightDestinationsLoading: false,
        };
      case DESTINATION_ERROR:
        return {
          ...state,
          error: payload,
          checkoutFreightCompaniesLoading: false,
          freightDestinationsLoading: false,
          allFreightDestinationsLoading: false,
          allUserDestinationsLoading: false,
        };
      default:
        return state;
    }
  }
  