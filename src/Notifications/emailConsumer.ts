import {queueService} from  '../Notifications /queue.service';

import { logger } from '../utils/logger';

export const startEmailConsumer = async(): Promise<void>=>{
	await queueService.consume('email_queue',(msg :string) =>{
		const {email , subject,message} = JSON.parse(msg);
		logger.info(`sending email to ${email} : ${subject} - ${message}`);


	});
};