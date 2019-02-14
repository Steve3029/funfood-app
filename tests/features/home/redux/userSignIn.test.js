import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_USER_SIGN_IN_BEGIN,
  HOME_USER_SIGN_IN_SUCCESS,
  HOME_USER_SIGN_IN_FAILURE,
  HOME_USER_SIGN_IN_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  userSignIn,
  dismissUserSignInError,
  reducer,
} from '../../../../src/features/home/redux/userSignIn';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/userSignIn', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when userSignIn succeeds', () => {
    const store = mockStore({});

    return store.dispatch(userSignIn())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USER_SIGN_IN_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USER_SIGN_IN_SUCCESS);
      });
  });

  it('dispatches failure action when userSignIn fails', () => {
    const store = mockStore({});

    return store.dispatch(userSignIn({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USER_SIGN_IN_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USER_SIGN_IN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUserSignInError', () => {
    const expectedAction = {
      type: HOME_USER_SIGN_IN_DISMISS_ERROR,
    };
    expect(dismissUserSignInError()).toEqual(expectedAction);
  });

  it('handles action type HOME_USER_SIGN_IN_BEGIN correctly', () => {
    const prevState = { userSignInPending: false };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_IN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignInPending).toBe(true);
  });

  it('handles action type HOME_USER_SIGN_IN_SUCCESS correctly', () => {
    const prevState = { userSignInPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_IN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignInPending).toBe(false);
  });

  it('handles action type HOME_USER_SIGN_IN_FAILURE correctly', () => {
    const prevState = { userSignInPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_IN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignInPending).toBe(false);
    expect(state.userSignInError).toEqual(expect.anything());
  });

  it('handles action type HOME_USER_SIGN_IN_DISMISS_ERROR correctly', () => {
    const prevState = { userSignInError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_IN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignInError).toBe(null);
  });
});

