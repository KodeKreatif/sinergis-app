var views = require ("co-views");
var path = require ("path");

// if release (that is when NODE_ENV != development) checkout the /../dist/views folder
var env = process.env.NODE_ENV || "development";
var dir = path.resolve ((env == "production" || env == "test") ? __dirname + "/../dist/views" : __dirname + "/../views");

module.exports = views(dir, {
  map: { html: "swig" },
  cache : "memory" // https://github.com/visionmedia/co-views/issues/8#issuecomment-36831312
});