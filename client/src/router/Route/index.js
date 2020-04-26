import React, { cloneElement, Component } from 'react';
import { bool, func, object, string } from 'prop-types';

import {
  register,
  unregister,
  matchPath,
} from '..';


class Route extends Component {
  componentDidMount() {
    addEventListener('popstate', this.handlePop);
    register(this);
  }

  componentWillUnmount() {
    unregister(this);
    removeEventListener('popstate', this.handlePop);
  }

  handlePop = () => this.forceUpdate();

  render() {
    const { path, exact, component, render } = this.props;

    const match = matchPath(location.pathname, { path, exact });
    const params = location.pathname.split('/').pop();
    if (!match) return null;

    if (component && match) return cloneElement(component, { params });

    if (render) return render({ match });

    return null;
  }
}

Route.propTypes = {
  path: string,
  exact: bool,
  component: object,
  render: func,
};

export default Route;
