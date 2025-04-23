import { Request, Response, NextFunction } from 'express';
import Wishlist from '../models/wishlist.model';

export const getWishlistByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const wishlist = await Wishlist.findOne({ user: id }).populate('items.itemId', 'name price');

    if (!wishlist) {
      res.status(200).json({ items: [] });
      return;
    }

    const formattedWishlist = wishlist.items.map(item => ({
      itemId: item.itemId._id,
      itemName: (item.itemId as any).name,
      itemPrice: (item.itemId as any).price,
    }));

    res.status(200).json(formattedWishlist);
  } catch (error) {
    next(error);
  }
};
