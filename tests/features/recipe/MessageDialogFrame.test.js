import React from 'react';
import { shallow } from 'enzyme';
import { MessageDialogFrame } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MessageDialogFrame />);
  expect(renderedComponent.find('.recipe-message-dialog-frame').length).toBe(1);
});
