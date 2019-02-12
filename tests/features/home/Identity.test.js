import React from 'react';
import { shallow } from 'enzyme';
import { Identity } from '../../../src/features/home/Identity';

describe('home/Identity', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Identity {...props} />
    );

    expect(
      renderedComponent.find('.home-identity').length
    ).toBe(1);
  });
});
