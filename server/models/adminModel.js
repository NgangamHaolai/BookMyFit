import mongoose from "mongoose";

const AdminModel = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin','superAdmin'], default: "admin"},
});

export default mongoose.model("AdminData", AdminModel);