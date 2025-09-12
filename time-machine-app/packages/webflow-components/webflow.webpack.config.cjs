const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  resolve: {
    modules: [path.resolve(__dirname, "../../node_modules"), "node_modules"],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
