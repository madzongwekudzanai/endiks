import {
  GET_SELLER_PROFILE,
  SELLER_PROFILE_ERROR,
  CLEAR_SELLER_PROFILE,
  UPDATE_SELLER_PROFILE,
  GET_SELLER_PROFILES,
  AUTOCOMPLETED_SELLER_PROFILES,
  SEARCHED_SELLER_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  autocompletedProfiles: [],
  searchedProfiles: [],
  loading: true,
  autocompletedProfilesLoading: true,
  searchedProfilesLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SELLER_PROFILE:
    case UPDATE_SELLER_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_SELLER_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case AUTOCOMPLETED_SELLER_PROFILES:
      return {
        ...state,
        autocompletedProfiles: payload,
        autocompletedProfilesLoading: false,
      };
    case SEARCHED_SELLER_PROFILES:
      return {
        ...state,
        searchedProfiles: payload,
        searchedProfilesLoading: false,
      };
    case SELLER_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
        autocompletedProfilesLoading: false,
        searchedProfilesLoading: false,
      };
    case CLEAR_SELLER_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
