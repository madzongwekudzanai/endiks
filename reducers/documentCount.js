import {
  GET_PROFILES_COUNT,
  GET_SEARCHED_PROFILES_COUNT,
  GET_PAGINATED_SELLER_PRODUCTS_COUNT,
  AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS_COUNT,
  SEARCHED_SELLER_PRODUCTS_COUNT,
  AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS_COUNT,
  SEARCHED_PRODUCTS_COUNT,
  SEARCHED_SEARCH_PRODUCTS_COUNT,
  SEARCHED_CATEGORY_PRODUCTS_COUNT,
  GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS_COUNT,
  GET_CATEGORY_SUBCATEGORY_PRODUCTS_COUNT,
} from "../actions/types";

const initialState = {
  profilesCount: null,
  searchedProfilesCount: null,
  paginatedSellerProductsCount: null,
  categorySubCategoryCount: null,
  categorySubCategoryGroupCount: null,
  autocompletedSellerSearchProductsCount: null,
  searchedSellerProductsCount: null,
  autocompletedSearchCategoryProductsCount: null,
  searchedProductsCount: null,
  autocompletedSearchedProductsCount: null,
  searchedCategoryProductsCount: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES_COUNT:
      return {
        ...state,
        profilesCount: payload,
      };
    case GET_SEARCHED_PROFILES_COUNT:
      return {
        ...state,
        searchedProfilesCount: payload,
      };
    case GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS_COUNT:
      return {
        ...state,
        categorySubCategoryGroupCount: payload,
      };
    case GET_CATEGORY_SUBCATEGORY_PRODUCTS_COUNT:
      return {
        ...state,
        categorySubCategoryCount: payload,
      };
    case GET_PAGINATED_SELLER_PRODUCTS_COUNT:
      return {
        ...state,
        paginatedSellerProductsCount: payload,
      };
    case AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS_COUNT:
      return {
        ...state,
        autocompletedSellerSearchProductsCount: payload,
      };
    case SEARCHED_SELLER_PRODUCTS_COUNT:
      return {
        ...state,
        searchedSellerProductsCount: payload,
      };
    case AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS_COUNT:
      return {
        ...state,
        autocompletedSearchCategoryProductsCount: payload,
      };
    case SEARCHED_PRODUCTS_COUNT:
      return {
        ...state,
        searchedProductsCount: payload,
      };
    case SEARCHED_SEARCH_PRODUCTS_COUNT:
      return {
        ...state,
        autocompletedSearchedProductsCount: payload,
      };
    case SEARCHED_CATEGORY_PRODUCTS_COUNT:
      return {
        ...state,
        searchedCategoryProductsCount: payload,
      };
    default:
      return state;
  }
}
