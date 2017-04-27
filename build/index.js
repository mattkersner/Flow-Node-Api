'use strict';

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _Api = require('./Api');

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// After the ErrnoError definition, we set up some data and
// instantiate the server by attaching our future Express app with http.createServer.


// At the top we’ve got our Flow comment, imports, and our first bit of
// strictly Flow-enabled code - the ErrnoError interface declaration. This error type
// is used by Express. When using the flow check command from the official command line tool,
// Flow will not flag this as an error. For whatever reason, gulp-flowtype does.
// If you get a strange type check error, it may be worth it to install the Flow CLI and
// double check using flow check.

// ErrnoError interface for use in onError
var logger = (0, _debug2.default)('flow-api:startup');
var app = new _Api2.default();
var DEFAULT_PORT = 3000;
// normalizePort looks for the $PORT environment variable and sets the app’s port to its value.
// If it doesn’t exist, it sets the port to the default value - 3000.
var port = normalizePort(process.env.PORT);
var server = http.createServer(app.express);

server.listen(port);
// onError is just our basic error handler for the HTTP server.
server.on('error', onError);
// onListening simply lets us know that our application has actually started and is listening for requests.
server.on('listening', onListening);

function normalizePort(val) {
  var port = typeof val === 'string' ? parseInt(val, 10) : val;

  if (port && isNaN(port)) return port;else if (port >= 0) return port;else return DEFAULT_PORT;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port.toString();

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger('Listening on ' + bind);
}
//# sourceMappingURL=index.js.map
