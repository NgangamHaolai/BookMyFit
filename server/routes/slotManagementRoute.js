import express from 'express';
import { AddNewSlot, DeleteSlot, updateMaxCapacity, retrieveTimeSlot } from '../controllers/timeSlotManagementController.js';
import AdminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';
const router = express.Router();

router.delete("/timeSlot/:slotId", AdminAuthMiddleware, DeleteSlot);
router.post("/timeSlot/addNewSlot", AdminAuthMiddleware, AddNewSlot);
router.put("/timeSlot", updateMaxCapacity);
router.get("/timeSlot", retrieveTimeSlot);

export default router;