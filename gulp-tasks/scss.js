var sass = require("gulp-sass")
var merge = require("merge-stream")
var autoprefixer = require("gulp-autoprefixer")
var rtlcss = require('gulp-rtlcss')
module.exports = (gulp, callback) => {
  const scssCustomTask = function () {
    return gulp
      .src(
        ["custom.scss"],
        { cwd: config.source.sass + "/custom/" },
        {
          read: false,
          allowEmpty: true
        }
      )
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: config.autoprefixerBrowsers,
          cascade: false
        })
      )
      .pipe(gulp.dest(config.destination.css + "/custom/"))
  }

  const scssMainTask = function () {
    return gulp
      .src(
        ["materialize.scss", "style.scss"],
        { cwd: config.source.sass },
        {
          read: false,
          allowEmpty: true
        }
      )
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: config.autoprefixerBrowsers,
          cascade: false
        })
      )
      .pipe(gulp.dest(config.destination.css))
  }

  const scssPagesTask = function () {
    return gulp
      .src(config.source.sass + "/pages/**/*.scss")
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: config.autoprefixerBrowsers,
          cascade: false
        })
      )
      .pipe(gulp.dest(config.destination.css + "/pages/"))
  }

  const scssLayoutsTask = function () {
    return gulp
      .src(
        ["style-fullscreen.scss", "style-horizontal.scss", "page-center.scss"],
        { cwd: config.source.sass + "/layouts/", allowEmpty: true }
      )
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: config.autoprefixerBrowsers,
          cascade: false
        })
      )
      .pipe(gulp.dest(config.destination.css + "/layouts/"))
  }

  const scssStyleTask = function () {
    return gulp
      .src(config.assets + "/scss/style.scss", {
        read: false,
        allowEmpty: true
      })
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(gulp.dest(config.assets + "/css/"))
  }

  const scssThemesTask = function () {
    return gulp.src(['materialize.scss', 'style.scss'], { cwd: config.source.sass })
      .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: config.autoprefixerBrowsers,
        cascade: false
      }))
      .pipe(gulp.dest(config.destination.css + '/themes/' + myThemeName + '/'));
  }

  const scssRtlTask = function () {
    var custom = gulp
      .src(config.source.sass + "/style-rtl.scss")
      .pipe(rtlcss())
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(gulp.dest(config.destination.css_rtl))

    // var style = gulp
    //   .src(config.assets + "/scss/style-rtl.scss")
    //   .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    //   .pipe(gulp.dest(config.assets + "/css/"))

    return custom
  }

  const scssWatchTask = function () {
    return gulp.watch(
      config.source.sass + "/**/*.scss",
      gulp.parallel(
        scssCustomTask,
        scssMainTask,
        scssPagesTask,
        scssLayoutsTask,
        scssStyleTask,
        scssThemesTask
      )
    )
  }

  // ---------------------------------------------------------------------------
  // Exports

  return {
    custom: scssCustomTask,
    main: scssMainTask,
    pages: scssPagesTask,
    layouts: scssLayoutsTask,
    style: scssStyleTask,
    themes: scssThemesTask,
    rtl: scssRtlTask,
    watch: scssWatchTask
  }
}
