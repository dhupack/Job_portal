import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages } from '../utils/errorMessage';
import Admin, { IAdmin } from '../models/Admin';
import { JwtPayload } from '../types';

export const adminAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: ErrorMessages.NO_TOKEN_PROVIDED });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MAHI123') as JwtPayload;
    if (decoded.role !== 'admin') {
      res.status(HTTP_CODES.FORBIDDEN).json({ message: ErrorMessages.ACCESS_DENIED });
      return;
    }

    const admin: IAdmin | null = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      res.status(HTTP_CODES.UNAUTHORIZED).json({ message: ErrorMessages.INVALID_TOKEN });
      return;
    }

    req.user = { id: admin.id.toString(), role: admin.role, email: admin.email || '' };
    next();
  } catch (error) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: ErrorMessages.INVALID_TOKEN });
  }
};