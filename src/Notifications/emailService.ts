
import { queueService } from '../Notifications /queue.service';
import { logger } from '../utils/logger';
import { ErrorMessages } from '/home/user/job_PORTAL/src/utils/errorMessage';

const emailService = {
  sendEmailToQueue: async ({ subject, recipient, body }: { subject: string; recipient: string; body: string }) => {
    try {
      await queueService.publish('service_queue', { subject, recipient, body });
      logger.info('Email sent to queue');
    } catch (error) {
      
      logger.error(`Error sending email: ${ErrorMessages.NOTIFICATION_ERROR}`);
      throw new Error(ErrorMessages.NOTIFICATION_ERROR);
    }
  },
};

export { emailService };


