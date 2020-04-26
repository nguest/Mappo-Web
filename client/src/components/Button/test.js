import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import Button from '.';

describe('Button', () => {
  let wrapper;
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      label: 'I be label',
      icon: 'iconname',
    };
    wrapper = shallow(<Button {...defaultProps} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('calls onClick when clicked', () => {
    const onButtonClick = spy();
    wrapper = shallow(<Button onClick={onButtonClick} {...defaultProps} />);
    wrapper.simulate('click', new Event('click'));
    expect(onButtonClick.callCount).toEqual(1);
  });
  it('renders a label', () => {
    expect(wrapper.text()).toEqual('I be label');
  });
  it('renders an icon if given', () => {
    expect(wrapper.find('i')).toHaveLength(1);
  });
});
