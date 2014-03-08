var koa = require ("koa");
var server = koa ();
var app = require ("./");
server.use (app().mount);
server.listen (3000);
console.log ("just a simple test server for now, running on 3000 ~> " + process.env.NODE_ENV);