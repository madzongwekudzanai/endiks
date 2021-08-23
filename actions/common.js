import { LOAD_FORM, UNLOAD_FORM, SHOW_DISMISS, HIDE_DISMISS, LOAD_PAGE,
  UNLOAD_PAGE, SET_OPTION_FORM_DATA } from "./types";

// Load Form
export const loadForm = () => (dispatch) => {
  dispatch({
    type: LOAD_FORM,
  });
};

// Unload Form
export const unloadForm = () => (dispatch) => {
  dispatch({
    type: UNLOAD_FORM,
  });
};

// Show dismissible alert
export const showDismissible = (msg) => (dispatch) => {
  dispatch({
    type: SHOW_DISMISS,
    payload: msg,
  });
};

// Hide dismissible alert
export const hideDismissible = () => (dispatch) => {
  dispatch({
    type: HIDE_DISMISS,
  });
};

// Load page
export const loadPage = () => (dispatch) => {
  dispatch({
    type: LOAD_PAGE,
  });
};

// Unload page
export const unloadPage = () => (dispatch) => {
  dispatch({
    type: UNLOAD_PAGE,
  });
};

// Unload page
export const setOptionFormData = (name, value) => (dispatch) => {
  dispatch({
    type: SET_OPTION_FORM_DATA,
    payload: {name, value}
  });
};
