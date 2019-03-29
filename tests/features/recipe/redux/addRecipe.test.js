import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  RECIPE_ADD_RECIPE_BEGIN,
  RECIPE_ADD_RECIPE_SUCCESS,
  RECIPE_ADD_RECIPE_FAILURE,
  RECIPE_ADD_RECIPE_DISMISS_ERROR,
} from '../../../../src/features/recipe/redux/constants';

import {
  addRecipe,
  dismissAddRecipeError,
  reducer,
} from '../../../../src/features/recipe/redux/addRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('recipe/redux/addRecipe', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addRecipe succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addRecipe())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_ADD_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_ADD_RECIPE_SUCCESS);
      });
  });

  it('dispatches failure action when addRecipe fails', () => {
    const store = mockStore({});

    return store.dispatch(addRecipe({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_ADD_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_ADD_RECIPE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddRecipeError', () => {
    const expectedAction = {
      type: RECIPE_ADD_RECIPE_DISMISS_ERROR,
    };
    expect(dismissAddRecipeError()).toEqual(expectedAction);
  });

  it('handles action type RECIPE_ADD_RECIPE_BEGIN correctly', () => {
    const prevState = { addRecipePending: false };
    const state = reducer(
      prevState,
      { type: RECIPE_ADD_RECIPE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addRecipePending).toBe(true);
  });

  it('handles action type RECIPE_ADD_RECIPE_SUCCESS correctly', () => {
    const prevState = { addRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_ADD_RECIPE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addRecipePending).toBe(false);
  });

  it('handles action type RECIPE_ADD_RECIPE_FAILURE correctly', () => {
    const prevState = { addRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_ADD_RECIPE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addRecipePending).toBe(false);
    expect(state.addRecipeError).toEqual(expect.anything());
  });

  it('handles action type RECIPE_ADD_RECIPE_DISMISS_ERROR correctly', () => {
    const prevState = { addRecipeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: RECIPE_ADD_RECIPE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addRecipeError).toBe(null);
  });
});

