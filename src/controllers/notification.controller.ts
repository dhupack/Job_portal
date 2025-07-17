import { Request, Response } from 'express';
import { notificationService } from '/home/user/job_PORTAL/src/Notifications /notification.service';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages } from '../utils/errorMessage';

const sendNotification = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    await notificationService.sendNotificationToQueue(message);
    res.status(HTTP_CODES.ACCEPTED).json({ message: 'Notification queued successfully' });
  } catch (error) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: ErrorMessages.NOTIFICATION_ERROR });
  }
};

export { sendNotification };
