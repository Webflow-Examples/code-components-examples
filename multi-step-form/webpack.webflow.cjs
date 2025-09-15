const path = require("path");

module.exports = (config) => {
  // Add a rule to process CSS files with PostCSS
  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, "postcss.webflow.config.mjs"),
          },
        },
      },
    ],
  });

  return config;
};
