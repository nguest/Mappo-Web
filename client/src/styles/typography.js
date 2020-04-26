/** @jsx jsx */

import colors from './colors';

const typography = {
  base: {
    color: colors.text,
    display: 'flex',
    // fontFamily: '"aaaaaaa", "Roboto", "Helvetica", "Arial", sans-serif',
    fontFamily: '"Share Tech Mono", monospace',
    // fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: '0.01em',
    lineHeight: 1.5,
  },
  code: {
    fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
  },
  h1: {
    margin: 0,
    fontSize: '1.6em',
    lineHeight: 1,
  },
  h3: {
    margin: 0,
    fontSize: '1.2em',
    lineHeight: 1,
  },
};

export default typography;
