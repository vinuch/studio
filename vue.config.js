// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
module.exports = {
//   configureWebpack: {
//     plugins: [new BundleAnalyzerPlugin()],
//   },
devServer: {
    proxy: 'https://api.leyyow.com/'
  }
};
