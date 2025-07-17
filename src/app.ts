
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import userAuthRoutes from '/home/user/job_PORTAL/src/routes/user.auth.routes';
import userJobRoutes from '/home/user/job_PORTAL/src/routes/user.job.routes';
import userResumeRoutes from '/home/user/job_PORTAL/src/routes/user.resume.routes';
import adminAuthRoutes from '/home/user/job_PORTAL/src/routes/admin.auth.routes';
import adminJobRoutes from '/home/user/job_PORTAL/src/routes/admin.job.routes';
import adminInterviewRoutes from '/home/user/job_PORTAL/src/routes/admin.interview.routes';
import superAdminUserRoutes from '/home/user/job_PORTAL/src/routes/user.routes';
import superAdminAdminRoutes from './routes/superadmin.routes';
import superAdminJobRoutes from '/home/user/job_PORTAL/src/routes/superadmin.job.routes';
import superAdminAnalyticsRoutes from '/home/user/job_PORTAL/src/routes/superadmin.report.routes';
import superAdminReportRoutes from '/home/user/job_PORTAL/src/routes/superadmin.report.routes';
import superAdminAuthRoutes from './routes/superadmin.routes';
import emailRoutes from '/home/user/job_PORTAL/src/routes/email.routes';
import notificationRoutes from './routes/notification.routes'; 
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// Routes
app.use('/api/user/auth', userAuthRoutes);
app.use('/api/user/jobs', userJobRoutes);
app.use('/api/user/resume', userResumeRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/jobs', adminJobRoutes);
app.use('/api/admin/interviews', adminInterviewRoutes);
app.use('/api/superadmin/users', superAdminUserRoutes);
app.use('/api/superadmin/admins', superAdminAdminRoutes);
app.use('/api/superadmin/jobs', superAdminJobRoutes);
app.use('/api/superadmin/analytics', superAdminAnalyticsRoutes);
app.use('/api/superadmin/reports', superAdminReportRoutes);
app.use('/api/superadmin/auth', superAdminAuthRoutes);
app.use('/api/emails', emailRoutes); 
app.use('/api/notifications', notificationRoutes); 

//swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handler
app.use(errorHandler);

export default app;