import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Link from '.';

describe('HomeInfo', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Link to="linkUrl" />);
  });
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('adds correct link tag', () => {
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find({ href: 'linkUrl' })).toHaveLength(2);
  });
  it('renders an icon if passed', () => {
    wrapper = mount(<Link to="linkUrl" icon="iconName" />);
    expect(wrapper.find('i')).toHaveLength(1);
  });
  it('calls onClick when clicked', () => {
    wrapper = mount(<Link to="linkUrl" />);
    const instance = wrapper.instance()
    const onLinkClick = spy(instance.find('a'), 'onClick');

    wrapper.find('a').simulate('click', new Event('click'));
    expect(onLinkClick.callCount).toEqual(1);
  });
});
