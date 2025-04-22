import { Router } from 'express';
import { getCart, addToCart } from '../controllers/cart.controller';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);

export default router;
