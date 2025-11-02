import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware.js';
import { AuthService } from '../services/auth.service.js';
import { EmailService } from '../services/email.service.js';
import logger from '../utils/logger.js';
import { RegisterDto, LoginDto } from '../types/dtos.js';

export class AuthController {
  private authService: AuthService;
  private emailService: EmailService;

  constructor(authService: AuthService, emailService: EmailService) {
    this.authService = authService;
    this.emailService = emailService;
  }

  register = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const data: RegisterDto = req.body;
      const result = await this.authService.register(data);

      // Send welcome email (non-blocking)
      this.emailService.sendWelcomeEmail(data.email, data.name).catch((error) => {
        logger.error('Failed to send welcome email:', error);
      });

      // Set refresh token in httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      // Log error with both Winston and console
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      logger.error('Registration error:', { error: errorMessage, email: req.body?.email });
      console.error('Registration error:', errorMessage, { email: req.body?.email });
      
      res.status(400).json({
        error: 'Registration failed',
        message: errorMessage,
      });
    }
  };

  login = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const data: LoginDto = req.body;
      const result = await this.authService.login(data);

      // Set refresh token in httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        user: result.user,
        accessToken: result.accessToken,
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(401).json({
        error: 'Login failed',
        message: 'Invalid credentials',
      });
    }
  };

  logout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;

      if (userId) {
        await this.authService.logout(userId);
      }

      // Clear refresh token cookie
      res.clearCookie('refreshToken');

      res.status(200).json({
        message: 'Logged out successfully',
      });
    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        error: 'Logout failed',
        message: 'An error occurred during logout',
      });
    }
  };

  refreshToken = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'No refresh token provided',
        });
        return;
      }

      const result = await this.authService.refreshAccessToken(refreshToken);

      res.status(200).json({
        accessToken: result.accessToken,
      });
    } catch (error) {
      logger.error('Token refresh error:', error);
      res.status(401).json({
        error: 'Token refresh failed',
        message: 'Invalid or expired refresh token',
      });
    }
  };

  forgotPassword = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      const { resetToken } = await this.authService.forgotPassword(email);

      // Send password reset email (non-blocking)
      this.emailService.sendPasswordResetEmail(email, resetToken).catch((error) => {
        logger.error('Failed to send password reset email:', error);
      });

      // Always return success (security best practice)
      res.status(200).json({
        message: 'If the email exists, a password reset link has been sent',
      });
    } catch (error) {
      logger.error('Forgot password error:', error);
      res.status(500).json({
        error: 'Password reset failed',
        message: 'An error occurred during password reset',
      });
    }
  };

  resetPassword = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { token, password } = req.body;

      await this.authService.resetPassword(token, password);

      res.status(200).json({
        message: 'Password reset successfully',
      });
    } catch (error) {
      logger.error('Reset password error:', error);
      const message = error instanceof Error ? error.message : 'Password reset failed';
      res.status(400).json({
        error: 'Password reset failed',
        message,
      });
    }
  };

  getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          error: 'Unauthorized',
          message: 'Not authenticated',
        });
        return;
      }

      res.status(200).json({
        user: {
          id: req.user.userId,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (error) {
      logger.error('Get current user error:', error);
      res.status(500).json({
        error: 'Failed to get user',
        message: 'An error occurred',
      });
    }
  };
}
