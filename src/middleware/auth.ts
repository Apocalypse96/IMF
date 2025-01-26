import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export interface IUserPayload {
  id: string;
  role: string;
}

// Extend the Request type to include our user property
declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

// Create a type-safe authenticate middleware
export const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const decoded = jwt.verify(token, jwtConfig.secret) as IUserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};