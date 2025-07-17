import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage'; 
import { authService } from '../Services/admin.auth.services';
import { generateToken } from '/home/user/job_PORTAL/src/utils/helper';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    const admin = await authService.signup(email, password, name);
    const token = generateToken({ id: admin._id, role: admin.role });
    res.status(HTTP_CODES.CREATED).json({ token });
  } catch (error: any) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const admin = await authService.login(email, password);
    const token = generateToken({ id: admin._id, role: admin.role });
    res.status(HTTP_CODES.OK).json({ token });
  } catch (error: any) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.message });
  }
};