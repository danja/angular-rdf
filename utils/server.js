/* Fairly minimal Node.js file-serving HTTP server using Connect + middleware 
 *
 * danja 2015-06-12
 */

var connect = require('connect');
var logger = require('morgan');

var serveStatic = require('serve-static');

var serverPath = __dirname+"/../public";

console.log(serverPath);
connect()
    .use(logger("combined"))
    .use(serveStatic(serverPath)).listen(8088);