"use strict";

var gulp = require ("gulp");
var path = require ("path");
var less = require ("gulp-less");
var ngmin = require('gulp-ngmin');
var clean = require ("gulp-clean");
var header = require ("gulp-header");
var jshint = require ("gulp-jshint");
var pkg = require ("./package.json");
var rename = require ("gulp-rename");
var concat = require ("gulp-concat");
var uglify = require ("gulp-uglify");
var inject = require ("gulp-inject");
var combine = require ("stream-combiner");
var minifyCss = require ("gulp-minify-css");
var minifyHtml = require ("gulp-minify-html");

var extended = [
  "/**",
  " * <%= pkg.name %> - <%= pkg.description %>",
  " * @version v<%= pkg.version %>",
  " * @link <%= pkg.homepage %>",
  " * @link <%= pkg.license %>",
  " */",
  ""
].join ("\n");

var succint = "// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>\n";

// linting the js files
gulp.task ("lint", function (){
  return gulp.src (["./src/*.js", "./src/app/**/*.js"])
    .pipe (jshint(".jshintrc")) // todo: put more rules here
    .pipe (jshint.reporter("default"));
});

// compile less and put in dist/public
gulp.task ("less", function (){
  var combined = combine(
    gulp.src ("./src/less/main.less"),
    less (),
    // minifyCss (),
    rename (pkg.name + "-v" + pkg.version + ".css" ),
    gulp.dest ("./dist/public/css")
  );

  combined.on("error", function(err) {
    console.warn(err.message);
  });

  return combined;
});

// @todo testing the js files, using karma as unit test 
gulp.task ("uglify", function () {
  return gulp.src ([
    "./vendor/angular/angular.js", 
    "./vendor/angular-ui-router/release/angular-ui-router.js",
    "./src/app/**/*.js",
    "./src/app.js",
    "./src/states.js"
    ])
    .pipe (ngmin ())
    .pipe (concat (pkg.name + "-v" + pkg.version + ".js"))
    .pipe (uglify ({ outSourceMap : true }))
    .pipe (gulp.dest("./dist/public/js"));
});

gulp.task ("inject", function (){
  return gulp.src ("./views/index.dist.html")
  .pipe (inject(gulp.src(["./dist/public/**"], {read: false}), { ignorePath : "/dist/public" } )) 
  .pipe (rename("index.html"))
  // .pipe (minifyHtml()) // somehow it is wrong
  .pipe (gulp.dest("./dist/views"));
});

gulp.task ("copy", function (){
  return gulp.src (["./views/**/**", "!./views/**.html"])
  .pipe (gulp.dest("./dist/views"));
});

// assets
gulp.task ("move", function (){
  return gulp.src (["./vendor/bootstrap/dist/fonts/**"])
  .pipe (gulp.dest("./dist/public/fonts"));
});

// temp concat css 
gulp.task ("temp", function (){
  return gulp.src (["./vendor/bootstrap/dist/css/bootstrap.min.css", "./dist/public/css/*.css", "./src/css/*.css"])
  .pipe (concat (pkg.name + "-v" + pkg.version + ".css"))
  .pipe (gulp.dest("./dist/public/css"));
});

// cleaning up the dist folder
gulp.task ("clean", function (){
  return gulp.src ("./dist", { read : false })
    .pipe (clean());
});

gulp.task ("build", ["less", "uglify"]);
gulp.task ("release", ["inject", "copy", "move", "temp"]);

// @todo testing the js files, using karma as integration test 




