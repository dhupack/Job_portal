import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import { reportService } from '/home/user/job_PORTAL/src/Services/superadmin.report.services';

export const generateUserActivityReport = async (req: Request, res: Response): Promise<void> => {
  const superAdminId = req.user?.id;
  try {
    const report = await reportService.generateUserActivityReport(superAdminId!);
    res.status(HTTP_CODES.CREATED).json({ message: 'User Activity Report generated', report });
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};

export const generateJobActivityReport = async (req: Request, res: Response): Promise<void> => {
  const superAdminId = req.user?.id;
  try {
    const report = await reportService.generateJobActivityReport(superAdminId!);
    res.status(HTTP_CODES.CREATED).json({ message: 'Job Activity Report generated', report });
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};

export const generateApplicationStatsReport = async (req: Request, res: Response): Promise<void> => {
  const superAdminId = req.user?.id;
  try {
    const report = await reportService.generateApplicationStatsReport(superAdminId!);
    res.status(HTTP_CODES.CREATED).json({ message: 'Application Stats Report generated', report });
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};