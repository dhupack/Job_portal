import { getChannel } from '../config/rabbitmq';
import { logger } from '../utils/logger';
import { ErrorMessages } from '../utils/errorMessage';  

const notificationWorker = async () => {
  try {
    const channel = getChannel();
    await channel.assertQueue('notification_queue', { durable: true });

    channel.consume('notification_queue', (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        logger.info(`Processing notification: ${content.message}`);
        channel.ack(msg);
      }
    });

    logger.info('Notification Worker is running...');
  } catch (error) {
  
    logger.error(`Notification worker failed: ${ErrorMessages.NOTIFICATION_ERROR}`);
    throw new Error(ErrorMessages.NOTIFICATION_ERROR);  
  }
};

export { notificationWorker };
