/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { oneOfType, number, string } from 'prop-types';
import Link from '../../router/Link';

import styles from './styles';


const Sidebar = ({
  firstTrackId,
}) => (
  <aside css={styles.main}>
    <ul>
      <li>
        <Link
          to="/"
          isButton
          icon="home"
          type="invisible"
          active={location.pathname === '/'}
        />
      </li>
      <li>
        <Link
          to={`/single/${firstTrackId}`}
          isButton
          icon="map"
          type="invisible"
          active={location.pathname.indexOf('/single') !== -1}
          disabled={!firstTrackId}
        />
      </li>
      <li>
        <Link
          to="/settings"
          isButton
          icon="settings"
          type="invisible"
          active={location.pathname === '/settings'}
        />
      </li>
    </ul>
  </aside>
);

Sidebar.propTypes = {
  firstTrackId: oneOfType([number, string]),
};

export default Sidebar;
