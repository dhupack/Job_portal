import { Router } from 'express';
import { getAnalytics } from '../controllers/superadmin.analytics.controller';
import { superAdminAuth } from '../middleware/superAdminAuth';

const router = Router();

router.get('/', superAdminAuth, getAnalytics);

export default router;