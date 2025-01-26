import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

interface JWTPayload {
  id: string;
  role: string;
}

export const login = async (
  req: LoginRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Mock user for demonstration
    const mockUser = {
      id: '1',
      username: 'agent',
      password: await bcrypt.hash('secret', 10),
      role: 'AGENT'
    };

    const { username, password } = req.body;
    
    if (username !== mockUser.username || !await bcrypt.compare(password, mockUser.password)) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const payload: JWTPayload = {
      id: mockUser.id,
      role: mockUser.role
    };

    const token = jwt.sign(
      payload,
      jwtConfig.secret,
      {
        algorithm: jwtConfig.algorithm,
        expiresIn: jwtConfig.expiresIn
      }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
};