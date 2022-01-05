import {
  CLEAR_PROFILE,
  LOAD_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  RESET_UPDATE_PROFILE,
} from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profileError: null,
        isProfileLoading: false,
        isProfileUpdating: true,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        profileError: action.payload,
        isProfileLoading: false,
        isProfileUpdating: false,
      };

    case CLEAR_PROFILE:
      return {
        profile: null,
        isProfileLoading: true,
        isProfileUpdating: true,
        profileError: null,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
        isProfileUpdating: false,
        profileError: null,
      };

    case RESET_UPDATE_PROFILE:
      return {
        ...state,
        isProfileUpdating: true,
      };

    default:
      return state;
  }
};

export default userReducer;
