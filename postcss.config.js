const postcssPresetEnv = require('postcss-preset-env');
module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: ['Electron >= 6'],
    },
    'postcss-import': {},
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['html', 'body'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
    'postcss-nested': {},
  },
};
