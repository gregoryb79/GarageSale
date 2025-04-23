import { Router } from 'express';
import { getWishlist, addToWishlist, deleteFromWishlist } from '../controllers/wishlist.controller';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getWishlist);
router.post('/', protect, addToWishlist);
router.delete(`/:itemId`, protect, deleteFromWishlist); // Assuming you have a deleteFromCart function in your controller

export default router;
