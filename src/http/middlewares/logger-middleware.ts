import express from 'express';
import { logger } from '../../infra';

export const loggerMiddleware = () => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  logger.log(`REQ ${req.method} ${req.url}`);

  res.on('finish', () => {
    logger.log(`RES ${req.method} ${req.url} ${res.statusCode}`);
  });
  
  next();
}
