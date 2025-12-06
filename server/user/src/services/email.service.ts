import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587', 10), 
  secure: parseInt(process.env.EMAIL_PORT || '587', 10) === 465, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    
  }
});

interface SendVerificationEmailOptions {
  to: string;
  username: string;
  verificationLink: string;
}

export const sendVerificationEmail = async ({ to, username, verificationLink }: SendVerificationEmailOptions) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to, 
      subject: 'Verify Your Email Address - Pawpalbd', // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello, ${username}!</h2>
          <p>Thank you for registering with Pawpalbd. Please click the link below to verify your email address:</p>
          <p>
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #ffffff; background-color: #007bff; border-radius: 5px; text-decoration: none;">
              Verify Email Address
            </a>
          </p>
          <p>If you did not register for an account, please ignore this email.</p>
          <p>Best regards,<br>The My App Team</p>
        </div>
      `, // HTML body
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending verification email to ${to}:`, error);
    throw new Error('Failed to send verification email.');
  }
};