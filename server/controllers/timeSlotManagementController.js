import SlotData from "../models/timeSlotModel.js";
import BookingData from '../models/bookingModel.js';

const retrieveTimeSlot = async(req, res)=>
{
    try
    {
        // const retrievedData = await SlotData.find()
        const retrievedData = await SlotData.find().select("slot _id maxBookingCapacity maxWaitingCapacity");

        console.log("Data:",retrievedData);
        res.json(retrievedData);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message: "Internal Server Error!..."});
    }
}
const AddNewSlot = async(req, res)=>
{
    try
    {
        const { slot } = req.body;
        console.log("fdsfds",slot);
        
        if(!slot)
        {
            return res.status(404).json({message: "No slot found!"});
        }

        const slotRegex = /^\d{1,2}:\d{2}\s(?:AM|PM)\s-\s\d{1,2}:\d{2}\s(?:AM|PM)$/;
        if(!slotRegex.test(slot))
        {
            return res.status(400).json({message: "Invalid Slot Format"});
        }
        
        const findSlot = await SlotData.findOne({slot});
        if(findSlot)
        {
            return res.status(409).json({message: "Time Slot already Exists! boii..."});
        }
        // console.log("NewSLot: ",slot)
        const newSlot = new SlotData({ slot });
        // console.log("newSlot: ",newSlot)
        await newSlot.save();

        res.status(201).json({message: "New Slot added successfully!"});
    }
    catch(err)
    {
        if(err.code === 11000)
        {
            return res.status(409).json({error: "Duplicate Time Slot already exists!"});
        }
        if(err.name === "TokenExpiredError")
        {
            return res.status(400).json({message: "Token Expired!...redirecting.."});
        }
        res.status(500).json({error: "Internal Server Error!..."});
        console.log(err);
    }
}
const DeleteSlot = async(req, res)=>
{
    try
    {
        const { slotId } = req.params;
        
        const deleteSlot = await SlotData.findByIdAndDelete( slotId );

        if(!deleteSlot)
        {
            return res.status(404).json({message: "Could Not find Time Slot!"});
        }
        res.status(200).json({message: "Slot removed successfully!"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message: "Internal Server Error!..."});
    }
}
const updateMaxCapacity = async (req, res)=>
{
    try
    {
        const { maxBooking, maxWaiting } = req.body;
        console.log(maxBooking, maxWaiting);
        
        await SlotData.updateMany({}, { $set: { maxBookingCapacity: maxBooking, maxWaitingCapacity: maxWaiting } });
        
        res.status(200).json({message: "Max Capacity Updated!..."});
    }
    catch(err)
    {
        res.status(500).json({message: "Internal Server Error!..."});
    }
}
export {AddNewSlot, DeleteSlot, updateMaxCapacity, retrieveTimeSlot};