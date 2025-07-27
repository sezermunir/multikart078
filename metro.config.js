const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  extraNodeModules: {
    '@App': path.resolve(__dirname, 'App'),
    '@src': path.resolve(__dirname, 'src'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@theme': path.resolve(__dirname, 'src/theme'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@style': path.resolve(__dirname, 'src/style'),
    '@commonComponents': path.resolve(__dirname, 'src/commonComponents'),
    '@otherComponent': path.resolve(__dirname, 'src/otherComponent'),
  },
};

module.exports = mergeConfig(defaultConfig, {});
