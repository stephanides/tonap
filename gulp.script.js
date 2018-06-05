var gulp = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");

gulp.task("js", function() {
  var stream = gulp.src("./src/public/js/*.js").pipe(uglify()).pipe(rename({ extname: ".min.js" })).pipe(gulp.dest("./dist/public/js/"));
  return stream;
});

gulp.task("js:watch", function() {
  gulp.watch("./src/public/scss/*.scss", ["js"]);
});

gulp.task("js:watch");
