import { Router } from 'express';
import { getCart, addToCart, deleteFromCart } from '../controllers/cart.controller';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete(`/:itemId`, protect, deleteFromCart); // Assuming you have a deleteFromCart function in your controller

export default router;
