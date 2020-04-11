const path = require('path');
const { override, addWebpackPlugin, addWebpackAlias, fixBabelImports, addLessLoader } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    noIeCompat: true,
    localIdentName: '[local]--[hash:base64:5]'
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  addWebpackPlugin(new AntdDayjsWebpackPlugin()),
);
