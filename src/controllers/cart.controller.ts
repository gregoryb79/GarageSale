import { Request, Response, NextFunction } from 'express';
import Cart from '../models/cart.model';
import Item from '../models/item.model';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.itemId', 'name price');

    if (!cart) {
      res.status(200).json({ items: [] });
      return;
    }

    const formattedCart = cart.items.map(item => ({
      itemId: item.itemId._id,
      quantity: item.quantity,
      itemName: item.itemId.name,
      itemPrice: item.itemId.price,
    }));

    res.status(200).json(formattedCart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { itemId, quantity } = req.body;
  
      if (!itemId || !quantity || quantity < 1) {
        res.status(400);
        throw new Error('Please provide valid itemId and quantity');
      }
  
      const item = await Item.findById(itemId);
      if (!item) {
        res.status(404);
        throw new Error('Item not found');
      }
  
      let cart = await Cart.findOne({ user: req.user._id });
  
      if (!cart) {
        cart = new Cart({ user: req.user._id, items: [] });
      }
  
      const existingItem = cart.items.find(i => i.itemId.toString() === itemId);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ itemId, quantity });
      }
  
      await cart.save();
      res.status(200).json({ message: 'Cart updated' });
  
    } catch (error) {
      next(error);
    }
  };
  