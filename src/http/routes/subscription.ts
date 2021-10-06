import express from 'express';
import controller from '../controllers/subscription';

const router = express.Router();

router.delete('/subscription', controller.handleDelete);

router.post('/subscription', controller.handleInsert);

export default router;
