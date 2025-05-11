import { useEffect, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
import Calendar from 'react-calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

function BookingManagement() {
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      memberName: 'John Doe', 
      membershipPlan: 'Premium',
      className: 'Yoga Class',
      date: '2024-01-20',
      status: 'Active',
      email: 'john@example.com',
      phone: '+1234567890'
    },
    { 
      id: 2, 
      memberName: 'Jane Smith',
      membershipPlan: 'Basic',
      className: 'CrossFit',
      date: '2024-01-22',
      status: 'Pending',
      email: 'jane@example.com',
      phone: '+0987654321'
    }
  ]);
  // const [members, setMembers] = useState([]);
  const [editBooking, setEditBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(()=>
  {
    RetrieveMembersData();
  }, [bookingToDelete]);

  async function RetrieveMembersData()
  {
    try
    {
      const response = await axios.get(`${import.meta.env.VITE_BOOKMYFIT_URL_SERVER}/api/adminDashboard/membersData`);
      console.log(response.data);
      setBookings(response.data.combineBookingAndUserData );
    }
    catch(err)
    {
      console.log(err);
    }
  }

  const handleDelete = async(toDeleteSlot) => 
  {
    try
    {
      console.log(toDeleteSlot);
      setBookingToDelete(toDeleteSlot);
      const response = await axios.delete(`${import.meta.env.VITE_BOOKMYFIT_URL_SERVER}/api/adminDashboard/membersData/deleteSlot/${toDeleteSlot}`);
      console.log(response.data.message);
    }
    catch(err)
    {
      console.log(err);
    }
    // setBookingToDelete({booking});
    // setShowDeleteModal(true);
  };

  // const confirmDelete = () => {
  //   setBookings(bookings.filter(booking => booking.id !== bookingToDelete.id));
  //   setShowDeleteModal(false);
  //   setBookingToDelete(null);
  // };

  const handleEdit = (booking) => {
    setEditBooking(booking);
    setShowEditModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setBookings(bookings.map(booking => 
      booking.id === editBooking.id ? editBooking : booking
    ));
    setShowEditModal(false);
  };

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const disabledDates = ({date, view})=>
  {
    if(view !== "month") return false;
    return date < new Date(today.setHours(0,0,0,0)) || date > new Date(tomorrow.setHours(23,59,59,999));
  }

  return (
    <div className="space-y-8">

      <div className="rounded-lg bg-white p-6 shadow-xl m-auto">
        <h2 className="mb-4 text-xl font-bold m-auto">Calendar View</h2>
        <Calendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={bookings.map(booking => ({
            title: `${booking.memberName} - ${booking.className}`,
            date: booking.date,
            className: booking.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
          }))}
          // width="30rem"
          tileDisabled={disabledDates}
          height="35rem"
        />
      </div>

      <div className="rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold">Member Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Member Name</th>
                <th className="p-2 text-left">Membership</th>
                {/* <th className="p-2 text-left">Class</th> */}
                <th className="p-2 text-left">Date</th>
                <th className="p-2 pl-5 text-left">Status</th>
                <th className="p-2 text-left">Contact</th>
                <th className="p-2 pl-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{booking.userName}</td>
                  <td className="p-2">{booking.plan}</td>
                  {/* <td className="p-2">{booking.className}</td> */}
                  <td className="p-2">{new Date(booking.bookingDate).toLocaleDateString().split("T")[0]}</td>
                  <td className="p-2">
                    <span className={`rounded px-2 py-1 text-sm ${
                      booking.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="text-sm">
                      <div>{booking.email}</div>
                      <div>{booking.phoneNo}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <button 
                      onClick={() => handleEdit(booking)}
                      className="mr-2 rounded bg-red px-3 py-1 text-white"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(booking.slotID)}
                      className="rounded bg-gray-300 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Edit Booking</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Member Name</label>
                <input
                  type="text"
                  value={editBooking.memberName}
                  onChange={(e) => setEditBooking({...editBooking, memberName: e.target.value})}
                  className="mt-1 w-full rounded border p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Membership Plan</label>
                <select
                  value={editBooking.membershipPlan}
                  onChange={(e) => setEditBooking({...editBooking, membershipPlan: e.target.value})}
                  className="mt-1 w-full rounded border p-2"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={editBooking.status}
                  onChange={(e) => setEditBooking({...editBooking, status: e.target.value})}
                  className="mt-1 w-full rounded border p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="rounded bg-gray-300 px-4 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-red px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {/* {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete the booking for {bookingToDelete.memberName}?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded bg-gray-300 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded bg-red px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}

      
    </div>
  );
}

export default BookingManagement;