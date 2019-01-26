'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require("browser-sync");
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task("sass", function () {
  gulp
    .src("src/sass/main.scss")
    .pipe(plumber())
    .pipe(sass({outputStyle: "expanded"}))
    .pipe(rename("style.css"))
    .pipe(autoprefixer({
      browsers: ['last 20 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ["sass", "browser"], function () {
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*/*.*', ['build']);
  gulp.watch('src/js/*.js', browserSync.reload);
  gulp.watch("src/html/*.html", browserSync.reload);
  gulp.watch("src/css/main.css", browserSync.reload);
});

gulp.task("browser", function() {
  browserSync({
    server: { baseDir: "app" },
    notify: false
  });
});

gulp.task("build", function () {
  gulp.src(["src/css/*.css"]).pipe(gulp.dest("app/css"));
  gulp.src(["src/js/*.*"]).pipe(gulp.dest("app/js"));
  gulp.src(["src/img/*.*"]).pipe(gulp.dest("app/img"));
  gulp.src(["src/html/*.*"]).pipe(gulp.dest("app/html"));
  gulp.src("src/*.html").pipe(gulp.dest("app"));
});