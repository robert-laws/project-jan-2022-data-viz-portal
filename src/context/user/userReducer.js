import { CLEAR_PROFILE, LOAD_PROFILE, PROFILE_ERROR } from '../types';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
        profileError: null,
        isProfileLoading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        profileError: action.payload,
        isProfileLoading: false,
      };

    case CLEAR_PROFILE:
      return {
        profile: null,
        isProfileLoading: true,
        profileError: null,
      };

    default:
      return state;
  }
};

export default userReducer;
