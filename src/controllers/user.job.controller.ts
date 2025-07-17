import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import { jobService } from '../Services/user.job.service';

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await jobService.getJobs();
    res.status(HTTP_CODES.OK).json(jobs);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};

export const applyJob = async (req: Request, res: Response): Promise<void> => {
  const { jobId, resumeId } = req.body;
  const userId = req.user?.id;
  try {
    await jobService.applyJob(userId!, jobId, resumeId);
    res.status(HTTP_CODES.CREATED).json({ message: ErrorMessages.APPLICATION_SUBMITTED });
  } catch (error: any) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};