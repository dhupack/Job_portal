import Report from '../models/superadmin.Report';
import {User }from '../models/user';
import Job from '../models/admin.Job';
import Application from '../models/user.Application';

export const reportService = {
  generateUserActivityReport: async (superAdminId: string): Promise<any> => {
    const userCount = await User.countDocuments();
    const report = new Report({
      title: 'User Activity Report',
      type: 'user_activity',
      data: { userCount, timestamp: new Date() },
      generatedBy: superAdminId,
    });
    await report.save();
    return report;
  },

  generateJobActivityReport: async (superAdminId: string): Promise<any> => {
    const jobCount = await Job.countDocuments();
    const report = new Report({
      title: 'Job Activity Report',
      type: 'job_activity',
      data: { jobCount, timestamp: new Date() },
      generatedBy: superAdminId,
    });
    await report.save();
    return report;
  },

  generateApplicationStatsReport: async (superAdminId: string): Promise<any> => {
    const applicationCount = await Application.countDocuments();
    const report = new Report({
      title: 'Application Stats Report',
      type: 'application_stats',
      data: { applicationCount, timestamp: new Date() },
      generatedBy: superAdminId,
    });
    await report.save();
    return report;
  },
};