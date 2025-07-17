import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import { userService } from '/home/user/job_PORTAL/src/Services/superadmin.user.services';

export const listUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.listUsers();
    res.status(HTTP_CODES.OK).json(users);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    await userService.deleteUser(userId);
    res.status(HTTP_CODES.OK).json({ message: ErrorMessages.USER_DELETED });
  } catch (error: any) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};