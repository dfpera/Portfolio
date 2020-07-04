// Include plugins (https://gulpjs.com/plugins/)
var 
  gulp          = require('gulp'),
  autoprefixer  = require('autoprefixer'),
  babel         = require('gulp-babel'),
  browserSync   = require('browser-sync').create(),
  calc          = require('postcss-calc'),
  concat        = require('gulp-concat'),
  cssvariables  = require('postcss-css-variables'),
  del           = require('del'),
  eslint        = require('gulp-eslint'),
  gulpif        = require('gulp-if'),
  imagemin      = require('gulp-imagemin'),
  notify        = require('gulp-notify'),
  plumber       = require('gulp-plumber'),
  pngcrush      = require('imagemin-pngcrush'),
  postcss       = require('gulp-postcss'),
  pug           = require('gulp-pug'),
  sass          = require('gulp-sass'),
  sourcemaps    = require('gulp-sourcemaps'),
  uglify        = require('gulp-uglify');

// Define directories
var env,
    outputDir,
    // Src
    assetsSrc,
    batSrc,
    fontsSrc,
    imgSrc,
    jsSrc,
    libSrc,
    pugSrc,
    sassSrc,
    // Dest
    assetsDest,
    batDest,
    fontsDest,
    imgDest,
    jsDest,
    libDest,
    pugDest,
    sassDest,
    // Styles
    pugStyle,
    sassStyle;

// Initialize environment
env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  pugStyle = {
    doctype: 'html',
    pretty: true
  }
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  pugStyle = {
    doctype: 'html',
    pretty: false
  }
  sassStyle = 'compressed';
}

// Plumber onError
var onError = (err) => {
  notify.onError({
    title:    "Gulp error in " + err.plugin,
    message:  "<%= error %>",
    sound:    "Pop"
  })(err);
}

var plumberOptions = {
  errorHandler: onError
}

// Initialize sources
assetsSrc = ['process/assets/**/*.*'];
batSrc    = ['process/bat/*.php'];
fontsSrc  = ['process/fonts/*.*'];
imgSrc    = ['process/img/**/*.*'];
jsSrc     = [
              'process/js/util-framework.js',
              'process/js/forms.js',
              'process/js/main.js'
            ];
libSrc    = ['process/lib/**/*.*'];
pugSrc    = [
              'process/pug/**/*.pug',
              '!process/pug/**/_*.pug'
            ];
sassSrc   = ['process/sass/main.scss'];

// Initialize destinations
assetsDest  = outputDir + 'assets';
batDest     = outputDir + 'bat';
fontsDest   = outputDir + 'fonts';
imgDest     = outputDir + 'img';
jsDest      = outputDir + 'js';
libDest     = outputDir + 'lib';
pugDest     = outputDir;
sassDest    = outputDir + 'css';

const cleanTask = (done) => {
  del(['builds/' + outputDir]);
  done();
}

const assetsTask = () => {
  return gulp.src(assetsSrc)
    .pipe(gulp.dest(assetsDest));
};

const batTask = () => {
  return gulp.src(batSrc)
    .pipe(gulp.dest(batDest));
};

const fontsTask = () => {
  return gulp.src(fontsSrc)
    .pipe(gulp.dest(fontsDest));
};

const imgTask = () => {
  return gulp.src(imgSrc)
    .pipe(plumber(plumberOptions))
    .pipe(gulpif(env === 'production', imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngcrush()]
    })))
    .pipe(gulp.dest(imgDest));
};

const jsTask = () => {
  return gulp.src(jsSrc)
    .pipe(concat('main.js'))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(jsDest))
};

const libTask = () => {
  return gulp.src(libSrc)
    .pipe(gulp.dest(libDest));
};

const pugTask = () => {
  return gulp.src(pugSrc)
    .pipe(plumber(plumberOptions))
    .pipe(pug(pugStyle))
    .pipe(gulp.dest(pugDest));
};

const sassTask = () => {
  return gulp.src(sassSrc)
    .pipe(plumber(plumberOptions))
    .pipe(gulpif(env === 'development', sourcemaps.init()))
    .pipe(sass({outputStyle: sassStyle}))
    .pipe(postcss([autoprefixer(), cssvariables({preserve: true}), calc()]))
    .pipe(gulpif(env === 'development', sourcemaps.write()))
    .pipe(gulp.dest(sassDest))
    .pipe(gulpif(env === 'development', browserSync.reload({stream: true})));
};

const browserSyncTask = (done) => {
  browserSync.init({
    server: {
      baseDir: outputDir
    },
  })
  done();
};

// reloading browsers
const reloadPage = (done) => {
  browserSync.reload();
  done();
};
const assetsRL = gulp.series(assetsTask, reloadPage);
const batRL = gulp.series(batTask, reloadPage);
const fontsRL = gulp.series(fontsTask, reloadPage);
const imgRL = gulp.series(imgTask, reloadPage);
const jsRL = gulp.series(jsTask, reloadPage);
const libRL = gulp.series(libTask, reloadPage);
const pugRL = gulp.series(pugTask, reloadPage);

const startTask = gulp.parallel(browserSyncTask, assetsTask, batTask, fontsTask, imgTask, jsTask, libTask, pugTask, sassTask);
const buildTask = gulp.parallel(assetsTask, batTask, fontsTask, imgTask, jsTask, libTask, pugTask, sassTask);

const watchTask = gulp.series(cleanTask, buildTask, (done) => {
  gulp.watch(assetsSrc, assetsRL);
  gulp.watch(batSrc, batRL);
  gulp.watch(fontsSrc, fontsRL);
  gulp.watch(imgSrc, imgRL);
  gulp.watch(jsSrc, jsRL);
  gulp.watch(libSrc, libRL);
  gulp.watch('process/pug/**/*.pug', pugRL);
  gulp.watch('process/sass/**/*.scss', sassTask);
});

exports.default = watchTask;
exports.build = buildTask;