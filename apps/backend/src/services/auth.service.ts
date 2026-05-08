import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

interface OTPRequest {
  phone: string;
  deviceToken?: string;
  deviceType?: string;
}

interface OTPVerifyRequest {
  phone: string;
  otp: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

export const authService = {
  /**
   * Send OTP to phone number
   */
  async sendOTP(data: OTPRequest) {
    try {
      const { phone, deviceToken, deviceType } = data;

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { phone }
      });

      if (!user) {
        // Create temporary user record
        user = await prisma.user.create({
          data: {
            phone,
            role: 'CUSTOMER' // Default role
          }
        });
      }

      // Save OTP
      await prisma.oTPLog.create({
        data: {
          userId: user.id,
          phone,
          otp,
          expiresAt
        }
      });

      // Save device token if provided
      if (deviceToken && deviceType) {
        await prisma.device.upsert({
          where: {
            userId_deviceToken: {
              userId: user.id,
              deviceToken
            }
          },
          update: {
            lastActiveAt: new Date()
          },
          create: {
            userId: user.id,
            deviceToken,
            deviceType
          }
        });
      }

      // TODO: Send OTP via SMS/Twilio
      console.log(`OTP for ${phone}: ${otp}`);

      return {
        success: true,
        message: 'OTP sent successfully',
        userId: user.id
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify OTP and create JWT token
   */
  async verifyOTP(data: OTPVerifyRequest) {
    try {
      const { phone, otp, role, firstName, lastName } = data;

      // Find user
      const user = await prisma.user.findUnique({
        where: { phone }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Verify OTP
      const otpLog = await prisma.oTPLog.findFirst({
        where: {
          userId: user.id,
          phone,
          otp,
          isUsed: false,
          expiresAt: {
            gt: new Date()
          }
        }
      });

      if (!otpLog) {
        throw new Error('Invalid or expired OTP');
      }

      // Mark OTP as used
      await prisma.oTPLog.update({
        where: { id: otpLog.id },
        data: { isUsed: true }
      });

      // Update user
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          role: role as any,
          isVerified: true,
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName
        }
      });

      // Create JWT token
      const token = jwt.sign(
        {
          userId: updatedUser.id,
          phone: updatedUser.phone,
          role: updatedUser.role
        },
        process.env.JWT_SECRET || 'secret',
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '7d'
        }
      );

      return {
        success: true,
        token,
        user: {
          id: updatedUser.id,
          phone: updatedUser.phone,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          role: updatedUser.role
        }
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user profile
   */
  async getUserProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          customer: true,
          worker: true,
          climber: true,
          coordinator: true
        }
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, data: any) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          profileImage: data.profileImage,
          language: data.language
        },
        include: {
          customer: true,
          worker: true
        }
      });

      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  async logout(userId: string, deviceToken?: string) {
    try {
      if (deviceToken) {
        await prisma.device.delete({
          where: {
            userId_deviceToken: {
              userId,
              deviceToken
            }
          }
        });
      }

      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      throw error;
    }
  }
};

export default authService;