import express from 'express';

const router = express.Router();

// Placeholder routes for worker functionality
router.get('/profile', (req, res) => {
  res.json({ message: 'Worker profile route' });
});

router.post('/availability', (req, res) => {
  res.json({ message: 'Set availability route' });
});

export default router;