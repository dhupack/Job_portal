import { getChannel } from '../config/rabbitmq';
import { logger } from '../utils/logger';
import { ErrorMessages } from '../utils/errorMessage';  

const emailWorker = async () => {
  try {
    const channel = getChannel();
    await channel.assertQueue('service_queue', { durable: true });

    channel.consume('service_queue', (msg) => {
      if (msg) {
        const { subject, recipient, body } = JSON.parse(msg.content.toString());
        logger.info(`Processing email to: ${recipient} with subject: ${subject}`);
        channel.ack(msg);
      }
    });

    logger.info('Email Worker is running...');
  } catch (error) {
   
    logger.error(`Email worker failed: ${ErrorMessages.NOTIFICATION_ERROR}`);
    throw new Error(ErrorMessages.NOTIFICATION_ERROR);  
  }
};

export { emailWorker };
