import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "UserData"},
    createdAt: { type: Date, default: Date.now },
    bookingDate: { type: Date, default: null },
    slotID: { type: mongoose.Schema.Types.ObjectId, ref: "SlotData"},
    slot: { type: String, required: true },
    status: { type: String, enum: ["Confirmed", "Waiting", "Cancelled"], default: "Confirmed"},
    waitingListNo: { type: Number, default: null },
    expiresIn: { type: Date
        // , default: ()=> new Date(), expires: 60 * 2 
    },
});

export default mongoose.model("BookingData", BookingSchema);

// in mongoose .pre() is a middleware (hook) that runs before a specified action like .save() or .deleteOne()
// BookingSchema.pre('save', async function availableSlot(next) 
// {                   // this refers to the current document
//     const totalSlotsBooked = await this.constructor.countDocuments({
//         bookingDate: this.bookingDate,  
//         slot: this.slot,
//         bookingStatus: "Confirmed",
//     });

//     const totalWaitingList = await this.constructor.countDocuments({
//         bookingDate: this.bookingDate,
//         bookingStatus: "Waiting",
//         slot: this.slot,
//     });
//     if(totalWaitingList >= 5)
//     {
//         const error = new Error("Waiting list is full. Please try a different slot or date.");
//         return next(error);
//     }

//     if(totalSlotsBooked >= this.maxBookingLimit)
//     {
//         this.bookingStatus = "Waiting";
//         this.waitingListNo = totalBookedSlots - this.maxBookingLimit + 1 + totalWaitingList;
//     }
//     next();
// });