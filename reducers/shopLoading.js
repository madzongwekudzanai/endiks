import {
  LOAD_CART,
  UNLOAD_CART,
  LOAD_PAGINATION,
  UNLOAD_PAGINATION,
  LOAD_WISHLIST,
  UNLOAD_WISHLIST,
  LOAD_ORDER,
  UNLOAD_ORDER,
  LOAD_PAGE,
  UNLOAD_PAGE,
} from "../actions/types";

const initialState = {
  cartLoading: false,
  pageLoading: false,
  paginationLoading: false,
  wishlistLoading: false,
  orderLoading: false,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case LOAD_CART:
      return {
        ...state,
        cartLoading: true,
      };
    case UNLOAD_CART:
      return {
        ...state,
        cartLoading: false,
      };
    case LOAD_PAGE:
      return {
        ...state,
        pageLoading: true,
      };
    case UNLOAD_PAGE:
      return {
        ...state,
        pageLoading: false,
      };
    case LOAD_PAGINATION:
      return {
        ...state,
        paginationLoading: true,
      };
    case UNLOAD_PAGINATION:
      return {
        ...state,
        paginationLoading: false,
      };
    case LOAD_WISHLIST:
      return {
        ...state,
        wishlistLoading: true,
      };
    case UNLOAD_WISHLIST:
      return {
        ...state,
        wishlistLoading: false,
      };
    case LOAD_ORDER:
      return {
        ...state,
        orderLoading: true,
      };
    case UNLOAD_ORDER:
      return {
        ...state,
        orderLoading: false,
      };
    default:
      return state;
  }
}
