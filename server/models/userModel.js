import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNo: {type: Number, required: true},
    plan: {type: String, required: true, default: "Basic"},
    status: {type: String, default: "Active"},
    joinDate: {type: Date, default: Date.now()},
    expiryDate: {type: Date, default: ()=>
                            {
                                let date = new Date();
                                date.setMonth(date.getMonth() + 1);
                                return date;
                            }
     },
    role: {type: String, enum: ['member'], default: "member"},
    permissionID: {type: mongoose.Schema.Types.ObjectId, ref: "PermissionData"},
    permission: {type: String, required: true},
});

export default mongoose.model("UserData", userSchema);