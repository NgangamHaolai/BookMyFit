import express from 'express';
import LoginAdmin from "../controllers/adminController.js";
import {AddNewAdmin} from "../controllers/adminController.js";
import AdminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';

const router = express.Router();

router.post('/addNewAdmin', AdminAuthMiddleware, AddNewAdmin);
router.post('/adminLogin', LoginAdmin);

export default router;