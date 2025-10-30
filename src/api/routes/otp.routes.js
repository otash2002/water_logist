import express from 'express';
import OTPController from '../controllers/otp.controller.js';

const router = express.Router();

// Send OTP
router.post('/send', OTPController.sendOTP);

// Verify OTP
router.post('/verify', OTPController.verifyOTP);

// Reset password with OTP
router.post('/reset-password', OTPController.resetPassword);

export default router;