import { queueService } from "../Notifications /queue.service";
import { logger } from "../utils/logger";

export const startInterviewScheduler = async() :Promise<void> =>{
	await queueService.consume('scheduler_queue',(msg)=>{
		const{email,subject,message,scheduledAt} = JSON.parse(msg);
		logger.info(`Scheduling reminder for ${email}: ${subject} - ${message} at ${new Date(scheduledAt).toLocaleString()}`);
	});
};