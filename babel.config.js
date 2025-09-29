module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],   // or '@babel/preset-env' in bare RN
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      }]
    ]
  };
};
