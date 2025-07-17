
import { ErrorMessages } from '../utils/errorMessage';
import { queueService } from '../Notifications /queue.service'; 
import Interview from '../models/admin.Interview';
import Application from '../models/user.Application';
import { User } from '../models/user';

export const interviewService = {
  scheduleInterview: async (applicationId: string, scheduledAt: Date, adminId: string): Promise<any> => {
    const application = await Application.findById(applicationId).populate('user');
    if (!application) throw new Error(ErrorMessages.APPLICATION_NOT_FOUND);
    const user = application.user as unknown as InstanceType<typeof User>;

    const interview = new Interview({
      application: applicationId,
      scheduledAt,
      interviewer: adminId,
    });

    await interview.save();

    // ✅ Push interview notification to RabbitMQ
    await queueService.publish('notificationQueue', {
      type: 'INTERVIEW_SCHEDULED',
      recipient: user.email,
      subject: 'Interview Scheduled',
      body: `Your interview is scheduled for ${scheduledAt.toLocaleString()}`,
      scheduledAt, // Optional: if your consumer handles scheduled delays
    });

    // ✅ Push interview reminder to RabbitMQ
    await queueService.publish('notificationQueue', {
      type: 'INTERVIEW_REMINDER',
      recipient: user.email,
      subject: 'Interview Reminder',
      body: `Reminder: Your interview is on ${scheduledAt.toLocaleString()}`,
      scheduledAt, // Optional delay logic in consumer
    });

    return interview;
  },
};
