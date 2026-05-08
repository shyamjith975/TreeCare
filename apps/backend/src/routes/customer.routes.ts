import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET /api/customers/profile
 * Get customer profile
 */
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const customer = await prisma.customer.findUnique({
      where: { userId: req.userId },
      include: {
        properties: true
      }
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer profile not found' });
    }

    res.json(customer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/customers/properties
 * Add property
 */
router.post('/properties', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Get or create customer
    let customer = await prisma.customer.findUnique({
      where: { userId: req.userId }
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: { userId: req.userId }
      });
    }

    const {
      name,
      description,
      address,
      city,
      district,
      state,
      pincode,
      latitude,
      longitude,
      totalTrees,
      treeType,
      areaInAcres,
      ownershipType,
      image
    } = req.body;

    const property = await prisma.property.create({
      data: {
        customerId: customer.id,
        name,
        description,
        address,
        city,
        district,
        state,
        pincode,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        totalTrees,
        treeType,
        areaInAcres: parseFloat(areaInAcres),
        ownershipType,
        image
      }
    });

    res.status(201).json(property);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/customers/properties
 * List customer properties
 */
router.get('/properties', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const customer = await prisma.customer.findUnique({
      where: { userId: req.userId }
    });

    if (!customer) {
      return res.json([]);
    }

    const properties = await prisma.property.findMany({
      where: {
        customerId: customer.id,
        isActive: true
      }
    });

    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/customers/properties/:id
 * Get property details
 */
router.get('/properties/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        entries: true,
        bookings: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        harvestRecords: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/customers/bookings
 * Create booking
 */
router.post('/bookings', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const customer = await prisma.customer.findUnique({
      where: { userId: req.userId }
    });

    if (!customer) {
      return res.status(400).json({ error: 'Customer profile not found' });
    }

    const {
      propertyId,
      serviceId,
      treeCount,
      timeSlot,
      scheduledDate,
      serviceMode,
      addOns = []
    } = req.body;

    // Get service details
    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return res.status(400).json({ error: 'Service not found' });
    }

    // Calculate pricing
    const basePrice = service.basePrice * treeCount;
    let addOnPrice = 0;

    for (const addOnId of addOns) {
      const addOn = await prisma.addOnService.findUnique({
        where: { id: addOnId }
      });
      if (addOn) {
        addOnPrice += addOn.price;
      }
    }

    const totalPrice = basePrice + addOnPrice;
    const finalPrice = totalPrice;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        customerId: customer.id,
        propertyId,
        serviceId,
        treeCount,
        timeSlot,
        scheduledDate: new Date(scheduledDate),
        serviceMode,
        basePrice,
        addOnPrice,
        totalPrice,
        finalPrice
      }
    });

    // Add add-ons
    for (const addOnId of addOns) {
      const addOn = await prisma.addOnService.findUnique({
        where: { id: addOnId }
      });
      if (addOn) {
        await prisma.bookingAddOn.create({
          data: {
            bookingId: booking.id,
            addOnId,
            price: addOn.price
          }
        });
      }
    }

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/customers/bookings
 * List customer bookings
 */
router.get('/bookings', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const customer = await prisma.customer.findUnique({
      where: { userId: req.userId }
    });

    if (!customer) {
      return res.json([]);
    }

    const bookings = await prisma.booking.findMany({
      where: { customerId: customer.id },
      include: {
        service: true,
        property: true,
        worker: {
          include: {
            user: true
          }
        },
        addOns: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;