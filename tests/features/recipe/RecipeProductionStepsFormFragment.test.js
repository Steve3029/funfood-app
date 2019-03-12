import React from 'react';
import { shallow } from 'enzyme';
import { RecipeProductionStepsFormFragment } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RecipeProductionStepsFormFragment />);
  expect(renderedComponent.find('.recipe-recipe-production-steps-form-fragment').length).toBe(1);
});
