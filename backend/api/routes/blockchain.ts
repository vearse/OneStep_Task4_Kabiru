import express, { Router, Request, Response } from 'express';
import { getTokenBalance } from '../controllers/tokenController';

const router: Router = express.Router();

router.get('/token-balance', getTokenBalance);

export default router;