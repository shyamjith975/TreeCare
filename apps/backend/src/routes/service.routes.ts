import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/services
 * List all services
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const services = await prisma.service.findMany({
      where: {
        isActive: true,
        ...(category && { category: category as string })
      },
      include: {
        addOns: {
          where: { isActive: true }
        }
      }
    });

    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/services/:id
 * Get service details
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        addOns: {
          where: { isActive: true }
        },
        pricingRules: {
          where: {
            isActive: true,
            applyUntil: {
              gt: new Date()
            }
          }
        }
      }
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/services/:id/addons
 * Get service add-ons
 */
router.get('/:id/addons', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const addOns = await prisma.addOnService.findMany({
      where: {
        serviceId: id,
        isActive: true
      }
    });

    res.json(addOns);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;