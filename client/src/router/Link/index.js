/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { any, bool, object, string } from 'prop-types';

import { historyPush, historyReplace } from '..';
import styles from './styles';

const Link = ({
  active,
  children,
  css,
  disabled,
  icon,
  isButton,
  replace,
  styleOverrides,
  title,
  to,
  type,
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    return replace ? historyReplace(to) : historyPush(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      css={css || styles.base(active, disabled, isButton, styleOverrides, type)}
      title={title}
      disabled={disabled}
    >
      { children }
      { icon && <i className={`icon ion-md-${icon}`} /> }
    </a>
  );
};

Link.propTypes = {
  children: any,
  css: object,
  disabled: bool,
  icon: string,
  isButton: bool,
  replace: bool,
  styleOverrides: object,
  title: string,
  to: string.isRequired,
  type: string,
};

export default Link;
