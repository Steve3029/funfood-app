import initialState from './initialState';
import { reducer as userSignUpReducer } from './userSignUp';
import { reducer as userLogoutReducer } from './userLogout';
import { reducer as userSignInReducer } from './userSignIn';

const reducers = [
  userSignUpReducer,
  userLogoutReducer,
  userSignInReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
