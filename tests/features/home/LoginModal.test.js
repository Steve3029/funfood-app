import React from 'react';
import { shallow } from 'enzyme';
import { LoginModal } from '../../../src/features/home/LoginModal';

describe('home/LoginModal', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <LoginModal {...props} />
    );

    expect(
      renderedComponent.find('.home-login-modal').length
    ).toBe(1);
  });
});
