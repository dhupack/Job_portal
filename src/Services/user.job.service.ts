
import { ErrorMessages  } from '../utils/errorMessage';
import { cacheService } from '/home/user/job_PORTAL/src/queueservices/cache.service';
import { queueService } from '/home/user/job_PORTAL/src/Notifications /queue.service';
import Job from '/home/user/job_PORTAL/src/models/admin.Job';
import Application from '../models/user.Application';
import Resume from '../models/user.Resume';
import {User} from '../models/user';
import { emailService } from '/home/user/job_PORTAL/src/Notifications /emailService';

export const jobService = {
  getJobs: async (): Promise<any[]> => {
    const cachedJobs = await cacheService.get('jobs');
    if (cachedJobs) return JSON.parse(cachedJobs);
    const jobs = await Job.find().lean();
    await cacheService.set('jobs', JSON.stringify(jobs), 3600);
    return jobs;
  },

  applyJob: async (userId: string, jobId: string, resumeId: string): Promise<void> => {
    const job = await Job.findById(jobId);
    if (!job) throw new Error(ErrorMessages.JOB_NOT_FOUND);
    const resume = await Resume.findById(resumeId);
    if (!resume || resume.user.toString() !== userId) throw new Error(ErrorMessages.INVALID_RESUME);
    const application = new Application({ user: userId, job: jobId, resume: resumeId });
    await application.save();
    const user = await User.findById(userId);
    if (!user) throw new Error(ErrorMessages.USER_NOT_FOUND);
    await emailService.sendEmailToQueue({
      // user.email,
      // 'Job Application Submitted',
      // `You have applied for ${job.title}`
      recipient: user.email,
      subject: 'Job Application Submitted',
      body: `You have applied for ${job.title}`,
    });
  },
};
