import React from 'react';
import { shallow } from 'enzyme';
import { AddNewRecipe } from '../../../src/features/recipe/AddNewRecipe';

describe('recipe/AddNewRecipe', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipe: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddNewRecipe {...props} />
    );

    expect(
      renderedComponent.find('.recipe-add-new-recipe').length
    ).toBe(1);
  });
});
