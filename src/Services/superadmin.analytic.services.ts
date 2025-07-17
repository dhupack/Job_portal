import { cacheService } from '/home/user/job_PORTAL/src/queueservices/cache.service';
import {User }from '../models/user';
import Admin from '../models/Admin';
import Job from '../models/admin.Job';
import Application from '../models/user.Application';

export const analyticsService = {
  getAnalytics: async (): Promise<any> => {
    const cachedAnalytics = await cacheService.get('analytics');
    if (cachedAnalytics) return JSON.parse(cachedAnalytics);

    const userCount = await User.countDocuments();
    const adminCount = await Admin.countDocuments();
    const jobCount = await Job.countDocuments();
    const applicationCount = await Application.countDocuments();
    const analytics = { userCount, adminCount, jobCount, applicationCount };

    await cacheService.set('analytics', JSON.stringify(analytics), 3600);
    return analytics;
  },
};