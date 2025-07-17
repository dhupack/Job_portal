import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';;
import { analyticsService } from '/home/user/job_PORTAL/src/Services/superadmin.analytic.services';

export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const analytics = await analyticsService.getAnalytics();
    res.status(HTTP_CODES.OK).json(analytics);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};