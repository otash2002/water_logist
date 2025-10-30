import nodemailer from 'nodemailer';

// Simple, safe email helper. Exports sendMail(options) and transporter for testing.
// Usage:
//   import { sendMail } from './emailer.js'
//   await sendMail({ to: 'user@example.com', subject: 'Hi', text: 'Hello' })

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_FROM = process.env.EMAIL_FROM || `"Water Logist" <${EMAIL_USER || 'no-reply@example.com'}>`;

if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('emailer: EMAIL_USER or EMAIL_PASS is not set. Email sending will fail until configured.');
}

// Create transporter. If specific SMTP_HOST/PORT provided, use it; otherwise fall back to Gmail.
const transporter = nodemailer.createTransport(
    process.env.SMTP_HOST
        ? {
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587', 10),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASS,
                },
            }
        : {
                service: 'gmail',
                auth: { user: EMAIL_USER, pass: EMAIL_PASS },
            }
);

const sendMail = async ({ to, subject, text, html, from = EMAIL_FROM }) => {
    if (!to) throw new Error('emailer.sendMail: "to" is required');
    if (!subject) subject = '(no subject)';

    const mailOptions = { from, to, subject, text, html };

    try {
        const info = await transporter.sendMail(mailOptions);
        // nodemailer returns different info objects depending on transport
        console.info('emailer: message sent', info?.messageId || info);
        return info;
    } catch (err) {
        console.error('emailer: failed to send email', err);
        throw err;
    }
};

export { transporter, sendMail };


