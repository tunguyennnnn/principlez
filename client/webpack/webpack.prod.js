const configPath = require('./config.path');

module.exports = {
  mode: 'production',
  output: {
    filename: `[name].[hash].js`,
    path: configPath.outputPath,
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devtool: 'source-map',
};
