
import { Express } from 'express';
import { logger } from './utils/logger';
import app from './app';
import { connectDB } from './config/database';
import { connectRabbitMQ } from './config/rabbitmq';
import { connectRedis } from './config/redis';
import { setupSwagger } from './config/swagger';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    console.log(`Connecting to: "${process.env.MONGO_URI}"`);
    await connectDB();
    console.log('hey');
  
    await connectRabbitMQ();
   
    await connectRedis();
   

    setupSwagger(app as Express);

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();