import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import { adminService } from '/home/user/job_PORTAL/src/Services/superadmin.admin.services';
import { generateToken } from '../utils/helper';

export const listAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const admins = await adminService.listAdmins();
    res.status(HTTP_CODES.OK).json(admins);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  const { adminId } = req.params;
  try {
    await adminService.deleteAdmin(adminId);
    res.status(HTTP_CODES.OK).json({ message: ErrorMessages.ADMIN_DELETED });
  } catch (error: any) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    const admin = await adminService.signup(email, password, name);
    const token = generateToken({ id: admin._id, role: admin.role });
    res.status(HTTP_CODES.CREATED).json({ token });
  } catch (error: any) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const admin = await adminService.login(email, password);
    const token = generateToken({ id: admin._id, role: admin.role });
    res.status(HTTP_CODES.OK).json({ token });
  } catch (error: any) {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.message });
  }
};