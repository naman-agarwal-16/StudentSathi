import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { RegisterDto, LoginDto, AuthResponseDto } from '../types/dtos.js';

export class AuthService {
  private prisma: PrismaClient;
  private readonly saltRounds = 10;
  private readonly accessTokenExpiry = '15m';
  private readonly refreshTokenExpiry = '7d';
  private readonly resetTokenExpiry = 3600000; // 1 hour in ms

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async register(data: RegisterDto): Promise<AuthResponseDto> {
    // Validate password length
    if (data.password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('Email already used');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, this.saltRounds);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: data.role,
      },
    });

    logger.info(`User registered: ${user.email}`);

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Store refresh token
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    logger.info(`User logged in: ${user.email}`);

    // Generate tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Store refresh token
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    logger.info(`User logged out: ${userId}`);
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, config.jwtSecret) as { userId: string };

      // Find user and verify refresh token matches
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new Error('Invalid refresh token');
      }

      // Generate new access token
      const accessToken = this.generateAccessToken(user);

      return { accessToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async forgotPassword(email: string): Promise<{ resetToken: string }> {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Always generate a token to maintain consistent response time (security)
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    if (!user) {
      // Return dummy token but don't save it (security best practice)
      logger.warn(`Password reset requested for non-existent email: ${email}`);
      return { resetToken };
    }

    // Store reset token only for existing user
    const resetTokenExpiry = new Date(Date.now() + this.resetTokenExpiry);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    logger.info(`Password reset token generated for: ${user.email}`);

    return { resetToken };
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Find user by reset token
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(), // Token not expired
        },
      },
    });

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, this.saltRounds);

    // Update password and clear reset token
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
        refreshToken: null, // Invalidate all sessions
      },
    });

    logger.info(`Password reset successful for: ${user.email}`);
  }

  async verifyAccessToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      config.jwtSecret,
      { expiresIn: this.accessTokenExpiry }
    );
  }

  private generateRefreshToken(user: User): string {
    return jwt.sign(
      {
        userId: user.id,
      },
      config.jwtSecret,
      { expiresIn: this.refreshTokenExpiry }
    );
  }
}
