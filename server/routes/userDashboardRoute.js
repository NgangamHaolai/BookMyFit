import express from 'express';

import { DashboardData } from '../controllers/userDashBoardController.js';

const router = express.Router();

router.get("/userDasboard", DashboardData);

export default router;