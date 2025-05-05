import express from 'express';
import AdminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';
import { DashboardData, DeleteSlot } from '../controllers/adminDashboardController.js';

const router = express.Router();

// router.get('/dashboard', AdminAuthMiddleware, Dashboard);
router.get('/adminDashboard/membersData', DashboardData);
router.delete('/adminDashboard/membersData/deleteSlot/:slotID', DeleteSlot);

export default router;