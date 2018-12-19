var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvariables = require('postcss-css-variables'); 
var calc = require('postcss-calc');  

gulp.task('sass', function() {
  return gulp.src('process/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssvariables({preserve: true}), calc()]))
    .pipe(gulp.dest('builds/development/css'))
    .pipe(browserSync.reload({
      stream: true
  }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'builds/development'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('process/sass/**/*.scss', ['sass']);
  gulp.watch('builds/development/*.html', browserSync.reload);
  gulp.watch('builds/development/js/**/*.js', browserSync.reload);
});