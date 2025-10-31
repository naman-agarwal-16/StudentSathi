import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validateRequest } from '../middleware/errorHandler.js';
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js';
import {
  RegisterSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../types/dtos.js';
import { z } from 'zod';

export const createAuthRouter = (authController: AuthController) => {
  const router = Router();

  router.post(
    '/register',
    validateRequest(z.object({ body: RegisterSchema })),
    authController.register
  );

  router.post(
    '/login',
    validateRequest(z.object({ body: LoginSchema })),
    authController.login
  );

  router.post('/logout', optionalAuth, authController.logout);

  router.post('/refresh', authController.refreshToken);

  router.post(
    '/forgot-password',
    validateRequest(z.object({ body: ForgotPasswordSchema })),
    authController.forgotPassword
  );

  router.post(
    '/reset-password',
    validateRequest(z.object({ body: ResetPasswordSchema })),
    authController.resetPassword
  );

  router.get('/me', authenticate, authController.getCurrentUser);

  return router;
};
