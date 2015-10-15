var gulp = require('gulp');
var gulpif = require('gulp-if');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');

var browserSync = require('browser-sync');
var minifyCSS = require('gulp-minify-css');
var reload = browserSync.reload;

var api = require('./api/api');

global.isProd = false;
global.needSourceMap = true;

gulp.task('clean', function(cb) {
  del([
    'app/tmp'
  ], cb);
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe(gulpif(global.isProd, minifyCSS({keepSpecialComments: 0})))
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }));
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/fonts/'));
});

var bundler = _.memoize(function(watch) {
  var options = {debug: true};
  if (global.isProd) {
    options.debug = false;
  }


  if (watch) {
    _.extend(options, watchify.args);
  }

  var b = browserify('./src/main.js', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  $.util.log.apply(null, args);
  this.emit('end');
};

function bundle(cb, watch) {
  return bundler(watch).bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(global.isProd, $.uglify()))
    .pipe($.sourcemaps.init({ loadMaps: global.needSourceMap }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function(cb) {
  process.env.BROWSERIFYSWAP_ENV = 'dist';
  var is_watch = true;
  if (global.isProd) {
    is_watch = false;
  }
  bundle(cb, is_watch);
});

var reporter = 'spec';

gulp.task('build', [
  'clean',
  'html',
  'images',
  'fonts',
  'styles',
  'revision',
  'scripts'
]);

gulp.task('set_prod', function() {
  global.isProd = true;
  global.needSourceMap = false;
});

gulp.task('revision', ['scripts'], function() {
  if (global.isProd) {
    return gulp.src('./dist/index.html')
      .pipe($.staticHash({asset: './dist'}))
      .pipe(gulp.dest('./dist'));
  }
});

gulp.task('watch', ['build'], function(cb) {
  if (!global.isProd) {
    browserSync({
      server: {
        baseDir: 'dist',
        middleware: function(req, res, next) {
          api(req, res, next);
        }
      }
    });

    reporter = 'dot';
    bundler(true).on('update', function() {
      gulp.start('scripts');
    });
    gulp.watch(['./src/styles/main.less', './src/styles/**/*.less'], ['styles']);
    gulp.watch(['./src/*.html'], ['html']);
  }
});

gulp.task('default', ['watch']);
gulp.task('prod', ['set_prod', 'watch']);
