import axios from "axios";
import {
  GET_PRODUCT_CATEGORIES,
  ADD_PRODUCT,
  PRODUCT_ERROR,
  GET_PRODUCT,
  CLEAR_PRODUCT,
  DELETE_PRODUCT,
  GET_CONDITIONS,
  AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS,
  SEARCHED_SEARCH_PRODUCTS,
  GET_SELLER_PRODUCTS,
  GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS,
  GET_CATEGORY_SUBCATEGORY_PRODUCTS_COUNT,
  GET_CATEGORY_SUBCATEGORY_PRODUCTS,
  GET_NEW_ARRIVALS,
  GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS_COUNT,
  GET_PAGINATED_SELLER_PRODUCTS,
  AUTOCOMPLETED_SELLER_PRODUCTS,
  AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS,
  GET_PAGINATED_SELLER_PRODUCTS_COUNT,
  AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS_COUNT,
  SEARCHED_SELLER_PRODUCTS_COUNT,
  AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS_COUNT,
  SEARCHED_SEARCH_PRODUCTS_COUNT,
  SEARCHED_CATEGORY_PRODUCTS_COUNT,
  SEARCHED_PRODUCTS_COUNT,
  GET_SELLER_CATEGORIES,
  SEARCHED_SELLER_PRODUCTS,
  GET_RECENT_PRODUCTS,
  GET_CATEGORY_PRODUCTS,
  AUTOCOMPLETED_CATEGORY_PRODUCTS,
  SEARCHED_CATEGORY_PRODUCTS,
  AUTOCOMPLETED_PRODUCTS,
  SEARCHED_PRODUCTS,
  LOAD_FORM,
  UNLOAD_FORM,
  LOAD_PAGINATION,
  UNLOAD_PAGINATION,
  UPDATE_PRODUCT,
  LOAD_DELETE,
  UNLOAD_DELETE,
  GET_PRODUCT_OPTIONS,
  CLEAR_PRODUCT_OPTIONS,
  MULTI_ADDED
} from "./types";
import { setAlert } from "./alert";
import Router from "next/router";

