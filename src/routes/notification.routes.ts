import { Router, Request, Response } from 'express';
import { HTTP_CODES } from '/home/user/job_PORTAL/src/utils/httpCodes';
import { ErrorMessages } from '/home/user/job_PORTAL/src/utils/errorMessage';
import { queueService } from '../Notifications /queue.service';
import { logger } from '/home/user/job_PORTAL/src/utils/logger';

const router = Router();

// Endpoint to enqueue notification
router.post('/send-notification', async (
  req: Request<{}, {}, { userId: string; title: string; content: string }>,
  res: Response
): Promise<void> => {
  const { userId, title, content } = req.body;

  // Validate request body
  if (!userId || !title || !content) {
    res.status(HTTP_CODES.BAD_REQUEST).json({
      error: ErrorMessages.VALIDATION_ERROR,
      message: 'User ID, title, and content are required.',
    });
    return;
  }

  try {
    await queueService.publish('notification_queue', { userId, title, content });
    logger.info(`Notification enqueued for user ${userId}`);
    res.status(HTTP_CODES.OK).json({ message: 'Notification enqueued successfully' });
  } catch (error: unknown) {
    logger.error(`Failed to enqueue notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
      error: ErrorMessages.NOTIFICATION_ERROR,
      message: 'Failed to enqueue notification.',
    });
  }
});

export default router;
