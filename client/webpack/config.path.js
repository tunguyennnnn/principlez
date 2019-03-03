const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '..', '..', 'apigateway/build/public'),
  entryPath: path.resolve(__dirname, '..', 'src/index.js'),
  assetPath: path.resolve(__dirname, '..', 'src/assets'),
  templatePath: path.resolve(__dirname, '..', 'src/index.html'),
};
