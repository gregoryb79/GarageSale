import { Router } from 'express';
import { createItem, getItems, getItemById, deleteItem, updateItem } from '../controllers/item.controller';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getItems);
router.post('/', protect, createItem);
router.get('/:id', getItemById);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

export default router;
