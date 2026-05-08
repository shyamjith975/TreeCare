import express, { Request, Response } from 'express';
import authService from '../services/auth.service';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * POST /api/auth/send-otp
 * Send OTP to phone number
 */
router.post('/send-otp', async (req: Request, res: Response) => {
  try {
    const { phone, deviceToken, deviceType } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const result = await authService.sendOTP({
      phone,
      deviceToken,
      deviceType
    });

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/auth/verify-otp
 * Verify OTP and get JWT token
 */
router.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { phone, otp, role, firstName, lastName } = req.body;

    if (!phone || !otp || !role) {
      return res.status(400).json({ error: 'Phone, OTP, and role are required' });
    }

    const result = await authService.verifyOTP({
      phone,
      otp,
      role,
      firstName,
      lastName
    });

    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /api/auth/profile
 * Get authenticated user profile
 */
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await authService.getUserProfile(req.userId);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /api/auth/profile
 * Update user profile
 */
router.patch('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await authService.updateUserProfile(req.userId, req.body);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { deviceToken } = req.body;
    const result = await authService.logout(req.userId, deviceToken);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;