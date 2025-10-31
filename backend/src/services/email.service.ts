import nodemailer from 'nodemailer';
import config from '../config/index.js';
import logger from '../utils/logger.js';

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    // Only initialize if SMTP is configured
    if (!config.smtp?.host) {
      logger.warn('SMTP not configured - email service disabled');
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: config.smtp.auth ? {
        user: config.smtp.auth.user,
        pass: config.smtp.auth.pass,
      } : undefined,
    });

    logger.info('Email service initialized');
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    if (!this.transporter) {
      logger.warn(`Password reset email not sent (SMTP not configured): ${email}`);
      return;
    }

    const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;

    try {
      await this.transporter.sendMail({
        from: config.smtp?.from || 'noreply@studentsathi.com',
        to: email,
        subject: 'Password Reset Request - StudentSathi',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>You requested to reset your password for StudentSathi.</p>
            <p>Click the button below to reset your password. This link will expire in 1 hour.</p>
            <div style="margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't request this, please ignore this email.
            </p>
            <p style="color: #666; font-size: 12px;">
              Or copy and paste this URL into your browser:<br/>
              ${resetUrl}
            </p>
          </div>
        `,
        text: `
Password Reset Request

You requested to reset your password for StudentSathi.

Click the link below to reset your password. This link will expire in 1 hour.

${resetUrl}

If you didn't request this, please ignore this email.
        `,
      });

      logger.info(`Password reset email sent to: ${email}`);
    } catch (error) {
      logger.error('Failed to send password reset email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    if (!this.transporter) {
      logger.warn(`Welcome email not sent (SMTP not configured): ${email}`);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: config.smtp?.from || 'noreply@studentsathi.com',
        to: email,
        subject: 'Welcome to StudentSathi!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to StudentSathi, ${name}!</h2>
            <p>Thank you for joining StudentSathi. We're excited to have you on board.</p>
            <p>You can now access your dashboard and start managing student engagement.</p>
            <div style="margin: 30px 0;">
              <a href="${config.frontendUrl}/login" 
                 style="background-color: #4F46E5; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; display: inline-block;">
                Go to Dashboard
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you have any questions, feel free to reach out to our support team.
            </p>
          </div>
        `,
        text: `
Welcome to StudentSathi, ${name}!

Thank you for joining StudentSathi. We're excited to have you on board.

You can now access your dashboard and start managing student engagement.

Login at: ${config.frontendUrl}/login

If you have any questions, feel free to reach out to our support team.
        `,
      });

      logger.info(`Welcome email sent to: ${email}`);
    } catch (error) {
      logger.error('Failed to send welcome email:', error);
      // Don't throw - welcome email is not critical
    }
  }
}
