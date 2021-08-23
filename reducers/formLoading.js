import {
  LOAD_FORM,
  UNLOAD_FORM,
  LOAD_DELETE,
  UNLOAD_DELETE,
  CART_LOAD,
  CART_UNLOAD,
} from "../actions/types";

const initialState = {
  formLoading: false,
  loadingCart: false,
  deleteLoading: false,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOAD_FORM:
      return {
        ...state,
        formLoading: true,
      };
    case UNLOAD_FORM:
      return {
        ...state,
        formLoading: false,
      };
    case LOAD_DELETE:
      return {
        ...state,
        deleteLoading: true,
      };
    case UNLOAD_DELETE:
      return {
        ...state,
        deleteLoading: false,
      };
    case CART_LOAD:
      return {
        ...state,
        loadingCart: true,
      };
    case CART_UNLOAD:
      return {
        ...state,
        loadingCart: false,
      };
    default:
      return state;
  }
}
