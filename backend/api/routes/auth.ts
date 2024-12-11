import express, { Router, Request, Response } from 'express';
import { getTokenBalance } from '../controllers/tokenController';
import { initializeUsername, sendOtp, verifyOtp } from '../controllers/authController';

const router: Router = express.Router();

router.post("/api/telegram/authenticate", initializeUsername);
router.post("/api/telegram/send-otp", sendOtp);
router.post("/api/telegram/verify-otp", verifyOtp);

export default router; 