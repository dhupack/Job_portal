import { Request, Response } from 'express';
import { emailService } from '/home/user/job_PORTAL/src/Notifications /emailService';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages } from '../utils/errorMessage';

const sendEmail = async (req: Request, res: Response) => {
  try {
    const { subject, recipient, body } = req.body;
    await emailService.sendEmailToQueue({ subject, recipient, body });
    res.status(HTTP_CODES.ACCEPTED).json({ message: 'Email queued successfully' });
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.NOTIFICATION_ERROR });
  }
};

export { sendEmail };
