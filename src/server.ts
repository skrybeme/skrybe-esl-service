import express from 'express';

export function createServer() {
  const app = express();

  app.post('/', (_, res: express.Response) => {
    res.status(201).end();
  })

  return app;
}
