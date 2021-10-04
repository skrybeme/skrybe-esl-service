import express from 'express';

export const allowedMethodsMiddleware = () => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods: DELETE, POST');
  } else if (req.method !== 'DELETE' && req.method !== 'POST') {
    res.status(405).json({
      type: 'method_not_allowed'
    });
  }

  next();
}
