import {
  GET_CURRENT_RATE,
  GET_TEMPORARY_QUOTE,
  GET_GBP_TO_USD,
  GET_CNY_TO_GBP,
} from "../actions/types";

const initialState = {
  rate: null,
  temporaryQuote: null,
  gbpToUsd: null,
  cnyToGbp: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_RATE:
      return {
        ...state,
        rate: payload,
      };
    case GET_GBP_TO_USD:
      return {
        ...state,
        gbpToUsd: payload,
      };
    case GET_CNY_TO_GBP:
      return {
        ...state,
        cnyToGbp: payload,
      };
    case GET_TEMPORARY_QUOTE:
      return {
        ...state,
        temporaryQuote: payload,
      };
    default:
      return state;
  }
}
