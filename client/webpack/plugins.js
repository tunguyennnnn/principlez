const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const configPath = require("./config.path");

const webpackPlugins = () => {
  const copyFolders = [
    {
      from: configPath.imagesFolder,
      to: configPath.outputImageFolder,
      toType: "dir"
    }
  ];
  return [
    new HtmlWebpackPlugin({
      template: configPath.indexTemplate,
      inject: false
    }),
    new CopyWebpackPlugin(copyFolders)
  ];
};
module.exports = webpackPlugins;
