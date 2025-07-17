
import { queueService } from '../Notifications /queue.service';
import { logger } from '../utils/logger';
import { ErrorMessages } from '../utils/errorMessage'; 

const notificationService = {

  sendNotificationToQueue: async (message: string) => {
    try {
      await queueService.publish('notification_queue', { message });
      logger.info('Notification sent to queue');
    } catch (error) {
      
      logger.error(`Error sending notification: ${ErrorMessages.QUEUE_SEND_ERROR}`);
      throw new Error(ErrorMessages.NOTIFICATION_ERROR);
    }
  },
};

export { notificationService };
