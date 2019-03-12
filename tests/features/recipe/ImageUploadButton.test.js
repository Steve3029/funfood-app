import React from 'react';
import { shallow } from 'enzyme';
import { ImageUploadButton } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ImageUploadButton />);
  expect(renderedComponent.find('.recipe-image-upload-button').length).toBe(1);
});
