import React from 'react';
import { shallow } from 'enzyme';
import Header from '.';

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toHaveLength(1);
  });
});
