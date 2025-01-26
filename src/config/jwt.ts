import dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
  secret: process.env.JWT_SECRET!,
  expiresIn: '24h' as const,
  algorithm: 'HS256' as const
};