const TerserPlugin = require("terser-webpack-plugin");

// vue.config.js
module.exports = {
  configureWebpack: {
    optimization: {
      runtimeChunk: true,
      minimize: true,
      splitChunks: {
        chunks: "all"
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            extractComments: false,
            parallel: true,
            output: {
              comments: false
            },
            ecma: 6
          }
        })
      ]
    }
  }
};
