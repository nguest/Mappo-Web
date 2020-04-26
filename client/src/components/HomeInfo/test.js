import React from 'react';
import { shallow } from 'enzyme';
import HomeInfo from '.';

describe('HomeInfo', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HomeInfo tracks={[]} />);
    expect(wrapper).toHaveLength(1);
  });
});
