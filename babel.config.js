module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@App': './App',
          '@src': './src',
          '@utils': './src/utils',
          '@style': './src/style',
          '@theme': './src/theme',
          '@assets': './src/assets',
          '@commonComponents': './src/commonComponents',
          '@otherComponent': './src/otherComponent',
        },
      },
    ],
    'react-native-reanimated/plugin' // ✅ En sonda olmalı
  ],
};
