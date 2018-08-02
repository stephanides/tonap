var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");

gulp.task("js", function() {
  var stream = gulp.src("./src/public/js/*.js")./*pipe(uglify()).pipe(rename({ extname: ".min.js" })).*/pipe(gulp.dest("./dist/public/js/"));
  return stream;
});

gulp.task("js:watch", function() {
  gulp.watch("./src/public/js/*.js", gulp.series("js"));
});

gulp.task("sass", function() {
  var sassStream = gulp.src("./src/public/scss/*.scss").pipe(sass({outputStyle: 'compressed'}))
  .pipe(rename({ extname: ".min.css" })).pipe(gulp.dest("./dist/public/css/"));
  return sassStream;
});

gulp.task("sass:watch", function() {
  gulp.watch("./src/public/scss/*.scss", gulp.series("sass"));
});

// gulp.task("default", ["js:watch", "sass:watch"]);
