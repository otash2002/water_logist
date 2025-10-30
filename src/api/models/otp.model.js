import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ['REGISTRATION', 'PASSWORD_RESET', 'LOGIN_VERIFICATION'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
    },
    isUsed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("OTP", otpSchema);