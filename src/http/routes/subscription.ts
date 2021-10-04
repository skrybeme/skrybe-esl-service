import express from 'express';
import controller from '../controllers/subscription';

const router = express.Router();

router.delete('/subscription', (req: express.Request, res: express.Response) => {
  controller.handleDelete(req);
});

router.post('/subscription', (req: express.Request, res: express.Response) => {
  controller.handleInsert(req);
});
