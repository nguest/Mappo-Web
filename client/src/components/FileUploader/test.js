import React from 'react';
import { shallow } from 'enzyme';
import FileUploader from '.';

describe('FileUploader', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FileUploader />);
    expect(wrapper).toHaveLength(1);
  });
});
