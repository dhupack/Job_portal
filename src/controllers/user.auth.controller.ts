
import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import { authService } from '/home/user/job_PORTAL/src/Services/user.auth.service';
import { generateToken } from '../utils/helper';
import  {User}  from '../models/user'; 

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;

  console.log('Received signup request:', req.body);
  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ message: 'User already exists' });
      return;
    }

    
    const user = await authService.signup(email, password, name);
    console.log('User created:', user);

    const token = generateToken({ id: user._id, role: user.role });
    res.status(HTTP_CODES.CREATED).json({ token });
  } catch (error: any) {
    console.log('Error during signup:', error);
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await authService.login(email, password);
    const token = generateToken({ id: user._id, role: user.role });
    res.status(HTTP_CODES.OK).json({ token });
  } catch (error: any) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.message });
  }
};
