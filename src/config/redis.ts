import { createClient } from 'redis';
import { logger } from '../utils/logger';

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    logger.info('Connected to Redis');
  } catch (error: any) {
    logger.error(`Failed to connect to Redis: ${error.message}`);
    throw error;
  }
};

redisClient.on('error', (err) => logger.error(`Redis Client Error: ${err}`));

export default redisClient;