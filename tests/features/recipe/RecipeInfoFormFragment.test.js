import React from 'react';
import { shallow } from 'enzyme';
import { RecipeInfoFormFragment } from '../../../src/features/recipe/RecipeInfoFormFragment';

describe('recipe/RecipeInfoFormFragment', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipe: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RecipeInfoFormFragment {...props} />
    );

    expect(
      renderedComponent.find('.recipe-recipe-info-form-fragment').length
    ).toBe(1);
  });
});
