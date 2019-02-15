import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/recipe/DefaultPage';

describe('recipe/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      recipe: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.recipe-default-page').length
    ).toBe(1);
  });
});
