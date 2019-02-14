import {
  HOME_USER_LOGOUT,
} from '../../../../src/features/home/redux/constants';

import {
  userLogout,
  reducer,
} from '../../../../src/features/home/redux/userLogout';

describe('home/redux/userLogout', () => {
  it('returns correct action by userLogout', () => {
    expect(userLogout()).toHaveProperty('type', HOME_USER_LOGOUT);
  });

  it('handles action type HOME_USER_LOGOUT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_USER_LOGOUT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
