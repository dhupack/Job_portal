import dotenv from 'dotenv';
 dotenv.config();
 export const ENV ={
	
	PORT: process.env.PORT || 5000,
	MONGO_URI: process.env.DB_URI || '',
	// REDIS_URL: process.env.REDIS_HOST || '',
	REDIS_HOST: process.env.REDIS_HOST || 'localhost',
	REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
	RABBITMQ_URL: process.env.RABBITMQ_HOST || '',
	JWT_SECRET: process.env.JWT_SECRET || 'supersecret',
	NODE_ENV: process.env.NODE_ENV || 'development',
	MAIL_USER: process.env.MAIL_USER || '',
	MAIL_PASSWORD: process.env.MAIL_PASSWORD || '',
	QUEUE_NAME: process.env.QUEUE_NAME || 'job-portal_queue',


 };