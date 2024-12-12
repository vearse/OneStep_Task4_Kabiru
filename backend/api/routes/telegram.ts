import express, { Router, Request, Response } from 'express';
import { getTokenBalance } from '../controllers/tokenController';
import { initializeUsername, sendOtp, verifyOtp } from '../controllers/authController';

const router: Router = express.Router();

router.post("/authenticate", initializeUsername);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router; 