import { Request, Response } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage'; 
import { interviewService } from '../Services/admin.interview.service';

export const scheduleInterview = async (req: Request, res: Response): Promise<void> => {
  const { applicationId, scheduledAt } = req.body;
  const adminId = req.user?.id;
  try {
    const interview = await interviewService.scheduleInterview(applicationId, new Date(scheduledAt), adminId!);
    res.status(HTTP_CODES.CREATED).json({ message: ErrorMessages.INTERVIEW_SCHEDULED, interview });
  } catch (error: any) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.message });
  }
};