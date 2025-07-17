import { Request } from 'express';

export interface JwtPayload {
  id: string;
  role: 'user' | 'admin' | 'superadmin';
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'user' | 'admin' | 'superadmin';
        email?: string;
      };
    }
  }
}