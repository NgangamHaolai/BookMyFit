import mongoose from "mongoose";
import BookingData from "../models/bookingModel.js";
import SlotData from "../models/timeSlotModel.js";

const CheckAvailability = async(req, res)=>
{
    try
    {
        const findMaxData = await SlotData.find().select("maxBookingCapacity maxWaitingCapacity");
        const maxBook = findMaxData[0].maxBookingCapacity;
        const maxWait = findMaxData[0].maxWaitingCapacity;
        
        let { date, slotID, slot } = req.query; // wonder why we're using query?
        let [ day, month, year ] = date.split("/").map(Number);
        const Date_UTC = new Date(Date.UTC(year, month - 1, day));
        // const formattedSlotID = new mongoose.Types.ObjectId(slotID);
        
        let waitingListCount = await BookingData.countDocuments({
            bookingDate: Date_UTC, slotID: slotID, status: "Waiting"
        });

        let confirmedBookingsCount = await BookingData.countDocuments({
            bookingDate: Date_UTC, slotID: slotID, status: "Confirmed"
        });
        // const bookingCounts = await BookingData.aggregate(
        // [
        //     { 
        //         $match: 
        //         { 
        //             bookingDate: formattedDate, slotID: formattedSlotID
        //         }
        //     },
        //     { 
        //         $group: { 
        //             _id: "$status", 
        //             count: { $sum: 1 } 
        //         } 
        //     },
            // {
            //     $project:
            //     {
            //         status: 1,
            //         slotID: 1,
            //         slot: 1,
            //         bookingDate: 1,      
            //     }
            // }
        // ]);
        // const confirmedBookingsCount = bookingCounts.find((e)=>e._id === "Confirmed")?.count || 0;
        // const waitingListCount = bookingCounts.find((e)=>e._id === "Waiting")?.count || 0;
        
        let status = "";
        if(confirmedBookingsCount >= maxBook)
        {
            status = waitingListCount >= maxWait ? "Full" : "Waiting available";
        }
        else
        {
            status = "Booking available";
        }
        res.status(200).json({message: `Status: ${status}`, status});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Internal Server Error!"});
    }
}

export default CheckAvailability;