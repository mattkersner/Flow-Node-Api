// @flow

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import ProduceRouter from './routers/ProduceRouter';

// First, we create a field reference for the Api.express property,
// and tell Flow that it will be an object of type express$Application from Express.
export default class Api {
  // annotate with the express $Application type
  express: express$Application;

  // create the express instance, attach app-level middleware, attach routers
  // The constructor initializes an instance of Express, and attaches it to the instance of Api.
  // Then it calls the other two methods, Api.middleware and Api.routes.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // register middlewares
  // Api.middleware - Initializes and attaches our middleware modules to the app.
  middleware(): void {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // connect resource routers
  routes(): void {
  // create an instance of ProduceRouter
    const produceRouter = new ProduceRouter();
  // attach it to our express app
    this.express.use(produceRouter.path, produceRouter.router);
  }
}
