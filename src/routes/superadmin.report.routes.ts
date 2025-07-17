import { Router } from 'express';
import { generateUserActivityReport, generateJobActivityReport, generateApplicationStatsReport } from '../controllers/superadmin.report.controller';
import { superAdminAuth } from '../middleware/superAdminAuth';

const router = Router();

router.post('/user-activity', superAdminAuth, generateUserActivityReport);
router.post('/job-activity', superAdminAuth, generateJobActivityReport);
router.post('/application-stats', superAdminAuth, generateApplicationStatsReport);

export default router;