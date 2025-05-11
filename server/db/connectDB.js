import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async()=>
{
    try
    {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to Database successfully.");
    }
    catch(err)
    {
        console.log("Error! connection to database failed!", err);
    }
}
export default connectDB;