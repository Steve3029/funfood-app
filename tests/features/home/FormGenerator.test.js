import React from 'react';
import { shallow } from 'enzyme';
import { FormGenerator } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormGenerator />);
  expect(renderedComponent.find('.home-form-generator').length).toBe(1);
});
