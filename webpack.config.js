const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (_, argv) => ({
  entry: {},
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: argv.mode === 'production' ? '/zamok-api-demo/' : '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: false,
    }),
  ],
  devServer: {
    port: 8081,
  },
});
