// @flow

'use strict'

import * as http from 'http';
import debug from 'debug';
import Api from './Api';

// At the top we’ve got our Flow comment, imports, and our first bit of
// strictly Flow-enabled code - the ErrnoError interface declaration. This error type
// is used by Express. When using the flow check command from the official command line tool,
// Flow will not flag this as an error. For whatever reason, gulp-flowtype does.
// If you get a strange type check error, it may be worth it to install the Flow CLI and
// double check using flow check.

// ErrnoError interface for use in onError
declare interface ErrnoError extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
}

// After the ErrnoError definition, we set up some data and
// instantiate the server by attaching our future Express app with http.createServer.
const logger = debug('flow-api:startup');
const app: Api = new Api();
const DEFAULT_PORT: number = 3000;
// normalizePort looks for the $PORT environment variable and sets the app’s port to its value.
// If it doesn’t exist, it sets the port to the default value - 3000.
const port: string | number = normalizePort(process.env.PORT);
const server: http.Server = http.createServer(app.express);

server.listen(port);
// onError is just our basic error handler for the HTTP server.
server.on('error', onError);
// onListening simply lets us know that our application has actually started and is listening for requests.
server.on('listening', onListening);

function normalizePort(val: any): number | string {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;

  if (port && isNaN(port)) return port;
  else if (port >= 0) return port;
  else return DEFAULT_PORT;
}

function onError(error: ErrnoError): void {
  if (error.syscall !== 'listen') throw error;
  let bind: string = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port.toString()}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr: string = server.address();
  let bind: string = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  logger(`Listening on ${bind}`);
}

