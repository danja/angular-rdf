/* Minimal file-serving HTTP server */

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("../public")).listen(8088);