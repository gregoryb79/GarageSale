import { Router } from 'express';
// import { getWishlistByUserId } from '../controllers/wishlist.controller';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// router.get('/:id/wishlist', protect, getWishlistByUserId);

export default router;
