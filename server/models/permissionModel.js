import mongoose from "mongoose";

const PermissionModel = new mongooose.Schema({
    permission: { type: String, enum: ["Basic", "Advanced"], required: true },
    description: { type: String, enum: ["Booking Slots", "View Schedules", "Allow Cancellation", "Invite a friend" ]},
});

export default mongoose.model("PermissionData", PermissionModel);