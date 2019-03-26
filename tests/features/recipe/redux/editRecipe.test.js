import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  RECIPE_EDIT_RECIPE_BEGIN,
  RECIPE_EDIT_RECIPE_SUCCESS,
  RECIPE_EDIT_RECIPE_FAILURE,
  RECIPE_EDIT_RECIPE_DISMISS_ERROR,
} from '../../../../src/features/recipe/redux/constants';

import {
  editRecipe,
  dismissEditRecipeError,
  reducer,
} from '../../../../src/features/recipe/redux/editRecipe';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('recipe/redux/editRecipe', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when editRecipe succeeds', () => {
    const store = mockStore({});

    return store.dispatch(editRecipe())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_EDIT_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_EDIT_RECIPE_SUCCESS);
      });
  });

  it('dispatches failure action when editRecipe fails', () => {
    const store = mockStore({});

    return store.dispatch(editRecipe({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', RECIPE_EDIT_RECIPE_BEGIN);
        expect(actions[1]).toHaveProperty('type', RECIPE_EDIT_RECIPE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEditRecipeError', () => {
    const expectedAction = {
      type: RECIPE_EDIT_RECIPE_DISMISS_ERROR,
    };
    expect(dismissEditRecipeError()).toEqual(expectedAction);
  });

  it('handles action type RECIPE_EDIT_RECIPE_BEGIN correctly', () => {
    const prevState = { editRecipePending: false };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RECIPE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRecipePending).toBe(true);
  });

  it('handles action type RECIPE_EDIT_RECIPE_SUCCESS correctly', () => {
    const prevState = { editRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RECIPE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRecipePending).toBe(false);
  });

  it('handles action type RECIPE_EDIT_RECIPE_FAILURE correctly', () => {
    const prevState = { editRecipePending: true };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RECIPE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRecipePending).toBe(false);
    expect(state.editRecipeError).toEqual(expect.anything());
  });

  it('handles action type RECIPE_EDIT_RECIPE_DISMISS_ERROR correctly', () => {
    const prevState = { editRecipeError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: RECIPE_EDIT_RECIPE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.editRecipeError).toBe(null);
  });
});

