import React from 'react';
import { shallow } from 'enzyme';
import { RecipeCookStepsFormFragment } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RecipeCookStepsFormFragment />);
  expect(renderedComponent.find('.recipe-recipe-cook-steps-form-fragment').length).toBe(1);
});
