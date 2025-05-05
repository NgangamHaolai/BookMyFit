import express from 'express';
import AdminPasswordReset from '../controllers/adminPasswordResetController.js';
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';

const router = express.Router();

router.post('/resetAdminPassword', adminAuthMiddleware, AdminPasswordReset);

export default router;