import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import subscriptionRoutes from '../http/routes/subscription';
import xss from 'xss-clean';
import { config } from '../config/config';
import { allowedMethodsMiddleware } from './middlewares/allowed-methods-middleware';
import { loggerMiddleware } from './middlewares/logger-middleware';
import { StatusCodes } from './status-codes';
import { NotFoundErrorResponse } from './error-responses';
import expressRateLimit from 'express-rate-limit';

export function createServer() {
  const app = express();

  app.use(expressRateLimit({
    max: 100,
    windowMs: 1000 * 60 * 10
  }));
  app.use(loggerMiddleware());
  app.use(helmet());
  app.use(cors({ origin: config.server.allowedOrigin }));
  // app.use(allowedHeadersMiddleware());
  app.use(allowedMethodsMiddleware());
  app.use(express.text());
  app.use(xss());

  app.use('/esl', subscriptionRoutes);

  app.use((_, res: express.Response) => {
    res.status(StatusCodes.NOT_FOUND).json(new NotFoundErrorResponse());
  });

  return app;
}
