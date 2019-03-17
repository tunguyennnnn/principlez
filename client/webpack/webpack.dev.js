const commonPaths = require('./config.path');

const isDev = process.env.NODE_ENV !== 'production';
module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: commonPaths.publicPath,
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
  },
};
