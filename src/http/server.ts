import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from '../config/config';
import { allowedMethodsMiddleware } from './middlewares/allowed-methods-middleware';
import { loggerMiddleware } from './middlewares/logger-middleware';

export function createServer() {
  const app = express();

  app.use(loggerMiddleware());
  app.use(helmet());
  app.use(cors({ origin: config.server.allowedOrigin }));
  // app.use(allowedHeadersMiddleware());
  app.use(allowedMethodsMiddleware());

  app.use((_, res: express.Response) => {
    res.status(404).json({
      error_type: 'not_found'
    });
  });

  return app;
}
