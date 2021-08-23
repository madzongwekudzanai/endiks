import { SET_OPTION_FORM_DATA } from "../actions/types";

const initialState = {
    firstOptionProductRef: "",
    secondOptionProductRef: "",
    thirdOptionProductRef: "",
    fourthOptionProductRef: "",
    id: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_OPTION_FORM_DATA:
      return {
        ...state,
        [payload.name]: payload.value,
      };
    default:
      return state;
  }
}
