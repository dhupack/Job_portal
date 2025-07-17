// import { HTTP_CODES } from '../../../utils/httpCodes';
import { ErrorMessages  } from '../utils/errorMessage';
import { cacheService } from '/home/user/job_PORTAL/src/queueservices/cache.service';
import Job from '../models/admin.Job';

export const jobService = {
  listAllJobs: async (): Promise<any[]> => {
    const cachedJobs = await cacheService.get('all_jobs');
    if (cachedJobs) return JSON.parse(cachedJobs);
    const jobs = await Job.find().populate('createdBy').lean();
    await cacheService.set('all_jobs', JSON.stringify(jobs), 3600);
    return jobs;
  },

  deleteJob: async (jobId: string): Promise<void> => {
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) throw new Error(ErrorMessages.JOB_NOT_FOUND);
    await cacheService.del('all_jobs');
    await cacheService.del('jobs');
  },
};