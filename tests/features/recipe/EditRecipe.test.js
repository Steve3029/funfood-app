import React from 'react';
import { shallow } from 'enzyme';
import { EditRecipe } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<EditRecipe />);
  expect(renderedComponent.find('.recipe-edit-recipe').length).toBe(1);
});
