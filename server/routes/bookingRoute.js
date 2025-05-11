import express from 'express';
import { Booking, RetrieveTimeSlots, RetrieveBookedSlots, RetrieveWaitingSlots, DeleteBookedSlot, DeleteWaitingSlot, ReScheduleSlots } from "../controllers/bookingController.js";
import MemberAuthMiddleware from '../middlewares/authMiddleware.js';
import CheckAvailability from "../controllers/checkAvailabilityController.js";
const router = express.Router();

router.get('/booking/availability', CheckAvailability);
router.post("/booking", MemberAuthMiddleware, Booking);
router.get("/booking/retrieveTimeSlots", RetrieveTimeSlots);
router.post("/booking/retrieveBookedSlots", MemberAuthMiddleware, RetrieveBookedSlots);
router.post("/booking/retrieveWaitingSlots", MemberAuthMiddleware, RetrieveWaitingSlots);
router.post("/booking/deleteBookedSlot", MemberAuthMiddleware, DeleteBookedSlot);
router.post("/booking/deleteWaitingSlot", MemberAuthMiddleware, DeleteWaitingSlot);
router.post("/booking/reScheduleSlots", ReScheduleSlots);

export default router;