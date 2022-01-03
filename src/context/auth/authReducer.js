import { UPDATE_AUTH } from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return {
        user: action.payload,
        authIsReady: true,
      };

    default:
      return state;
  }
};

export default authReducer;
