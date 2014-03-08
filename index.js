var render = require ("./lib/render");
var Router = require ("koa-router");
var serve = require ("koa-static");
var mount = require ("koa-mount");
var path = require ("path");
var koa = require ("koa");

module.exports = function (policy) {
  
  var router = new Router();
  router.get("/", function * (next) {

    // @todo get user, get roles, get routes and consider policy if needed
    var routes1 = [
      {
        name : "home",
        options : {
          url : "/",
          template : "Home Test {{ test }}",
          controller : "HomeCtrl"
        }
      },
      {
        name : "letters",
        options : {
          url : "/letters",
          template : "Letters {{ test }}",
          controller : "LettersCtrl"
        }
      }
    ];

    var routes2 = [
      {
        name : "home",
        options : {
          url : "/",
          template: "Home Test 1"
        }
      },
      {
        name : "users",
        options : {
          url : "/users",
          template : "Users {{ test }}",
          controller : "LettersCtrl" // test only
        }
      }
    ];

    // this should be done by querying user's roles and corresponding menus via api?
    this.session = this.session || {};
    var routes = this.session.user == "test" ? routes1 : routes2;

    // angular app rendering
    this.body = yield render ("index", { states : routes });

  });

  var app = koa();
  var env = process.env.NODE_ENV || "development";

  if (env == "test" || env == "production") {
    // @todo if no dist, throw error
    var dir = path.resolve(__dirname + "/dist/public");
    app.use (serve(dir));
  } else {
    app.use (serve(path.resolve( __dirname + "/vendor")));
    app.use (serve(path.resolve( __dirname + "/src")));
  }

  app.use (router.middleware());

  return {
    mount : mount (app),
    path : __dirname,
    type : "app"
  }
}
