import React from 'react';
import { shallow } from 'enzyme';
import { ImageUploadPreview } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ImageUploadPreview />);
  expect(renderedComponent.find('.recipe-image-upload-preview').length).toBe(1);
});
