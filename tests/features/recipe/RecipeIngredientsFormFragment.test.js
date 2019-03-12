import React from 'react';
import { shallow } from 'enzyme';
import { RecipeIngredientsFormFragment } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RecipeIngredientsFormFragment />);
  expect(renderedComponent.find('.recipe-recipe-ingredients-form-fragment').length).toBe(1);
});
