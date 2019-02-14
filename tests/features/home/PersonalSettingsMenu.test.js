import React from 'react';
import { shallow } from 'enzyme';
import { PersonalSettingsMenu } from '../../../src/features/home/PersonalSettingsMenu';

describe('home/PersonalSettingsMenu', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PersonalSettingsMenu {...props} />
    );

    expect(
      renderedComponent.find('.home-personal-settings-menu').length
    ).toBe(1);
  });
});
