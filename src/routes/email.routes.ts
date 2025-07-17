import { Router, Request, Response } from 'express';
import { HTTP_CODES } from '/home/user/job_PORTAL/src/utils/httpCodes';
import { ErrorMessages } from '/home/user/job_PORTAL/src/utils/errorMessage';
import { queueService } from '../Notifications /queue.service';
import { logger } from '/home/user/job_PORTAL/src/utils/logger';

const router = Router();


router.post('/send-email', async (
  req: Request<{}, {}, { email: string; subject: string; message: string }>,
  res: Response
): Promise<void> => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      error: ErrorMessages.VALIDATION_ERROR,
      message: 'Email, subject, and message are required.',
    });
    return;
  }

  try {
    await queueService.publish('email_queue', { email, subject, message });
    logger.info(`Email enqueued for ${email}`);
    res.status(HTTP_CODES.OK).json({ message: 'Email enqueued successfully' });
  } catch (error: unknown) {
    logger.error(`Failed to enqueue email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      error: ErrorMessages.NOTIFICATION_ERROR,
      message: 'Failed to enqueue email.',
    });
  }
});


router.post('/schedule-email', async (
  req: Request<{}, {}, { email: string; subject: string; message: string; scheduledAt: string }>,
  res: Response
): Promise<void> => {
  const { email, subject, message, scheduledAt } = req.body;

  if (!email || !subject || !message || !scheduledAt) {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      error: ErrorMessages.VALIDATION_ERROR,
      message: 'Email, subject, message, and scheduledAt are required.',
    });
    return;
  }

  const scheduledDate = new Date(scheduledAt);
  if (isNaN(scheduledDate.getTime()) || scheduledDate <= new Date()) {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      error: ErrorMessages.VALIDATION_ERROR,
      message: 'Scheduled time must be a valid future date.',
    });
    return;
  }

  try {
    await queueService.publish('scheduler_queue', { email, subject, message, scheduledAt });
    logger.info(`Scheduled email enqueued for ${email} at ${scheduledAt}`);
    res.status(HTTP_CODES.OK).json({ message: 'Scheduled email enqueued successfully' });
  } catch (error: unknown) {
    logger.error(`Failed to enqueue scheduled email: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      error: ErrorMessages.NOTIFICATION_ERROR,
      message: 'Failed to enqueue scheduled email.',
    });
  }
});

export default router;