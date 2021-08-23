import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_TO_CART,
  CART_ERROR,
  CLEAR_CART,
  CLEAR_WISHLIST,
  WISHLIST_ERROR,
  REMOVE_FROM_CART,
  GET_CART_ITEMS,
  REMOVE_CART,
  GET_WISHLIST_ITEMS,
  REMOVE_WISHLIST,
  UPDATE_CART,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  UPDATE_CART_QUANTITY,
} from "../actions/types";

const initialState = {
  cartItems: [],
  wishlistItems: [],
  token: typeof window !== "undefined" && localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  cartLoading: true,
  wishlistLoading: true,
  user: null,
  cartError: {},
  wishlistError: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
        cartLoading: false,
      };
    case GET_WISHLIST_ITEMS:
      return {
        ...state,
        wishlistItems: payload,
        wishlistLoading: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        user: { ...state.user, cart: { items: payload } },
        cartLoading: false,
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        user: { ...state.user, cart: { items: [] } },
        cartLoading: false,
      };
    case CLEAR_WISHLIST:
      return {
        ...state,
        wishlistItems: [],
        user: { ...state.user, wishlist: { items: [] } },
        wishlistLoading: false,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: {
            items: state.user.cart.items.filter(
              (item) => item.productId !== payload
            ),
          },
        },
        cartLoading: false,
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        user: { ...state.user, wishlist: { items: payload } },
        wishlistLoading: false,
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: {
            items: state.user.wishlist.items.filter(
              (item) => item.productId !== payload
            ),
          },
        },
        wishlistLoading: false,
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        user: {
          ...state.user,
          cart: {
            items: state.user.cart.items.map((item) =>
              item.productId === payload.id
                ? { ...item, quantity: payload.quantity }
                : item
            ),
          },
        },
        cartLoading: false,
      };
    case UPDATE_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === payload.id
            ? { ...item, quantity: payload.quantity }
            : item
        ),
        cartLoading: false,
      };
    case REMOVE_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.productId !== payload),
        cartLoading: false,
      };
    case REMOVE_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item._id !== payload
        ),
        wishlistLoading: false,
      };
    case LOGIN_SUCCESS:
      typeof window !== "undefined" &&
        localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case CART_ERROR:
      return {
        ...state,
        cartLoading: false,
        cartError: payload,
      };
    case WISHLIST_ERROR:
      return {
        ...state,
        wishlistLoading: false,
        wishlistError: payload,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      typeof window !== "undefined" && localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        cartLoading: false,
        wishlistLoading: false,
        user: null,
      };
    default:
      return state;
  }
}
