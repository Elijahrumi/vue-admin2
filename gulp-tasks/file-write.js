var fs = require("fs")

module.exports = (gulp, callback) => {
  const sassThemeWriteTask = function (callback) {
    return fs.writeFile('src/sass/theme.scss', '@import "themes/' + myThemeName + '/theme";', callback);
  }
  const sassVariableWriteTask = function (callback) {
    return fs.writeFile(
      "src/sass/pages/variables.scss",

      '@import "../components/color-variables"; \n@import "../themes/' +
      myThemeName +
      '/variables"; \n@import "../components/variables"; \n@import "../theme-components/theme-variables"; \n@import "../themes/' +
      myThemeName +
      '/theme-variables";',

      callback
    );
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    sass_theme_write: sassThemeWriteTask,
    sass_variable_write: sassVariableWriteTask,
  }
}
