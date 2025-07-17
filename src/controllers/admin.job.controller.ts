import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import { jobService } from '../Services/admin.job.services';

export const createJob = async (req: Request, res: Response): Promise<void> => {
  const { title, description, company, location, type } = req.body;
  const adminId = req.user?.id;
  try {
    const job = await jobService.createJob({ title, description, company, location, type, createdBy: adminId! });
    res.status(HTTP_CODES.CREATED).json({ message: ErrorMessages.JOB_CREATED, job });
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};

export const listJobs = async (req: Request, res: Response): Promise<void> => {
  const adminId = req.user?.id;
  try {
    const jobs = await jobService.listJobs(adminId!);
    res.status(HTTP_CODES.OK).json(jobs);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};