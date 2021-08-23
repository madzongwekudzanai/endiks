import {
  ORDER_ERROR,
  GET_SELLER_ORDERS,
  GET_FREIGHT_ORDERS,
  GET_BUYER_ORDERS,
  GET_RECENT_SELLER_ORDERS,
  GET_RECENT_FREIGHT_ORDERS,
  GET_SELLER_ORDER_PRODUCTS,
  GET_ORIGINAL_SELLER_ORDER,
  GET_ORIGINAL_BUYER_ORDER_PRODUCTS,
  GET_BUYER_ORDER_PRODUCTS,
  GET_TRACKED_ORDER,
  CLEAR_BUYER_ORDER_PRODUCTS,
  CLEAR_SELLER_ORDER_PRODUCTS,
  FREIGHT_NOTIFY_USER,
  SELLER_SEND_ORDER,
  RECEIVE_CLIENT_TOKEN,
  CLEAR_TRACKED_ORDER,
  FREIGHT_RECEIVE_ORDER,
  FREIGHT_SEND_ORDER,
  BUYER_RECEIVE
} from "../actions/types";

const initialState = {
  sellerOrders: [],
  buyerOrders: [],
  freightOrders: [],
  recentSellerOrders: [],
  recentFreightOrders: [],
  sellerOrderProducts: [],
  originalSellerOrder: null,
  brainTreeAuthorization: null,
  trackedOrder: null,
  originalBuyerOrderProducts: [],
  buyerOrderProducts: [],
  sellerOrdersLoading: true,
  trackedOrderLoading: true,
  buyerOrdersLoading: true,
  brainTreeAuthorizationLoading: true,
  recentSellerOrdersLoading: true,
  sellerOrderProductsLoading: true,
  originalSellerOrderLoading: true,
  originalBuyerOrderProductsLoading: true,
  buyerOrderProductsLoading: true,
  freightOrdersLoading: true,
  recentFreightOrdersLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SELLER_ORDERS:
      return {
        ...state,
        sellerOrders: payload,
        sellerOrdersLoading: false,
      };
    case GET_FREIGHT_ORDERS:
      return {
        ...state,
        freightOrders: payload,
        freightOrdersLoading: false,
      };
    case GET_RECENT_FREIGHT_ORDERS:
      return {
        ...state,
        recentFreightOrders: payload,
        recentFreightOrdersLoading: false,
      };
    case GET_BUYER_ORDERS:
      return {
        ...state,
        buyerOrders: payload,
        buyerOrdersLoading: false,
      };
    case GET_RECENT_SELLER_ORDERS:
      return {
        ...state,
        recentSellerOrders: payload,
        recentSellerOrdersLoading: false,
      };
    case GET_SELLER_ORDER_PRODUCTS:
      return {
        ...state,
        sellerOrderProducts: payload,
        sellerOrderProductsLoading: false,
      };
    case CLEAR_SELLER_ORDER_PRODUCTS:
      return {
        ...state,
        sellerOrderProducts: [],
        sellerOrderProductsLoading: true,
      };
    case GET_ORIGINAL_SELLER_ORDER:
      return {
        ...state,
        originalSellerOrder: payload,
        originalSellerOrderLoading: false,
      };
    case RECEIVE_CLIENT_TOKEN:
      return {
        ...state,
        brainTreeAuthorization: payload,
        brainTreeAuthorizationLoading: false,
      };
    case GET_TRACKED_ORDER:
      return {
        ...state,
        trackedOrder: payload,
        trackedOrderLoading: false,
      };
    case CLEAR_TRACKED_ORDER:
      return {
        ...state,
        trackedOrder: null,
        trackedOrderLoading: true,
      };
    case GET_ORIGINAL_BUYER_ORDER_PRODUCTS:
      return {
        ...state,
        originalBuyerOrderProducts: payload,
        originalBuyerOrderProductsLoading: false,
      };
    case GET_BUYER_ORDER_PRODUCTS:
      return {
        ...state,
        buyerOrderProducts: payload,
        buyerOrderProductsLoading: false,
      };
    case CLEAR_BUYER_ORDER_PRODUCTS:
      return {
        ...state,
        buyerOrderProducts: [],
        buyerOrderProductsLoading: true,
        originalBuyerOrderProducts: [],
        originalBuyerOrderProductsLoading: true,
      };
    case SELLER_SEND_ORDER:
      return {
        ...state,
        sellerOrders: state.sellerOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
        originalSellerOrder: payload.order,
        recentSellerOrders: state.recentSellerOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
      };
    case FREIGHT_RECEIVE_ORDER:
      return {
        ...state,
        freightOrders: state.freightOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
        trackedOrder: payload.order,
        recentSellerOrders: state.recentSellerOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
      };
    case FREIGHT_SEND_ORDER:
      return {
        ...state,
        freightOrders: state.freightOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
        trackedOrder: payload.order,
        recentSellerOrders: state.recentSellerOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
      };
    case BUYER_RECEIVE:
      return {
        ...state,
        freightOrders: state.freightOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
        trackedOrder: payload.order,
        recentSellerOrders: state.recentSellerOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
      };
    case FREIGHT_NOTIFY_USER:
      return {
        ...state,
        freightOrders: state.freightOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
        trackedOrder: payload.order,
        recentSellerOrders: state.recentSellerOrders.map((order) =>
          order._id === payload.id ? payload.order : order
        ),
      };
    case ORDER_ERROR:
      return {
        ...state,
        sellerOrdersLoading: false,
        buyerOrdersLoading: false,
        recentSellerOrdersLoading: false,
        sellerOrderProductsLoading: false,
        originalSellerOrderLoading: false,
        originalBuyerOrderProductsLoading: false,
        buyerOrderProductsLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}
