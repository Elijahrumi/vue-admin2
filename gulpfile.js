// Require the modules.
var gulp = require("gulp")
var gutil = require("gulp-util")
var minimist = require("minimist")
var config = require("./config.json")

var options = minimist(process.argv.slice(2))

// Global Variables
global.myLayout = options.Layout
global.myLayoutName = options.LayoutName
global.myThemeName = options.ThemeName
global.config = config

global.dashboardRename = ""
global.rtl = ""
global.dist = "false"

if (options.dist !== undefined) {
  dist = options.dist
}
if (options.TextDirection !== undefined) {
  global.myTextDirection = options.TextDirection.toLowerCase()
  if (myTextDirection == "rtl") rtl = "-rtl"
} else {
  global.myTextDirection = ""
}

gutil.log(gutil.colors.green("Starting Gulp!!"))

// Exclude template specific files
if (myLayout == "vertical-modern-menu-template") {
  dashboardRename = config.vertical_modern_menu_template.dashboardRename
  pugSrc = config.vertical_modern_menu_template.pugSrc
} else if (myLayout == "vertical-menu-nav-dark-template") {
  dashboardRename = config.vertical_menu_nav_dark_template.dashboardRename
  pugSrc = config.vertical_menu_nav_dark_template.pugSrc
} else if (myLayout == "vertical-gradient-menu-template") {
  dashboardRename = config.vertical_gradient_menu_template.dashboardRename
  pugSrc = config.vertical_gradient_menu_template.pugSrc
} else if (myLayout == "vertical-dark-menu-template") {
  dashboardRename = config.vertical_dark_menu_template.dashboardRename
  pugSrc = config.vertical_dark_menu_template.pugSrc
} else if (myLayout == "horizontal-menu-template") {
  dashboardRename = config.horizontal_menu_template.dashboardRename
  pugSrc = config.horizontal_menu_template.pugSrc
}

// Invoke the module with options.
const autoPrefixTasks = require("./gulp-tasks/autoprefix")(gulp)
const cleanTasks = require("./gulp-tasks/clean")(gulp)
const copyTask = require("./gulp-tasks/copy")(gulp)
const cssTasks = require("./gulp-tasks/css")(gulp)
const replaceTasks = require("./gulp-tasks/replace")(gulp)
const scssTasks = require("./gulp-tasks/scss")(gulp)
const uglifyTasks = require("./gulp-tasks/uglify")(gulp)
const notifyTasks = require("./gulp-tasks/notify")(gulp)
const fileWriteTasks = require("./gulp-tasks/file-write")(gulp);
// Clean CSS & JS
gulp.task("dist-clean", cleanTasks.css, cleanTasks.js)

// Monitor Changes
gulp.task(
  "monitor",

  gulp.series(
    fileWriteTasks.sass_theme_write,
    fileWriteTasks.sass_variable_write,
    gulp.parallel(scssTasks.watch)
  )
);
// Dist JS
gulp.task(
  "dist-js",
  gulp.series(cleanTasks.js, copyTask.js, uglifyTasks.js, notifyTasks.js)
)

// SASS
gulp.task(
  "sass-compile",
  gulp.series(
    fileWriteTasks.sass_theme_write,
    fileWriteTasks.sass_variable_write,
    gulp.parallel(scssTasks.main, scssTasks.themes, scssTasks.layouts, scssTasks.pages, scssTasks.custom)
  )
);
// SASS Compile RTL
gulp.task("sass-compile-rtl", scssTasks.rtl)

// CSS Distribution Task.
gulp.task(
  "dist-css",
  gulp.series(
    cleanTasks.css,
    "sass-compile",
    autoPrefixTasks.css,
    cssTasks.css_comb,
    cssTasks.css_min,
    gulp.parallel(notifyTasks.css)
  )
)

// RTL CSS Distribution Task.
gulp.task(
  "dist-css-rtl",
  gulp.series(
    cleanTasks.css_rtl,
    "sass-compile",
    "sass-compile-rtl",
    cssTasks.css_rtl,
    autoPrefixTasks.css_rtl,
    cssTasks.css_rtl_comb,
    cssTasks.css_min
  )
)

// DEFAULT
gulp.task("dist", gulp.parallel("dist-css", "dist-js"))

gulp.task("default", gulp.parallel("dist-css", "dist-js"))

// Replacement Tasks
gulp.task("replacement", gulp.series(replaceTasks.css, replaceTasks.js))