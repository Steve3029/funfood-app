import React from 'react';
import { shallow } from 'enzyme';
import { RecipeForm } from '../../../src/features/recipe/RecipeForm';

describe('recipe/RecipeForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipe: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RecipeForm {...props} />
    );

    expect(
      renderedComponent.find('.recipe-recipe-form').length
    ).toBe(1);
  });
});
