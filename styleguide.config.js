const path = require("path");
module.exports = {
  title: "React CSV pattern library",
  components: "./src/components/**/*.js",
  styleguideDir: "docs",
  updateWebpackConfig: function(webpackConfig) {
    // Your source files folder or array of folders, should not include node_modules
    const dir = path.join(__dirname, "src");
    webpackConfig.module.loaders.push({
      test: /\.js/,
      loader: "babel",
      exclude: /node_modules/,
    });
    return webpackConfig;
  },
};
