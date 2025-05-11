import mongoose from 'mongoose';
import BookingData from '../models/bookingModel.js';
import SlotData from "../models/timeSlotModel.js";

const Booking = async(req, res)=>
{   
    try
    {
        const { slotID, slot, bookingDate } = req.body;
        const userID = req.user.id; // Extracted from the JWT token

        let waitingListNo = null;
        let status = "Confirmed";
        console.log("*************",slotID, slot, bookingDate);
        let [ day, month, year ] = bookingDate.split("/").map(Number); // split and convert to Number
        const dateUTC = new Date(Date.UTC(year, month - 1, day));
        // const dateUTC = new Date();
        // console.log(dateUTC)

        const findMaxData = await SlotData.find().select("maxBookingCapacity maxWaitingCapacity");
        const maxBook = findMaxData[0].maxBookingCapacity;
        const maxWait = findMaxData[0].maxWaitingCapacity;
        // console.log("MaxBook: ",maxBook);
        // console.log("MaxWait: ", maxWait);
        
        const findUser = await BookingData.findOne({ userID, slotID, bookingDate: dateUTC })
        if(findUser)
        {
            return res.status(409).json({message: "Already booked a slot. Only 1 booking allowed per person."});
        }
        //waiting
        const totalWaitingListCount = await BookingData.countDocuments({
            bookingDate: dateUTC, slotID, status: "Waiting"
        });
        // console.log("Waiting:", totalWaitingListCount);
        
        if(totalWaitingListCount >= maxWait)
        {
            return res.status(400).json({ message: "Waiting list full. Please wait or try a different Slot."});
        }
        //confirm
        const totalConfirmedBookings = await BookingData.countDocuments({
            bookingDate: dateUTC, slotID, status: "Confirmed"
        });
        // console.log("Booked:", totalConfirmedBookings);
        
        if(totalConfirmedBookings >= maxBook)
        {
            status = "Waiting";
            // waitingListNo = totalConfirmedBookings - 10 + 1 + totalWaitingListCount;
            waitingListNo = totalWaitingListCount + 1;
            // return res.status(401).json({message: "Slot Full...Added to Waiting List"});
        }
        // console.log("status: ",status);
        // console.log("********************",userID,bookingDate, slot, bookingStatus, waitingListNo);
        // const expiresAt = new Date(Date.now() + 60 * 1000 * 24 );
        console.log("bookingDate", bookingDate);
        
        const expiresAt = new Date(Date.now() + 60 * 1000 * 24 );

        const newBooking = new BookingData({ userID, bookingDate: dateUTC, slotID, slot, status, waitingListNo, expiresIn: expiresAt});
        // console.log("New_________________",newBooking);
        await newBooking.save();

        if(status === "Waiting")
        {
            return res.status(201).json({message: "Added to waiting List."});
        }
        res.status(201).json({message: "Booking Succesful!"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message: "Internal server error!"});
    }
}

const RetrieveTimeSlots = async(req, res)=>
{
    try 
    {
        const result = await SlotData.find().select("_id slot");
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log("Error Eroror!");
        res.status(500).json({message: "Some error was encountered!"});
    }
}

const RetrieveBookedSlots = async(req, res)=>
{
    try
    {
        const userID = req.user.id;
        const { date } = req.body;
        // console.log(date);
        let [ day, month, year ] = date.split("/").map(Number);
        const dateUTC = new Date(Date.UTC(year, month-1, day));
        // console.log(dateUTC);
        const result = await BookingData.find({ userID, bookingDate: dateUTC, status: "Confirmed" });
        console.log("BookedSlots:",result);
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({ message: "Server error" });
    }
}

const RetrieveWaitingSlots = async(req, res)=>
{
    try
    {
        const id = req.user.id;
        const { date } = req.body;
        console.log("date",date);
        
        const [ day, month, year ] = date.split('/').map(Number);
        const dateUTC = new Date(Date.UTC(year, month-1, day));
        console.log(dateUTC);
        
        const result = await BookingData.find({ userID: id, bookingDate: dateUTC, status: "Waiting" });
        console.log("WaitingSlots:",result);
        res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}
const DeleteBookedSlot = async(req, res)=>
{
    try
    {
        const id = req.user.id;
        
        let { date, slotID } = req.body;
        let [ day, month, year ] = date.split("/").map(Number);
        const dateUTC = new Date(Date.UTC( year, month-1, day ));

        await BookingData.deleteOne({ slotID, userID: id, bookingDate: dateUTC, status: "Confirmed" });

        const findIDtoReschedule = await BookingData.find({slotID: slotID, status: "Waiting"});
        console.log("Slots", findIDtoReschedule);

        const findSlotToReschedule = await BookingData.findOneAndUpdate({slotID: slotId, status: "Waiting"}, { status: "Confirmed"})
        findSlotToReschedule.save();

        res.status(200).json({message: "Booked slot Deleted."})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}
const DeleteWaitingSlot = async(req, res)=>
{
    try
    {
        const id = req.user.id;
        
        const { date, slotID } = req.body;
        const [ day, month, year ] = date.split("/").map(Number);
        const dateUTC = new Date(Date.UTC(year, month-1, day));
        console.log(slotID, id, dateUTC)
        await BookingData.deleteOne({ slotID, userID: id, bookingDate: dateUTC, status: "Waiting" });
        res.status(200).json({message: "Waiting slot deleted"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}

const ReScheduleSlots = async(req, res)=>
{
    try
    {
        const { date } = req.body;
        
        let [ day, month, year ] = date.split('/').map(Number);
        const dateUTC = new Date(Date.UTC(year, month-1, day));
        // console.log(day, month, year); 
        // console.log(dateUTC);
        const bookingsCount = await BookingData.countDocuments({ bookingDate: dateUTC, status: "Confirmed" });
        const findMax = await SlotData.findOne().select("maxBookingCapacity");
        const maxBookingLimit = findMax.maxBookingCapacity;
        await BookingData.find({ bookingDate: dateUTC, status: "Confirmed" }).select("createdAt").sort({createdAt: 1});
        console.log("bookingCount",bookingsCount);
        // const sortBookings = waitings.sort((a,b)=>
        // {
        //     a.createdAt - b.createdAt;
        // });
        if(bookingsCount < maxBookingLimit )
        {
            await BookingData.findOneAndUpdate({ bookingDate: dateUTC, status: "Waiting" }, { $set: {status: "Confirmed"}});
        }
        res.status(200).json({message: "rescheduled"});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
}

export { Booking, RetrieveTimeSlots, RetrieveBookedSlots, RetrieveWaitingSlots, DeleteBookedSlot, DeleteWaitingSlot, ReScheduleSlots };