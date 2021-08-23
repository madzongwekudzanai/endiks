import { SET_LANGUAGE_SUCCESS } from "./types";

// Load User
export const setLanguage = (e) => async (dispatch) => {
  dispatch({
    type: SET_LANGUAGE_SUCCESS,
    payload: e.target.value,
  });
};
