/** @jsx jsx */

import spacing from '../../styles/spacing';

const styles = {
  main: {
    height: '100%',
    padding: `${spacing.sideBarW}px 0`,
    ul: {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      alignItems: 'center',
      li: {
        listStyle: 'none',
      },
      a: {
        padding: spacing.unit * 4,
        i: {
          fontSize: 30,
        },
      },
    },
  },
};

export default styles;
