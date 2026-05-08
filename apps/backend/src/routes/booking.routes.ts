import express from 'express';

const router = express.Router();

// Placeholder routes for booking functionality
router.get('/', (req, res) => {
  res.json({ message: 'List bookings route' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get booking details route' });
});

export default router;