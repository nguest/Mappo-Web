/** @jsx jsx */

import spacing from '../../styles/spacing';

const styles = {
  main: {
    padding: `0 ${spacing.gridGap}px ${spacing.unit * 3}px 0`,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '450px 150px 150px',
    gridGap: spacing.gridGap,
    height: '100%',
    '> *': {
      borderRadius: 4,
      boxShadow: '0 0px 20px 10px rgba(255,255,255,0.02)',
    },
  },
};

export default styles;
