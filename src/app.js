import './bootstrap';

import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import * as Sentry from '@sentry/node';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';
import sentryConfig from './config/sentry';
import './database';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use((req, res, next) => {
      return res.status(404).send({ message: 'API não encontrada!' });
    });

    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(err.status || 500).json(errors);
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
