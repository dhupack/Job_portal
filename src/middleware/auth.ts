import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages } from '../utils/errorMessage';
import {User ,IUser } from '../models/user';
import { JwtPayload } from '../types';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: ErrorMessages.NO_TOKEN_PROVIDED });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MAHI123') as JwtPayload;
    if (decoded.role !== 'user') {
      res.status(HTTP_CODES.FORBIDDEN).json({ message: ErrorMessages.ACCESS_DENIED });
      return;
    }

    const user: IUser | null = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(HTTP_CODES.UNAUTHORIZED).json({ message: ErrorMessages.INVALID_TOKEN });
      return;
    }

    req.user = { id: user.id.toString(), role: user.role, email: user.email || '' };
    next();
  } catch (error) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: ErrorMessages.INVALID_TOKEN });
  }
};