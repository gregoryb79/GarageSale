import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      hashpassword: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token,
    });

  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`loginUser called with body: ${JSON.stringify(req.body)}`);
    
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        res.status(401);
        throw new Error('Invalid email or password');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.hashpassword);
  
      if (!isPasswordValid) {
        res.status(401);
        throw new Error('Invalid email or password');
      }
  
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '30d' }
      );
  
      res.status(200).json({
        _id: user._id,
        email: user.email,
        token,
      });
  
    } catch (error) {
      next(error);
    }
  };
  
  export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  };