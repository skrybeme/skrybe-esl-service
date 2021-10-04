import express from 'express';

export const loggerMiddleware = () => (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) => {
  console.log(req.url);
  next();
}
