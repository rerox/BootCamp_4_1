var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require("gulp-plumber"),
    browserSync = require('browser-sync'),
    del = require("del"),
    useref = require('gulp-useref'),
    gulpUglify = require('gulp-uglify');

gulp.task("css",function () {
   gulp.src("sass/main.scss")
       .pipe(plumber())
       .pipe(sass.sync())
       .pipe(autoprefixer({
            browsers:["last 5 version","IE 9"]
       }))
       .pipe(gulp.dest("css"))
       .pipe(browserSync.stream());
});
gulp.task("server",function () {

   browserSync.init({
       server:"src/"
   })
});

gulp.task("watch",function () {

    gulp.watch("sass/**/*.scs",["css"]);
    gulp.watch(["src/*.html","src/**/*.js"],browserSync.reload)
});

gulp.task("clean",function(){
   del("dist/");
});

gulp.task("html",function () {
   gulp.src("src/*.html")
       .pipe(useref())
       .pipe(gulpUglify())
       .pipe(gulp.dest("dist/"));
});
gulp.task("default",["css","server","watch"]);