import mongoose  from "mongoose";
import {ENV} from './env';
import {logger} from '../utils/logger';

export const connectDB = async() :Promise<void>=>{
try {
	console.log(ENV.MONGO_URI)
	await mongoose.connect(ENV.MONGO_URI);
	logger.info('Mongodb connected Succesfully ');
}
catch(error:any){
	logger.error(`MongoDB connection error : ${error}`);
	process.exit(1);
}
};