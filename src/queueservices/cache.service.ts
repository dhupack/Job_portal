import redisClient from '../config/redis';
import { logger } from '../utils/logger';

export const cacheService = {
  get: async (key: string): Promise<string | null> => {
    try {
      return await redisClient.get(key);
    } catch (error: any) {
      logger.error(`Cache get error: ${error.message}`);
      return null;
    }
  },

  set: async (key: string, value: string, ttl: number): Promise<void> => {
    try {
      await redisClient.setEx(key, ttl, value);
    } catch (error: any) {
      logger.error(`Cache set error: ${error.message}`);
    }
  },

  del: async (key: string): Promise<void> => {
    try {
      await redisClient.del(key);
    } catch (error: any) {
      logger.error(`Cache delete error: ${error.message}`);
    }
  },
};
