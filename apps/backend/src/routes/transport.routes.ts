import express from 'express';

const router = express.Router();

// Placeholder routes for transport functionality
router.get('/', (req, res) => {
  res.json({ message: 'List transport jobs route' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create transport job route' });
});

export default router;