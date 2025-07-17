import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages } from '../utils/errorMessage';
import { jobService } from '../Services/superadmin.job.services';

export const listAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await jobService.listAllJobs();
    res.status(HTTP_CODES.OK).json(jobs);
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.SERVER_ERROR });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  const { jobId } = req.params;
  try {
    await jobService.deleteJob(jobId);
    res.status(HTTP_CODES.OK).json({ message: ErrorMessages.JOB_DELETED });
  } catch (error: any) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};