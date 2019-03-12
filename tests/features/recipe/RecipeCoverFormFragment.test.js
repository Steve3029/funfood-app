import React from 'react';
import { shallow } from 'enzyme';
import { RecipeCoverFormFragment } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RecipeCoverFormFragment />);
  expect(renderedComponent.find('.recipe-recipe-cover-form-fragment').length).toBe(1);
});
