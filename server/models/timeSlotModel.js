import mongoose from "mongoose";

const timeSlotSchema = mongoose.Schema({
    slot: { type: String, required: true, unique: true },
    maxBookingCapacity: { type: Number, required: true, default: 10},
    maxWaitingCapacity: { type: Number, required: true, default: 5},
});

export default mongoose.model("SlotData", timeSlotSchema);