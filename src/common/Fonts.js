// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import l300 from 'typeface-roboto/files/roboto-latin-300.woff2';
import l300i from 'typeface-roboto/files/roboto-latin-300italic.woff2';
import l400 from 'typeface-roboto/files/roboto-latin-400.woff2';
import l400i from 'typeface-roboto/files/roboto-latin-400italic.woff2';
import l500 from 'typeface-roboto/files/roboto-latin-500.woff2';
import l500i from 'typeface-roboto/files/roboto-latin-500italic.woff2';

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
// eslint-disable-next-line
class FontFace extends React.Component<{}> {
  render() {
    return null;
  }
}

export default withStyles(
  {
    '@global': {
      '@font-face': [
        {
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 300,
          src: `url(${l300}) format('woff2')`,
        },
        {
          fontFamily: 'Roboto',
          fontStyle: 'italic',
          fontDisplay: 'swap',
          fontWeight: 300,
          src: `url(${l300i}) format('woff2')`,
        },
        {
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `url(${l400}) format('woff2')`,
        },
        {
          fontFamily: 'Roboto',
          fontStyle: 'italic',
          fontDisplay: 'swap',
          fontWeight: 400,
          src: `url(${l400i}) format('woff2')`,
        },
        {
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: `url(${l500}) format('woff2')`,
        },
        {
          fontFamily: 'Roboto',
          fontStyle: 'italic',
          fontDisplay: 'swap',
          fontWeight: 500,
          src: `url(${l500i}) format('woff2')`,
        },
      ],
    },
  },
  { name: 'MuiFontFace' },
)(FontFace);
