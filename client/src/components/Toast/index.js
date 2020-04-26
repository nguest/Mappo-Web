/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useEffect, useRef, useState } from 'react';
import { oneOf, string } from 'prop-types';
import styles from './styles';

const Toast = ({
  message = 'There was an error',
  noteType,
}) => {
  const timerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const setTimer = () => {
    timerRef.current = setTimeout(() => {
      setIsActive(false);
    }, 5000);
  };

  useEffect(() => {
    setIsActive(true);
    setTimer();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [message]);

  if (isActive) {
    return (
      <section
        css={styles.container(noteType)}
        onClick={() => setIsActive(false)}
      >
        { message }
      </section>
    );
  }
  return null;
};

Toast.propTypes = {
  message: string,
  noteType: oneOf(['OK', 'ERROR']),
};

export default Toast;
