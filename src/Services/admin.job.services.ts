
import { ErrorMessages  } from '../utils/errorMessage';
import { cacheService } from '/home/user/job_PORTAL/src/queueservices/cache.service';
import Job from '../models/admin.Job';

interface JobData {
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship';
  createdBy: string;
}

export const jobService = {
  createJob: async (data: JobData): Promise<any> => {
    const job = new Job(data);
    await job.save();
    await cacheService.del('jobs');
    return job;
  },

  listJobs: async (adminId: string): Promise<any[]> => {
    return Job.find({ createdBy: adminId }).lean();
  },
};