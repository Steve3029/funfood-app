import React from 'react';
import { shallow } from 'enzyme';
import { RecipeInfoFormFragment } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RecipeInfoFormFragment />);
  expect(renderedComponent.find('.recipe-recipe-info-form-fragment').length).toBe(1);
});
