/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment, useEffect, useState } from 'react';
import { array, func, number, string } from 'prop-types';
import styles from './styles';

const defaultOptions = [
  {
    displayText: 'on',
    value: true,
  },
  {
    displayText: 'off',
    value: false,
  },
];

const Switch = ({
  callback = () => {},
  defaultOption = 0,
  name = 'defaultSwitch',
  options = defaultOptions,
}) => {
  const [selected, setSelected] = useState(options[defaultOption].value);

  useEffect(() => {
    callback(selected);
  }, [selected]);
  return (
    <div>
      {
      options.map((option, idx) => (
        <Fragment key={`${name}${option.displayText}`}>
          <input
            defaultChecked={idx === 0}
            id={`${name}${option.displayText}`}
            name={name}
            onClick={(e) => setSelected(e.currentTarget.value)}
            css={styles.input}
            type="radio"
            value={option.value}
          />
          <label
            css={styles.label}
            htmlFor={`${name}${option.displayText}`}
          >
            {option.displayText}
          </label>
        </Fragment>
      ))
      }
    </div>
  );
};

Switch.propTypes = {
  callback: func,
  defaultOption: number,
  name: string,
  options: array,
};

export default Switch;
