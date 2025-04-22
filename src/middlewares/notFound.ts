import path from 'path';
import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(404).json({ message: 'API Route Not Found' });
  } else {
    res.status(404).sendFile(path.resolve(__dirname, '..', 'public', '404.html'));
  }
};

export default notFound;
