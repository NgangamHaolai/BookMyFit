// import UserData from '../models/userModel.js';
// import BookingData from '../models/bookingModel.js';
// import mongoose from 'mongoose';

// const Dashboard = async(req, res)=>
// {

// }

// const DashboardData = async(req, res)=>
// {
//     try
//     {
//         const totalMembers = await UserData.countDocuments();
//         const totalBookings = await BookingData.countDocuments({ status: "Confirmed" });
//         const totalWaitings = await BookingData.countDocuments({ status: "Waiting" });
//         const membersData = await UserData.find();
//         const bookingData = await BookingData.find();

//         // membersData.forEach(e=>
//         // {
//         //     e.expiryDate = new Date(e.expiryDate).toLocaleDateString().split('T')[0];
//         //     e.joinDate = new Date(e.joinDate).toLocaleDateString().split('T')[0];
//         // });
//         // const result = bookingData.map(e=>
//         // {
//         //     bookingData + mem
//         // }
//         // )
//         let Array = [];
//         // console.log('Array:',Array);
  
//         async function combineBookingAndUserData() 
//         {
//           try {
//             // Fetch all booking data
//             const bookingData = await BookingData.find({});
//             // Fetch all user data
//             const userData = await UserData.find({});
        
//             // Combine bookingData and userData
//             const combinedData = bookingData.map((booking) => {
//               // Find the corresponding user
//               const user = userData.find((user) => user._id.toString() === booking.userID.toString());
        
//               // If user exists, merge the data
//               if (user) {
//                 return {
//                   bookingID: booking._id,
//                   userID: booking.userID,
//                   bookingDate: booking.bookingDate,
//                   slot: booking.slot,
//                   status: booking.status,
//                   userName: user.name,
//                   userEmail: user.email,
//                   phoneNo: user.phoneNo,
//                   plan: user.plan,
//                 };
//               }
//               // If no user is found, return only booking data
//               return Array = [ ...booking._doc ];
//             });
//             console.log('Combined Data:', combinedData);
//           } catch (err) {
//             console.error('Error:', err);
//           }
//         }
        
//         console.log("sad",combineBookingAndUserData())
        
//         res.status(200).json({ totalBookings, totalMembers, totalWaitings, membersData, bookingData, combineBookingAndUserData });
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }
// export {Dashboard, DashboardData};

import UserData from '../models/userModel.js';
import BookingData from '../models/bookingModel.js';

const DashboardData = async (req, res) => {
  try {
    // Fetch basic counts and data
    const totalMembers = await UserData.countDocuments();
    const totalBookings = await BookingData.countDocuments({ status: 'Confirmed' });
    const totalWaitings = await BookingData.countDocuments({ status: 'Waiting' });
    const membersData = await UserData.find();
    const bookingData = await BookingData.find();
    
    // Combine bookingData and userData
    const combineBookingAndUserData = bookingData.map((booking) => {
      // Find the corresponding user
      const user = membersData.find((user) => user._id.toString() === booking.userID.toString());

      // If user exists, merge the data
      if (user) {
        return {
          bookingID: booking._id,
          userID: booking.userID,
          joinDate: user.joinDate,
          expiryDate: user.expiryDate,
          slotID: booking.slotID,
          bookingDate: booking.bookingDate,
          slot: booking.slot,
          status: booking.status,
          userName: user.name,
          userEmail: user.email,
          phoneNo: user.phoneNo,
          plan: user.plan,
        };
      }

      // If no user is found, return only booking data
      return {
        bookingID: booking._id,
        userID: booking.userID,
        bookingDate: booking.bookingDate,
        slot: booking.slot,
        status: booking.status,
      };
    });

    // Send the response
    res.status(200).json({
      totalBookings,
      totalMembers,
      totalWaitings,
      membersData,
      bookingData,
      combineBookingAndUserData,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const DeleteSlot = async(req, res)=>
{
    try
    {
        const {slotID} = req.params;
        const findSlotID = await BookingData.find({slotID});
        
        const response = await BookingData.deleteOne({slotID: findSlotID});
        if(!response)
        {
          return res.status(500).json({message: "error"});
        }
        res.status(200).json({message: 'deleted'});
    }
    catch(err)
    {
        console.log(err);
    }
}
export { DashboardData, DeleteSlot };


//review this code because we do not fully understand the functionality of it. Must review it!