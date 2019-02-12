import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_USER_SIGN_UP_BEGIN,
  HOME_USER_SIGN_UP_SUCCESS,
  HOME_USER_SIGN_UP_FAILURE,
  HOME_USER_SIGN_UP_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  userSignUp,
  dismissUserSignUpError,
  reducer,
} from '../../../../src/features/home/redux/userSignUp';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/userSignUp', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when userSignUp succeeds', () => {
    const store = mockStore({});

    return store.dispatch(userSignUp())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USER_SIGN_UP_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USER_SIGN_UP_SUCCESS);
      });
  });

  it('dispatches failure action when userSignUp fails', () => {
    const store = mockStore({});

    return store.dispatch(userSignUp({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_USER_SIGN_UP_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_USER_SIGN_UP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUserSignUpError', () => {
    const expectedAction = {
      type: HOME_USER_SIGN_UP_DISMISS_ERROR,
    };
    expect(dismissUserSignUpError()).toEqual(expectedAction);
  });

  it('handles action type HOME_USER_SIGN_UP_BEGIN correctly', () => {
    const prevState = { userSignUpPending: false };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_UP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignUpPending).toBe(true);
  });

  it('handles action type HOME_USER_SIGN_UP_SUCCESS correctly', () => {
    const prevState = { userSignUpPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_UP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignUpPending).toBe(false);
  });

  it('handles action type HOME_USER_SIGN_UP_FAILURE correctly', () => {
    const prevState = { userSignUpPending: true };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_UP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignUpPending).toBe(false);
    expect(state.userSignUpError).toEqual(expect.anything());
  });

  it('handles action type HOME_USER_SIGN_UP_DISMISS_ERROR correctly', () => {
    const prevState = { userSignUpError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_USER_SIGN_UP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.userSignUpError).toBe(null);
  });
});

