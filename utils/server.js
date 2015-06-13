/* Minimal file-serving HTTP server */

var connect = require('connect');
var logger = require('morgan');

var serveStatic = require('serve-static');
var serverPath = __dirname+"/../public";
console.log(serverPath);
connect()
    .use(logger())
    .use(serveStatic(serverPath)).listen(8088);