var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");

gulp.task("sass", function() {
  var sassStream = gulp.src("./src/public/scss/*.scss").pipe(sass({outputStyle: 'compressed'}))
  .pipe(rename({ extname: ".min.css" })).pipe(gulp.dest("./dist/public/css/"));
  return sassStream;
});

gulp.task("sass:watch", function() {
  gulp.watch("./src/public/scss/*.scss", ["sass"]);
});

gulp.task("sass:watch");
