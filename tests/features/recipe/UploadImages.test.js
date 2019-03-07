import React from 'react';
import { shallow } from 'enzyme';
import { UploadImages } from '../../../src/features/recipe';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UploadImages />);
  expect(renderedComponent.find('.recipe-upload-images').length).toBe(1);
});
