// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  HOME_USER_LOGOUT,
} from './constants';

export function userLogout() {
  return {
    type: HOME_USER_LOGOUT,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_USER_LOGOUT:
      return {
        ...state,
        isSignIn: false,
        auth_user: null,
      };

    default:
      return state;
  }
}
