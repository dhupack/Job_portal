import { getChannel } from '../config/rabbitmq';
import { logger } from '../utils/logger';
import { ErrorMessages } from '../utils/errorMessage';
import { Channel } from 'amqplib';

export const queueService = {
  publish: async (queueName: string, message: Record<string, any>) => {
    try {
      const channel = getChannel();
      if (!channel) throw new Error(ErrorMessages.RABBITMQ_CONNECTION_FAILED);

      await channel.assertQueue(queueName, { durable: true });
      const buffer = Buffer.from(JSON.stringify(message));

      channel.sendToQueue(queueName, buffer, {
        persistent: true,
      });

      logger.info(` Sent message to queue: ${queueName}`);
    } catch (error) {
      logger.error(`Error sending message to ${queueName}: ${error}`);
      throw new Error(ErrorMessages.QUEUE_SEND_ERROR);
    }
  },

  consume: async (queueName: string, callback: (msg: string) => void) => {
    try {
      const channel = getChannel();
      if (!channel) throw new Error(ErrorMessages.RABBITMQ_CONNECTION_FAILED);

      await channel.assertQueue(queueName, { durable: true });

      await channel.consume(
        queueName,
        (msg) => {
          if (msg !== null) {
            try {
              callback(msg.content.toString());
              // console.log(msg.content.toString());
              channel.ack(msg);
            } catch (error) {
              logger.error(`Error processing message from ${queueName}: ${error}`);
              channel.nack(msg, false, true);
            }
          }
        },
        { noAck: false }
      );

      logger.info(` Started consuming from queue: ${queueName}`);
    } catch (error) {
      logger.error(`Error consuming from ${queueName}: ${error}`);
      throw new Error(ErrorMessages.QUEUE_CONSUME_ERROR);
    }
  },
};