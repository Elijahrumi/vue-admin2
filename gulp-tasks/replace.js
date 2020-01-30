var replace = require("gulp-replace")

module.exports = (gulp, callback) => {
  const replaceCssTask = function() {
    return gulp
      .src("html-demo/**/*.html")
      .pipe(
        replace(
          /(<link\b.+href=")(?!http)(.+\bapp-assets\b.[^vendors].+[^min])(\.css)(".*>)/g,
          "$1$2.min$3$4"
        )
      )
      .pipe(gulp.dest("./html-demo/"))
  }

  const replaceJsTask = function() {
    return gulp
      .src("html-demo/**/*.html")
      .pipe(
        replace(
          /(<script\b.+src=")(?!http)(.+\bapp-assets\b.[^vendors].+[^min])(\.js)(".*>)/g,
          "$1$2.min$3$4"
        )
      )
      .pipe(gulp.dest("./html-demo/"))
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    css: replaceCssTask,
    js: replaceJsTask
  }
}
