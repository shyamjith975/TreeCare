import express from 'express';

const router = express.Router();

// Placeholder routes for subscription functionality
router.get('/', (req, res) => {
  res.json({ message: 'List subscriptions route' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create subscription route' });
});

export default router;