
import amqp from 'amqplib';
import { logger } from '../utils/logger';

import { ErrorMessages } from '../utils/errorMessage';

let channel: amqp.Channel | null = null;
const QUEUE_NAMES = (process.env.QUEUE_NAME || '').split(',');

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    const rabbitMQUrl = process.env.RABBITMQ_URL;
    if (!rabbitMQUrl) {
      throw new Error('RABBITMQ_URL is not defined in environment variables');
    }

    const connection = await amqp.connect(rabbitMQUrl);
    channel = await connection.createChannel();

    for (const queueName of QUEUE_NAMES) {
      await channel.assertQueue(queueName.trim(), { durable: true });
    }

    logger.info('Connected to RabbitMQ');
  } catch (error: any) {
    logger.error(`RabbitMQ connection error: ${error.message}`);
    throw new Error(error.message || ErrorMessages.RABBITMQ_CONNECTION_FAILED);
  }
};

export const getChannel = (): amqp.Channel => {
  if (!channel) {
    throw new Error(ErrorMessages.RABBITMQ_CONNECTION_FAILED);
  }
  return channel;
};
