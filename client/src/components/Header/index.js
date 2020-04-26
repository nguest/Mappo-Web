/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import Link from '../../router/Link';
import spacing from '../../styles/spacing';
import { Logo as MappoLogo } from '../Logo';


import styles from './styles';


const Header = () => (
  <header css={styles.header}>
    <Link to="/" replace={false} styleOverrides={styles.link}>
      <MappoLogo width={spacing.unit * 5} height={spacing.unit * 5} style={styles.logo} />
      <h1 css={styles.h1}>Mappo</h1>
    </Link>
  </header>
);

Header.propTypes = {

};

export default Header;
