import { Request, Response, NextFunction } from 'express';
import Wishlist from '../models/wishlist.model';
import Item from '../models/item.model';

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  console.log("getWishlist starts");
  try {
    // const { id } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('items.itemId', 'name price');

    if (!wishlist) {
      console.log("Wishlist not found for user:", req.user._id);
      res.status(200).json({ items: [] });
      return;
    }

    const formattedWishlist = wishlist.items.map(item => ({
      itemId: item.itemId._id,
      quantity: item.quantity,
      itemName: item.itemId.name,
      itemPrice: item.itemId.price,
    }));

    console.log("Formatted wishlist:", formattedWishlist);

    res.status(200).json(formattedWishlist);
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req: Request, res: Response, next: NextFunction) => {
    console.log("addToWishlist starts");

    try {
      const { itemId, quantity } = req.body;
      console.log(`Adding ${quantity} of item ${itemId} to wishlist...`);
  
      if (!itemId || !quantity || quantity === 0) {
        res.status(400);
        throw new Error('Please provide valid itemId and quantity');
      }
  
      const item = await Item.findById(itemId);
      if (!item) {
        res.status(404);
        throw new Error('Item not found');
      }
  
      let wishlist = await Wishlist.findOne({ user: req.user._id });
  
      if (!wishlist) {
        wishlist = new Wishlist({ user: req.user._id, items: [] });
      }
  
      const existingItem = wishlist.items.find(i => i.itemId.toString() === itemId);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        wishlist.items.push({ itemId, quantity });
      }
  
      await wishlist.save();
      res.status(200).json({ message: 'Wishlist updated' });
  
    } catch (error) {
      next(error);
    }
  };

  export const deleteFromWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { itemId } = req.params;

      console.log(`Deleting ${itemId} from cart...`);
  
      if (!itemId) {
        res.status(400);
        throw new Error('Please provide a valid itemId');
      }
  
      const wishlist = await Wishlist.findOne({ user: req.user._id });
  
      if (!wishlist) {
        res.status(404);
        throw new Error('Cart not found');
      }
  
      wishlist.items = wishlist.items.filter(item => item.itemId.toString() !== itemId);
  
      await wishlist.save();
      res.status(200).json({ message: 'Item removed from cart' });
  
    } catch (error) {
      next(error);
    }
  }