// Get product categories
export const getProductCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/category");
    dispatch({
      type: GET_PRODUCT_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get product conditions
export const getProductConditions = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/conditions");
    dispatch({
      type: GET_CONDITIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get recent products
export const getRecentProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/seller/recent-products/me");
    dispatch({
      type: GET_RECENT_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get new arrivals products
export const getNewArrivals = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "/api/products/new_products/all-products/arrivals"
    );
    dispatch({
      type: GET_NEW_ARRIVALS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get product categories
export const getSellerCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/category/seller");
    dispatch({
      type: GET_SELLER_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get seller products
export const getCurrentSellerProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products/seller/all-products/me");
    dispatch({
      type: GET_SELLER_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get single product options
export const getProductOptions = (sellerId, multipleRef) => async (
  dispatch
) => {
  try {
    dispatch({
      type: CLEAR_PRODUCT_OPTIONS,
    });
    const res = await axios.get(
      `/api/products/options/${sellerId}/${multipleRef}`
    );
    dispatch({
      type: GET_PRODUCT_OPTIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get current seller products
export const getPaginatedSellerProducts = (sellerId, page = 1) => async (
  dispatch
) => {
  try {
    dispatch({
      type: LOAD_PAGINATION,
    });
    const res = await axios.get(`/api/products/${sellerId}/${page}`);
    dispatch({
      type: GET_PAGINATED_SELLER_PRODUCTS,
      payload: res.data.products,
    });
    dispatch({
      type: GET_PAGINATED_SELLER_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get category sub category and group products
export const getCatSubCatGroupProducts = (
  category,
  subCategory,
  group,
  page,
  loc
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: LOAD_PAGINATION,
    });
    const res = await axios.post(
      `/api/products/specific/${category}/${subCategory}/${group}/${page}`, { loc }, config
    );
    dispatch({
      type: GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS,
      payload: res.data.products,
    });
    dispatch({
      type: GET_CATEGORY_SUBCATEGORY_GROUP_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get category sub category products
export const getCatSubCatProducts = (category, subCategory, page, loc) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: LOAD_PAGINATION,
    });
    const res = await axios.post(
      `/api/products/sub_category_products/categories/${category}/${subCategory}/${page}`, { loc }, config
    );
    dispatch({
      type: GET_CATEGORY_SUBCATEGORY_PRODUCTS,
      payload: res.data.products,
    });
    dispatch({
      type: GET_CATEGORY_SUBCATEGORY_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get category products
export const getCategoryProducts = (category, page) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_PAGINATION,
    });
    const res = await axios.get(`/api/products/${category}/${page}`);
    dispatch({
      type: GET_CATEGORY_PRODUCTS,
      payload: res.data,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Autocomplete products
export const autocompleteProducts = (content) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/keywords/auto-complete",
      { content },
      config
    );
    dispatch({
      type: AUTOCOMPLETED_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Search products
export const searchProducts = (content, page) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: LOAD_PAGINATION,
    });
    const res = await axios.post(
      `/api/products/search-products/${page}`,
      { content },
      config
    );
    dispatch({
      type: SEARCHED_PRODUCTS,
      payload: res.data.results,
    });
    dispatch({
      type: SEARCHED_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Search non autocomplete products
export const searchAutocompleteProducts = (content, page) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: LOAD_PAGINATION,
    });
    const res = await axios.post(
      `/api/products/auto-complete-products-results/${page}`,
      { content },
      config
    );
    dispatch({
      type: SEARCHED_SEARCH_PRODUCTS,
      payload: res.data.results,
    });
    dispatch({
      type: SEARCHED_SEARCH_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Autocomplete category products
export const autocompleteCategoryProducts = (formData, category) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/products/auto-complete-category/${category}`,
      formData,
      config
    );
    dispatch({
      type: AUTOCOMPLETED_CATEGORY_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Search category products
export const searchCategoryProducts = (content, category, page, loc) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: LOAD_PAGINATION,
    });

    const res = await axios.post(
      `/api/products/search-category-products/${category}/${page}`,
      { content, loc },
      config
    );
    dispatch({
      type: SEARCHED_CATEGORY_PRODUCTS,
      payload: res.data.results,
    });
    dispatch({
      type: SEARCHED_CATEGORY_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Search non autocomplete category products
export const searchAutocompleteCategoryProducts = (
  content,
  category,
  page,
  loc
) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({
      type: LOAD_PAGINATION,
    });

    const res = await axios.post(
      `/api/products/auto-complete-category-results/${category}/${page}`,
      { content, loc },
      config
    );
    dispatch({
      type: AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS,
      payload: res.data.results,
    });
    dispatch({
      type: AUTOCOMPLETED_SEARCH_CATEGORY_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Autocomplete seller products
export const autocompleteSellerProducts = (content, sellerId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/products/auto-complete-seller/${sellerId}`,
      { content },
      config
    );
    dispatch({
      type: AUTOCOMPLETED_SELLER_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Search seller products
export const searchSellerProducts = (content, sellerId, page) => async (
  dispatch
) => {
  try {
    dispatch({
      type: LOAD_PAGINATION,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/products/search-seller-products/${sellerId}/${page}`,
      { content },
      config
    );
    dispatch({
      type: SEARCHED_SELLER_PRODUCTS,
      payload: res.data.results,
    });
    dispatch({
      type: SEARCHED_SELLER_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Search auto complete seller products
export const searchAutocompleteSellerProducts = (
  content,
  sellerId,
  page
) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_PAGINATION,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `/api/products/auto-complete-seller-results/${sellerId}/${page}`,
      { content },
      config
    );
    dispatch({
      type: AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS,
      payload: res.data.results,
    });
    dispatch({
      type: AUTOCOMPLETED_SELLER_SEARCH_PRODUCTS_COUNT,
      payload: res.data.pages,
    });
    dispatch({
      type: UNLOAD_PAGINATION,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_PAGINATION,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Get product
export const getProduct = (formData = {}) => async (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (formData.id) {
      Router.push(`/products/product_detail?product_id=${formData.id}`)
    }
    const res = await axios.post(`/api/products/id_or_not`, formData, config);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
    Router.push(`/products/product_detail?product_id=${res.data && res.data._id}`)
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
    dispatch(setAlert(err.response.data, "danger"));
  }
};

// Clear product
export const clearProduct = () => (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT,
  });
};

// Create product
export const createProduct = (formData, sellerId) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/products", formData, config);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert(formData.msg, "success"));
    Router.push(
      `/seller/dashboard?page=products&store_id=${sellerId}&page_number=1`
    );
    dispatch({
      type: UNLOAD_FORM,
    });
    await axios.get("/api/category/user-category");
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err, status: err.response.status },
      });
    }
  }
};

// Create multiple products at once
export const addMultipleProducts = (formData, sellerId, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/products/multiple", formData, config);
    dispatch({
      type: MULTI_ADDED,
      payload: res.data,
    });
    Router.push(
      `/seller/dashboard?page=products&store_id=${sellerId}&page_number=1`
    );
    dispatch(setAlert(msg, "success"));
    dispatch({
      type: UNLOAD_FORM,
    });
    await axios.get("/api/category/user-category");
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger", 20000));
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err, status: err.response.status },
      });
    }
  }
};

// Create product option
export const addProductOptions = (formData, sellerId, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_FORM,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/products/options", formData, config);
    dispatch({
      type: DELETE_PRODUCT,
      payload: formData.productID,
    });
    dispatch({
      type: MULTI_ADDED,
      payload: res.data,
    });
    Router.push(
      `/seller/dashboard?page=products&store_id=${sellerId}&page_number=1`
    );
    dispatch(setAlert(msg, "success"));
    dispatch({
      type: UNLOAD_FORM,
    });
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger", 20000));
      dispatch({
        type: PRODUCT_ERROR,
        payload: { msg: err, status: err.response.status },
      });
    }
  }
};

// Update product
export const updateProduct = (formData, productId, sellerId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: LOAD_FORM,
    });

    const res = await axios.put(`/api/products/${productId}`, formData, config);
    dispatch({
      type: UPDATE_PRODUCT,
      payload: { id: productId, product: res.data },
    });
    dispatch(setAlert(formData.msg, "success"));
    Router.push(
      `/seller/dashboard?page=products&store_id=${sellerId}&page_number=1`
    );
    dispatch({
      type: UNLOAD_FORM,
    });
    await axios.get("/api/category/user-category");
  } catch (err) {
    dispatch({
      type: UNLOAD_FORM,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err, status: err.response.status },
      });
    }
  }
};

// Delete product
export const deleteProduct = (id, msg) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_DELETE,
    });
    await axios.delete(`/api/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
    dispatch(setAlert(msg, "success"));
    dispatch({
      type: UNLOAD_DELETE,
    });
    await axios.get("/api/category/user-category");
  } catch (err) {
    dispatch({
      type: UNLOAD_DELETE,
    });
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Update categories
export const updateCategories = () => async (dispatch) => {
  try {
    await axios.get("/api/category/user-category");
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err, status: err.response.status },
    });
  }
};
