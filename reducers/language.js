import { SET_LANGUAGE_SUCCESS } from "../actions/types";

const initialState = {
  loc: typeof window !== "undefined" && localStorage.getItem("language"),
  locLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LANGUAGE_SUCCESS:
      typeof window !== "undefined" &&
        localStorage.setItem("language", payload);
      return {
        ...state,
        loc: payload,
        locLoading: false,
      };
    default:
      return state;
  }
}
