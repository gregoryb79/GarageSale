import { Request, Response, NextFunction } from 'express';
import Item from '../models/item.model';

// קבלת כל הפריטים
export const getItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// יצירת פריט חדש
export const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price, imageurl, stock, category } = req.body;

    if (!name || !price || !imageurl || !stock || !category) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const item = new Item({
      name,
      description,
      price,
      imageurl,
      stock,
      category,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Item.findById(req.params.id);
  
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404);
        throw new Error('Item not found');
      }
    } catch (error) {
      next(error);
    }
  };
  
  export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, description, price, imageurl, stock, category } = req.body;
  
      const item = await Item.findById(req.params.id);
  
      if (item) {
        item.name = name || item.name;
        item.description = description || item.description;
        item.price = price || item.price;
        item.imageurl = imageurl || item.imageurl;
        item.stock = stock || item.stock;
        item.category = category || item.category;
  
        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
      } else {
        res.status(404);
        throw new Error('Item not found');
      }
    } catch (error) {
      next(error);
    }
  };

  export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await Item.findById(req.params.id);
  
      if (item) {
        await item.deleteOne();
        res.status(200).json({ message: 'Item removed' });
      } else {
        res.status(404);
        throw new Error('Item not found');
      }
    } catch (error) {
      next(error);
    }
  };
  