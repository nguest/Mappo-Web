/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { func, string, oneOf } from 'prop-types';
import styles from './styles';

const Button = ({
  icon,
  label,
  onClick,
  title,
  type,
}) => (
  <button
    css={styles.button(null, null, type)}
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    }}
    title={title}
  >
    { label }
    { icon && <i className={`icon ion-md-${icon}`} /> }
  </button>
);

Button.propTypes = {
  icon: string,
  label: string,
  onClick: func,
  title: string,
  type: oneOf(['default', 'invisible']),
};

export default Button;
