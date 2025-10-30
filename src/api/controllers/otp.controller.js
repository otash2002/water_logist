import OTP from '../models/otp.model.js';
import Customer from '../models/customers.model.js';
import { success, error } from '../utils/response.js';

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const OTPController = {
    // Generate and send OTP
    sendOTP: async (req, res) => {
        try {
            const { email, purpose } = req.body;
            
            // Find customer
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return error(res, 'Customer not found', 404);
            }

            // Generate new OTP
            const otpValue = generateOTP();
            
            // Save OTP in database
            await OTP.create({
                userId: customer._id,
                otp: otpValue,
                purpose: purpose
            });

            // TODO: Implement actual SMS/email sending here
            // For now, we'll just return the OTP in response (for testing)
            return success(res, { 
                message: 'OTP sent successfully',
                otp: otpValue // Remove this in production
            });
        } catch (err) {
            return error(res, 'Failed to send OTP', 500, err.message);
        }
    },

    // Verify OTP
    verifyOTP: async (req, res) => {
        try {
            const { email, otp, purpose } = req.body;

            // Find customer
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return error(res, 'Customer not found', 404);
            }

            // Find valid OTP
            const otpRecord = await OTP.findOne({
                userId: customer._id,
                otp: otp,
                purpose: purpose,
                isUsed: false,
                expiresAt: { $gt: new Date() }
            });

            if (!otpRecord) {
                return error(res, 'Invalid or expired OTP', 400);
            }

            // Mark OTP as used
            otpRecord.isUsed = true;
            await otpRecord.save();

            return success(res, { verified: true }, 'OTP verified successfully');
        } catch (err) {
            return error(res, 'Failed to verify OTP', 500, err.message);
        }
    },

    // Reset password with OTP
    resetPassword: async (req, res) => {
        try {
            const { email, otp, newPassword } = req.body;

            // Find customer
            const customer = await Customer.findOne({ email });
            if (!customer) {
                return error(res, 'Customer not found', 404);
            }

            // Verify OTP
            const otpRecord = await OTP.findOne({
                userId: customer._id,
                otp: otp,
                purpose: 'PASSWORD_RESET',
                isUsed: false,
                expiresAt: { $gt: new Date() }
            });

            if (!otpRecord) {
                return error(res, 'Invalid or expired OTP', 400);
            }

            // Update password
            customer.password = newPassword;
            await customer.save();

            // Mark OTP as used
            otpRecord.isUsed = true;
            await otpRecord.save();

            return success(res, null, 'Password reset successfully');
        } catch (err) {
            return error(res, 'Failed to reset password', 500, err.message);
        }
    }
};

export default OTPController;