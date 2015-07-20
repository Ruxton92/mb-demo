var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil     = require('gulp-util'),
    gulpif    = require('gulp-if'),
    clean     = require('gulp-clean'),
    replace   = require('gulp-replace'),
    open      = require('gulp-open'),
    nodemon = require('gulp-nodemon'),
    notify    = require("gulp-notify"),
    notifier = require('node-notifier'),
    plumber   = require('gulp-plumber'),
    browserify = require('browserify'),
    mochify   = require('mochify'),
    source     = require('vinyl-source-stream'),
    autoprefixer = require('gulp-autoprefixer'),
    bowerResolve = require('bower-resolve'),
    nodeResolve = require('resolve'),
    path        = require('path'),
    domain      = require('domain'),
    tap         = require('gulp-tap'),
    _           = require('lodash'),
    fs          = require('fs'),
    rename      = require("gulp-rename"),
    hbsfy       = require("hbsfy"),
    through     = require('through'),
    gulpSequence = require('gulp-sequence'),
    brand       = process.env.BRAND || "smart",
    usemin      = require('gulp-usemin'),
    minifyCSS = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    connect = require('gulp-connect'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    serverStarted = false;


/*************************************************************************
********************* config and paths object ****************************
*************************************************************************/

var packageJSON = require('./package.json');
var date = new Date();
var paths  = {
  browserifyEntry: './client/src/scripts/main.js',
  appjsSource: 'client/src/scripts/{,**/}*.js',
  vendorjsSource: './client/bower_components/**/*.js',
  jsTarget: './client/_tmp/scripts/',

  jsTestSourceServer: './test/spec/{,**/}*.js',
  jsTestSourceClient: './client/test/spec/{,**/}*.js',

  scssSource: ['client/scripts/****//*.scss', 'client/src/styles/*.scss'],
  scssTarget: 'client/_tmp/styles',

  html: ['./index.html'],
  htmlCleaned: ['./_index.html'],

  hbs: "client/src/scripts/apps/{,**/}*.hbs"
};

var config = {

  client: 'client',
  dist: 'dist',
  tmp: 'client/_tmp',

  jsConcatSource: [paths.jsTarget + 'modernizr.js',paths.jsTarget + 'vendor.js', paths.jsTarget + 'app.js'],

  production: (process.env.NODE_ENV === 'production'),

  banner: '/*! ' + packageJSON.name + '- v' + packageJSON.version + ' - ' + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + '\n' +
    '* Copyright (c) ' + date.getFullYear() + ' ' + packageJSON.author.name + '*/\n',
};

/*************************************************************************
****************** Build vendor.js with browserify ***********************
*************************************************************************/

gulp.task('build_vendor', function() {
  gulp.src('', {read: false})

    .pipe(plumber())
    .pipe(tap(function(file) {

      var d = domain.create();

      d.on("error", function(err) {

        notifier.notify({ title: 'Browserify compile error (build_vendor)', message: err.message + " - in file: " + file.path });

        gutil.log(
          gutil.colors.red("Browserify compile error:"),
          err.message,
          "\n\t",
          gutil.colors.cyan("in file"),
          file.path
        );

      });

      d.run(function() {

        var counter = 0, interval = setInterval(function() {
          //check if jade files are already copied
          exists = fs.existsSync(path.join(config.client, '_tmp/scripts/vendor.js'));

          if(counter > 8) {
            notifyAll("Error occured while running task: build_app");
            clearInterval(interval);
          }
          counter++;

          if(exists) {
            clearInterval(interval);
          }

        }, 1000);

        // this task will go through ./bower.json and
        // uses bower-resolve to resolve its full path.
        // the full path will then be added to the bundle using require()

        var b = browserify({
          // generate source maps in non-production environment
          debug: !config.production,
          paths: ['./node_modules', 'client/src/scripts', 'client/src/bower_components']
        });

        // get all bower components ids and use 'bower-resolve' to resolve
        // the ids to their full path, which we need for require()
        getBowerPackageIds().forEach(function (id) {

          //this libraries causes problems in browserify
          //ignore them, because it's not needed in vendor.js
          if(id === "modernizr" || id === "bourbon") return;

          var resolvedPath = bowerResolve.fastReadSync(id);

          b.require(resolvedPath, {

            // exposes the package id, so that we can require() from our code.
            // for eg:
            // require('./vendor/angular/angular.js', {expose: 'angular'}) enables require('angular');
            // for more information: https://github.com/substack/node-browserify#brequirefile-opts
            expose: id

          });
        });

        // do the similar thing, but for npm-managed modules.
        // resolve path using 'resolve' module
        getNPMPackageIds().forEach(function (id) {
          b.require(nodeResolve.sync(id), { expose: id });
        });

        var stream = b.bundle().pipe(source('vendor.js'));

        // pipe additional tasks here (for eg: minifying / uglifying, etc)
        // remember to turn off name-mangling if needed when uglifying

        stream
        .pipe(gulp.dest(paths.jsTarget));
        stream;
      });

    }))
});

/*************************************************************************
********************* Build app.js with browserify ***********************
*************************************************************************/

gulp.task('build_app', function () {
  gulp.src(paths.browserifyEntry, {read: false})

    .pipe(plumber())
    .pipe(tap(function(file) {

      var d = domain.create();

      d.on("error", function(err) {

        notifier.notify({ title: 'Browserify compile error (build_app)', message: err.message + " - in file: " + file.path });

        gutil.log(
          gutil.colors.red("Browserify compile error:"),
          err.message,
          "\n\t",
          gutil.colors.cyan("in file"),
          file.path
        );

      });

      d.run(function() {

        var counter = 0, interval = setInterval(function() {
          //check if jade files are already copied
          exists = fs.existsSync(path.join(config.client, '_tmp/scripts/app.js'));

          if(counter > 8) {
            notifyAll("Error occured while running task: build_app");
            clearInterval(interval);
          }
          counter++;

          if(exists) {
            clearInterval(interval);
          }

        }, 1000);

        var b = browserify(paths.browserifyEntry, {
          // generate source maps in non-production environment
          extensions: ['.js'],
          paths: ['./node_modules', 'client/src/scripts', 'client/src/bower_components'],
          debug: !config.production
        });

        // mark vendor libraries defined in bower.json as an external library,
        // so that it does not get bundled with app.js.
        // instead, we will load vendor libraries from vendor.js bundle
        getBowerPackageIds().forEach(function (lib) {
          b.external(lib);
        });


        // do the similar thing, but for npm-managed modules.
        // resolve path using 'resolve' module
        getNPMPackageIds().forEach(function (id) {
          b.external(id);
        });

        var stream = b.transform('hbsfy').bundle().pipe(source('app.js'));

        stream.on('end', function () {
          console.log('Build App Complete');
        });

        // pipe additional tasks here (for eg: minifying / uglifying, etc)
        // remember to turn off name-mangling if needed when uglifying

        stream.pipe(gulp.dest(paths.jsTarget))
        stream;
      });

    }))
});

/*************************************************************************
**************** Build CSS from SCSS with autoprefixer *******************
*************************************************************************/

gulp.task('sass', function () {
    gulp.src(paths.scssSource)
      .pipe(plumber({errorHandler: function(err){
        gutil.log(
          gutil.colors.red("Sass compile error:"),
          err.message
        );

        notifier.notify({ title: 'Error in Task "sass"', message: err.message });
      }}))
      .pipe(gulpif(!config.production, sourcemaps.init()))
      .pipe(sass())
      .pipe(autoprefixer({
          browsers: ['last 5 versions'],
          cascade: false
      }))
      .pipe(gulpif(!config.production, sourcemaps.write('./maps')))
      .pipe(gulp.dest(paths.scssTarget))
});

gulp.task('css', function() {
  gulp.src('client/_tmp/styles/{,**/}*.css')
    .pipe(plumber())
    .pipe(reload({stream: true}))
});
gulp.task('js', function() {
  gulp.src('client/_tmp/scripts/{,**/}*.js')
    .pipe(plumber())
    .pipe(reload({stream: true}))
});


/*************************************************************************
**************** Server-side testing with MochaJS (and Chai) *************
*************************************************************************/

// gulp.task('test_server', function () {
//   return gulp.src(paths.jsTestSourceServer, {read: false})
//     .pipe(mocha({
//       reporter: 'spec',
//       ui: 'tdd'
//     }));
// });

/*************************************************************************
**************** Client-side testing with MochaJS (and Chai) *************
*************************************************************************/

// gulp.task('test', function () {

//   if(process.env.API) {
//     var tmp_config_obj = {
//       apiURL: process.env.API
//     };

//     fs.writeFile("./" + brand + "/test/spec/fixtures/config.js", "module.exports = " + JSON.stringify(tmp_config_obj, null, 2), function(err) {
//       if(err) {
//         throw err;
//       } else {
//         runTest();

//         fs.writeFile("./" + brand + "/test/spec/fixtures/config.js", "module.exports = {}", function(err) {
//           if(err) {
//             throw err;
//           }
//         });
//       }
//     });
//   } else {
//     runTest();
//   }

//   function runTest() {
//     mochify(paths.jsTestSourceClient, {
//       ui: 'tdd',
//       extension: '.js',
//       transform: 'jsify',
//       reporter: 'spec',
//       watch: false,
//       cover: false,
//       node: false,
//       "web-security": false

//     }).bundle();
//   }


// });


/*************************************************************************
************************* Run connect server *****************************
*************************************************************************/

gulp.task('connect', function() {
  connect.server({
    port: 3001,
    root: [__dirname, 'client/_tmp', 'client/src'],
    livereload: true
  });
});

gulp.task('connect_dist', function() {
  connect.server({
    port: 3002,
    root: ['dist']
  });
});

// nodemon task to start server for mockdata
gulp.task('nodemon', function() {
  nodemon({
    script: '_server/server.js',
    ext: 'js',
    ignore: ['node_modules/**', 'client/**'],
    env: { }
  })
  .on('start', function() {
    if(!serverStarted) {
      serverStarted = true;
      setTimeout(function(){
        //gulp.start('open');
        browserSync({
          notify: false,
          debugInfo: false,
          open: true,
          port: 3000
        });

        gulp.start('open');
      }, 1000);
    }
  })
  .on('restart', function() {
    console.log('restart');
  })
});

gulp.task('open', function(){
  var options = {
    url: 'http://127.0.0.1:9000'
  };
  gulp.src('./package.json')
  .pipe(open('', options));
});

gulp.task('open_dist', function(){
  var options = {
    url: 'http://127.0.0.1:3002'
  };
  gulp.src('./package.json')
  .pipe(open('', options));
});


/*************************************************************************
****************************** Clean Dist ********************************
*************************************************************************/

gulp.task('cleandist', function () {
  gulp.src(config.dist + '/*', {read: false})
      .pipe(clean());
});

/*************************************************************************
****************************** Copy Files ********************************
*************************************************************************/

gulp.task('copy', function(){
  gulp.src("client/src/images/{,**/}*")
    .pipe(gulp.dest(config.dist + "/"+brand+"/images"));
  gulp.src("client/src/videos/{,**/}*")
    .pipe(gulp.dest(config.dist + "/"+brand+"/videos"));
  gulp.src("client/src/styles/fonts/{,**/}*")
    .pipe(gulp.dest(config.dist + "/"+brand+"/styles/fonts"));
  gulp.src("client/src/styles/images/{,**/}*")
    .pipe(gulp.dest(config.dist + "/"+brand+"/styles/images"));
});


/*************************************************************************
usemin
find all static files(css/js) in html and replace
it with optmized versions which will be renamed by rev
*************************************************************************/

gulp.task('usemin', function () {
  return gulp.src(paths.htmlCleaned)
    .pipe(usemin({
      css: [minifyCSS({
        keepBreaks:false,
        keepSpecialComments: 0
      }), 'concat', rev()],
      html: [minifyHTML({empty: true, conditionals: true, comments: true})],
      js: [uglify({
        mangle: true,
        compress: true
      }), 'concat', rev()]
    }))
    .pipe(gulp.dest(config.dist + "/"+brand+"/"));
});

gulp.task("banner", function() {
  gulp.src(config.dist + "/" + brand + "/{,**/}*.{js,css}")
  .pipe(header(config.banner))
  .pipe(gulp.dest(config.dist + "/" + brand))
})

// gulp.task('npmpostinstall', function(cb) {
//   fs.readFile(__dirname + "/node_modules/jquery-datetimepicker/jquery.datetimepicker.css", function(err, data) {

//     if(!err) {
//       fs.rename(__dirname + "/node_modules/jquery-datetimepicker/jquery.datetimepicker.css", __dirname + "/node_modules/jquery-datetimepicker/jquery.datetimepicker.scss", function(err, data) {
//         console.log('jquery datetimepicker scss generated');

//         cb();
//       });
//     } else {
//       cb();
//     }
//   });
// });


/*************************************************************************
****************************** HTML Reload *******************************
*************************************************************************/
// gulp.task('html', function() {
//   gulp.src(paths.html)

// });




/*************************************************************************
******************** Rerun tasks when a file changes *********************
*************************************************************************/

gulp.task('css', function() {
  gulp.src('client/_tmp/styles/{,**/}*.css')
    .pipe(reload({stream: true}))
});

gulp.task('js', function() {
  gulp.src('client/_tmp/scripts/{,**/}*.js')
    .pipe(reload({stream: true}))
});

gulp.task('watch', function() {
  gulp.watch([paths.appjsSource, paths.hbs], ['build_app']);
  gulp.watch(paths.vendorjsSource, ['build_vendor']);
  gulp.watch(paths.scssSource, ['sass']);
  gulp.watch('client/_tmp/styles/{,**/}*.css', ['css']);
  gulp.watch('client/_tmp/scripts/{,**/}*.js', ['js']);
  //gulp.watch(paths.html, ['html']);
});

gulp.task('copyFonts', function() {
  return gulp.src('client/src/styles/fonts/{,**/}*.*')
    .pipe(gulp.dest('client/_tmp/styles/fonts')) // Write to the destination folder
});

/*************************************************************************
*************************** Helper functions *****************************
*************************************************************************/

function getBowerPackageIds() {
  // read bower.json and get dependencies' package ids
  var bowerManifest = {};
  try {
    bowerManifest = require('./bower.json');
  } catch (e) {
    // does not have a bower.json manifest
  }
  return _.keys(bowerManifest.dependencies) || [];

}


function getNPMPackageIds() {
  // read package.json and get dependencies' package ids
  var packageManifest = {};
  try {
    packageManifest = require('./package.json');
  } catch (e) {
    // does not have a package.json manifest
  }
  return _.keys(packageManifest.dependencies) || [];

}

gulp.task('default', ['_default'], function() {
  // place code for your default task here
});

gulp.task('_default', gulpSequence('copyFonts', 'build_vendor', 'build_app', 'sass', 'nodemon', 'watch'));

gulp.task('build', gulpSequence('cleandist', 'copy', 'usemin', 'banner', 'connect_dist', 'open_dist'));
