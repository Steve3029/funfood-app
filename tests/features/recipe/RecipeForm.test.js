import React from 'react';
import { shallow } from 'enzyme';
import { RecipeForm } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RecipeForm />);
  expect(renderedComponent.find('.recipe-recipe-form').length).toBe(1);
});
