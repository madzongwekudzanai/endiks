import {
  GET_PRODUCT_CATEGORIES,
  PRODUCT_ERROR,
  GET_PRODUCT,
  GET_PRODUCT_OPTIONS,
  CLEAR_PRODUCT,
  CLEAR_PRODUCT_OPTIONS,
  GET_SELLER_PRODUCTS,
  AUTOCOMPLETED_SELLER_PRODUCTS,
  SEARCHED_SELLER_PRODUCTS,
  GET_CATEGORY_PRODUCTS,
  GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS,
  GET_CATEGORY_SUBCATEGORY_PRODUCTS,
  GET_NEW_ARRIVALS,
  UPDATE_PRODUCT,
  GET_SELLER_CATEGORIES,
  AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS,
  AUTOCOMPLETED_CATEGORY_PRODUCTS,
  SEARCHED_CATEGORY_PRODUCTS,
  GET_RECENT_PRODUCTS,
  CLEAR_PAGINATED_SELLER_PRODUCTS,
  GET_PAGINATED_SELLER_PRODUCTS,
  AUTOCOMPLETED_PRODUCTS,
  AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS,
  SEARCHED_PRODUCTS,
  ADD_PRODUCT,
  SEARCHED_SEARCH_PRODUCTS,
  GET_CONDITIONS,
  DELETE_PRODUCT,
  SHOW_DISMISS,
  HIDE_DISMISS,
  MULTI_ADDED
} from "../actions/types";

