import { GET_SHIPPING_DESTINATIONS, SHIPPING_ERROR } from "../actions/types";

const initialState = {
  destinations: [],
  loading: true,
  shippingError: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIPPING_DESTINATIONS:
      return {
        ...state,
        destinations: payload,
        loading: false,
      };
    case SHIPPING_ERROR:
      return {
        ...state,
        loading: false,
        shippingError: payload,
      };
    default:
      return state;
  }
}