const initialState = {
  categories: [],
  conditions: [],
  productOptions: [],
  sellerCategories: [],
  singleProduct: null,
  recentProducts: [],
  newArrivals: [],
  searchedProducts: [],
  autocompletedSearchedProducts: [],
  autocompletedProducts: [],
  autocompletedSellerSearchProducts: [],
  categoryProducts: [],
  categorySubCategoryGroupProducts: [],
  autocompletedCategoryProducts: [],
  autocompletedSearchCategoryProducts: [],
  searchedCategoryProducts: [],
  autocompletedSellerProducts: [],
  searchedSellerProducts: [],
  sellerProducts: [],
  paginatedSellerProducts: [],
  categorySubCategoryProducts: [],
  loading: true,
  showDis: false,
  disMsg: null,
  loadingCategorySubCategoryProducts: true,
  productLoading: true,
  productOptionsLoading: true,
  loadingPaginatedSellerProducts: true,
  loadingCategories: true,
  loadingNewArrivals: true,
  loadingAutocompletedSellerSearchProducts: true,
  loadingAutocompletedSearchedProducts: true,
  loadingAutocompletedSearchCategoryProducts: true,
  loadingAutocompletedCategoryProducts: true,
  loadingSellerCategories: true,
  loadingCategorySubCategoryGroupProducts: true,
  loadingSearchedCategoryProducts: true,
  loadingSearchedSellerProducts: true,
  loadingSearchedProducts: true,
  sellerProductsLoading: true,
  conditionsLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SHOW_DISMISS:
      return {
        ...state,
        showDis: true,
        disMsg: payload,
      };
    case HIDE_DISMISS:
      return {
        ...state,
        showDis: false,
        disMsg: null,
      };
    case GET_SELLER_PRODUCTS:
      return {
        ...state,
        sellerProducts: payload,
        sellerProductsLoading: false,
      };
    case MULTI_ADDED:
      return {
        ...state,
        paginatedSellerProducts: payload.concat(state.paginatedSellerProducts),
        loadingPaginatedSellerProducts: false,
      };
    case GET_CONDITIONS:
      return {
        ...state,
        conditions: payload,
        conditionsLoading: false,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        sellerProducts: state.sellerProducts.map((product) =>
          product._id === payload.id ? payload.product : product
        ),
        sellerProductsLoading: false,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        sellerProducts: [payload, ...state.sellerProducts],
        recentProducts: [payload, ...state.recentProducts],
        sellerProductsLoading: false,
        loading: false,
      };
    case AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS:
      return {
        ...state,
        autocompletedSellerSearchProducts: payload,
        loadingAutocompletedSellerSearchProducts: false,
      };
    case AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS:
      return {
        ...state,
        autocompletedSearchCategoryProducts: payload,
        loadingAutocompletedSearchCategoryProducts: false,
      };
    case GET_PAGINATED_SELLER_PRODUCTS:
      return {
        ...state,
        paginatedSellerProducts: payload,
        loadingPaginatedSellerProducts: false,
      };
    case CLEAR_PAGINATED_SELLER_PRODUCTS:
      return {
        ...state,
        paginatedSellerProducts: [],
      };
    case GET_RECENT_PRODUCTS:
      return {
        ...state,
        recentProducts: payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        singleProduct: payload,
        productLoading: false,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        singleProduct: null,
      };
    case GET_PRODUCT_OPTIONS:
      return {
        ...state,
        productOptions: payload,
        productOptionsLoading: false,
      };
    case CLEAR_PRODUCT_OPTIONS:
      return {
        ...state,
        productOptions: [],
      };
    case AUTOCOMPLETED_SELLER_PRODUCTS:
      return {
        ...state,
        autocompletedSellerProducts: payload,
        loading: false,
      };
    case SEARCHED_SELLER_PRODUCTS:
      return {
        ...state,
        searchedSellerProducts: payload,
        loadingSearchedSellerProducts: false,
      };
    case GET_CATEGORY_PRODUCTS:
      return {
        ...state,
        categoryProducts: payload,
        loading: false,
      };
    case GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS:
      return {
        ...state,
        categorySubCategoryGroupProducts: payload,
        loadingCategorySubCategoryGroupProducts: false,
      };
    case GET_CATEGORY_SUBCATEGORY_PRODUCTS:
      return {
        ...state,
        categorySubCategoryProducts: payload,
        loadingCategorySubCategoryProducts: false,
      };
    case GET_NEW_ARRIVALS:
      return {
        ...state,
        newArrivals: payload,
        loadingNewArrivals: false,
      };
    case AUTOCOMPLETED_CATEGORY_PRODUCTS:
      return {
        ...state,
        autocompletedCategoryProducts: payload,
        loadingAutocompletedCategoryProducts: false,
      };
    case SEARCHED_CATEGORY_PRODUCTS:
      return {
        ...state,
        searchedCategoryProducts: payload,
        loadingSearchedCategoryProducts: false,
      };
    case AUTOCOMPLETED_PRODUCTS:
      return {
        ...state,
        autocompletedProducts: payload,
        loading: false,
      };
    case SEARCHED_PRODUCTS:
      return {
        ...state,
        searchedProducts: payload,
        loadingSearchedProducts: false,
      };
    case SEARCHED_SEARCH_PRODUCTS:
      return {
        ...state,
        autocompletedSearchedProducts: payload,
        loadingAutocompletedSearchedProducts: false,
      };
    case GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loadingCategories: false,
      };
    case GET_SELLER_CATEGORIES:
      return {
        ...state,
        sellerCategories: payload,
        loadingSellerCategories: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        paginatedSellerProducts: state.paginatedSellerProducts.filter(
          (product) => product._id !== payload
        ),
        loadingPaginatedSellerProducts: false,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        productLoading: false,
        loadingPaginatedSellerProducts: false,
        loadingCategories: false,
        loadingAutocompletedSellerSearchProducts: false,
        loadingAutocompletedSearchCategoryProducts: false,
        loadingSellerCategories: false,
        sellerProductsLoading: false,
        loadingSearchedSellerProducts: false,
        loadingAutocompletedSearchedProducts: false,
        loadingSearchedCategoryProducts: false,
        loadingNewArrivals: false,
        loadingCategorySubCategoryGroupProducts: false,
      };
    default:
      return state;
  }
}
