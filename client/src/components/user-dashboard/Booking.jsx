import { useState, useEffect } from 'react';
import { FiClock, FiAlertCircle } from 'react-icons/fi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Booking() 
{
  const [ selectedDate, setSelectedDate ] = useState(new Date());
  const [ sortedSlots, setSortedSlots ] = useState([]);
  const [ availability, setAvailability ] = useState(" ");
  const [ selectedSlot, setSelectedSlot ] = useState(" ");

  const [ bookedSlots, setBookedSlots ] = useState([]);
  const [ waitingSlots, setWaitingSlots ] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>
  {
    async function retrieveSlots()
    {
        try
        {
            const response = await axios.get("http://localhost:3000/api/booking/retrieveTimeSlots");
            const slotsRetrieved = response.data;
            // console.log(selectedDate);
            console.log("RetrievedSlots:",slotsRetrieved);
            
            sortSlots(slotsRetrieved);
        }
        catch(err)
        {
            console.log(err);
        }
    }
      retrieveSlots();
  }, []) //thought it'd be setDate ?

  useEffect(()=>
  {
      retrieveBookedSlots(selectedDate);
  }, [selectedDate]);

  useEffect(()=>
  {
      retrieveWaitingSlots(selectedDate);
  }, [selectedDate]);

  useEffect(()=>
  {
      reScheduleSlots();
  }, []);

  function sortSlots(retrievedSlots)
  {
      retrievedSlots.sort((a, b)=>
      {
          function sortingSlots(data)
          {
              let [ hr, min, period ] = data.split(/[:\s]/);
              let hour = parseInt(hr);
              let minute = parseInt(min);
              if (period === "AM" && hour === 12) hour = 0;
              if (period === "PM" && hour !== 12) hour += 12;
              let totalMinutes = hour * 60 + minute;
              return totalMinutes;
          }
          return sortingSlots(a.slot) - sortingSlots(b.slot);
      });
      setSortedSlots(retrievedSlots);
  }

  async function checkAvailability({slotID, slot})
  {
      // reScheduleSlots();
      try
      {                                                                                 // selectedDate.toISOString().split("T")[0] // not suitable for local-time-zone
          const response = await axios.get(`http://localhost:3000/api/booking/availability?date=${selectedDate.toLocaleDateString()}&slotID=${slotID}&slot=${slot}`);
          setAvailability(response.data.status);
      }
      catch(err)
      {
          console.log(err);
      }
  }

  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  function disableDates({date, view})
  {
      if(view !== "month") return false;

      return date < new Date(today.setHours(0,0,0,0)) || date > new Date(tomorrow.setHours(23,59,59,999));
  }

  function handleSlotSelection(id, slot)
  {
      setSelectedSlot(null);  //to prevent visual glitch
      setAvailability(" ");   // to prevent visual glitch

      setSelectedSlot({slotID: id, slot: slot});
      // console.log("HandleSlotSelection ID", slot, id);
      checkAvailability({slotID: id, slot: slot});
  }

  async function handleBooking() 
  {
      // console.log(selectedSlot);
      if(!selectedSlot)    
      {
          alert("No slot has been selected. please select a slot before proceeding.");
          return;
      }
      try
      {
          const token = localStorage.getItem('userToken');
          if(!token)
          {
              return alert("No UserToken found!");
          }
          // console.log("selectdSlot:", selectedSlot);
          // console.log("SelectedDate:", selectedDate.toISOString().split("T")[0]);
          const response = await axios.post(`http://localhost:3000/api/Booking`,
                          { slotID: selectedSlot.slotID, slot: selectedSlot.slot, bookingDate: selectedDate.toLocaleDateString() },
                          { headers: {'Authorization' : `Bearer ${token}`} });
          // alert(response.data.message);
      }
      catch(err)
      {
          if(err.response.status === 400)
          {
              return alert(err.response.data.message);
          }
          if(err.response.status === 401)
          {
              alert(err.response.data.message);
              return navigate("/login");
          }
          if(err.response.status === 409)
          {
              return alert(err.response.data.message);
          }
          console.log(err);
          alert("‼️Booking Failed!‼️");
      }
      retrieveBookedSlots(selectedDate);
      retrieveWaitingSlots(selectedDate);
  }

  function handleDate(date) // "date" automatically passed by react-calendar as parameter
  {
      console.log(date)
      setSelectedDate(date)
      retrieveBookedSlots(date);
      retrieveWaitingSlots(date);
      reScheduleSlots();
  }

  async function retrieveBookedSlots(date)
  {
      const token = localStorage.getItem('userToken');
      try
      {
          const response = await axios.post("http://localhost:3000/api/booking/retrieveBookedSlots",
              { date: date.toLocaleDateString() },
              { headers: { "Authorization" : `Bearer ${token}` }});
          console.log("Ret Slot",response.data);
          setBookedSlots(response.data);
      }
      catch(err)
      {
          console.log(err);
      }
  }
  
  async function retrieveWaitingSlots(date)
  {
      try
      {
          const token = localStorage.getItem('userToken');
          const response = await axios.post("http://localhost:3000/api/booking/retrieveWaitingSlots",
              { date: date.toLocaleDateString() },
              { headers: { 'Authorization' : `Bearer ${token}`} } );
          console.log("Ret Wait Slots",response.data);
          setWaitingSlots(response.data);
      }
      catch(err)
      {
          console.log(err);
      }
  }

  async function handleDeleteSlot(e)
  {
      // e.preventDefault();
      const slotToDelete = e.target.value;
      const token = localStorage.getItem('userToken');
      try
      {
          const response = await axios.post(`http://localhost:3000/api/booking/deleteBookedSlot/`,
              { date: selectedDate.toLocaleDateString(), slotID: slotToDelete },
              { headers: {"Authorization" : `Bearer ${token}`} }
          );
          console.log(response.data);
      }
      catch(err)
      {
          console.log(err);
      }
      retrieveBookedSlots(selectedDate);
  }

  async function handleWaitDeleteSlot(e)
  {
      const slotToDelete = e.target.value;
      const token = localStorage.getItem('userToken');
      try
      {
          const response = await axios.post('http://localhost:3000/api/booking/deleteWaitingSlot',
              { date: selectedDate.toLocaleDateString(), slotID: slotToDelete },
              { headers: {"Authorization" : `Bearer ${token}`} }
          );
          console.log(response.data);
          
      }
      catch(err)
      {
          console.log(err);
      }
      retrieveWaitingSlots(selectedDate);
  }

  async function reScheduleSlots()
  {
      try
      {
          const token = localStorage.getItem('userToken');
          const response = await axios.post("http://localhost:3000/api/booking/reScheduleSlots",
              { date: selectedDate.toLocaleDateString() },
              { headers: { 'Authorization' : `Bearer ${token}` }});
          console.log(response.data);
      }
      catch(err)
      {
          console.log(err);
      }
  }

  // const [value, setValue] = useState(new Date());
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // const timeSlots = [
  //   '1:00 AM - 2:00 AM',
  //   '6:00 AM - 7:00 AM',
  //   '10:00 AM - 11:00 PM',
  //   '10:00 AM - 11:00 AM',
  //   '1:00 PM - 3:00 PM'
  // ];

  const membership = {
    expiryDate: '2024-02-20',
    plan: 'Premium',
    daysRemaining: 25
  };

  return (
    <div className="space-y-6 p-4">
      {/* Membership Expiry Alert */}
      <div className="rounded-lg bg-yellow-50 p-4">
        <div className="flex items-center">
          <FiAlertCircle className="mr-2 text-yellow-600" />
          <div>
            <h3 className="font-semibold text-yellow-800">Membership Status</h3>
            <p className="text-sm text-yellow-700">
              Your {membership.plan} membership will expire in {membership.daysRemaining} days
              ({new Date(membership.expiryDate).toLocaleDateString()}).
            </p>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-6">
          <Calendar 
            onClickDay={handleDate}
            value={selectedDate}
            className="mx-auto"
            tileDisabled={disableDates}
            tileClassName={({ date, view }) => "bg-blue-500 text-black"}

          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 space-y-4">
            <div className="flex flex-wrap gap-2">
              {sortedSlots.map((slot) => (
                // <button
                //   key={slot}
                //   onClick={() => handleSlotSelect(slot)}
                //   className={`flex items-center rounded-lg border px-4 py-2 ${
                //     selectedSlot === slot
                //       ? 'border-red bg-red text-white'
                //       : bookedSlots.includes(slot)
                //       ? 'border-gray-300 bg-gray-100 text-gray-500'
                //       : 'border-gray-300 hover:border-red'
                //   }`}
                //   disabled={bookedSlots.includes(slot)}
                // >
                  // </button>
                  <div key={slot._id}>
                  <button onClick={()=> handleSlotSelection(slot._id, slot.slot)} className={`flex items-center rounded-lg border px-4 py-2`}>{slot.slot}</button>
                    {(selectedSlot?.slotID === slot._id) && (    //gotta revise this piece of code?
                    <p className={`text-orange-500 ${availability === "Full" ? 'text-red-500' : availability === "Waiting available" ? 'text-blue-500' : availability === "Booking available" ? 'text-green-500' : 'text-black-500'}`} >
                      {availability}
                    </p>
                  )}
                </div>  
                ))}
                  {/* <FiClock className="mr-2" /> */}
                  {/* // {slot} */}
            </div>
            {selectedSlot && (
              <div className="mt-2 text-sm text-green-600">
                Booking available
              </div>
            )}
            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className={`mt-4 rounded-lg px-6 py-2 ${
                selectedSlot
                  ? 'bg-red text-white hover:bg-red-600'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              Book
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold">Booked Slots</h3>
              {bookedSlots.map((slot, index) => (
                <div
                  key={index}
                  className="mb-2 flex items-center justify-between rounded bg-gray-50 p-2"
                >
                  {/* <span>{slot}</span> */}
                  <button
                    // onClick={() => setBookedSlots(bookedSlots.filter(s => s !== slot))}
                    onClick={handleDeleteSlot}
                    className="text-red hover:text-red-600"
                    value={slot.slotID}>
                    {slot.slot}
                    &nbsp;&nbsp;&nbsp;❌
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold">Waiting Slots</h3>
              <div>
                {waitingSlots.map((e, index)=>
                (
                  <div key={index} className='mb-2 flex items-center justify-between rounded bg-gray-50 p-2'>
                    <button onClick={handleWaitDeleteSlot} value={e.slotID} className='text-red hover:text-red-600'>
                    {e.slot}&nbsp;&nbsp;&nbsp;❌
                  </button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500">No waiting slots</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Confirm Membership Booking</h3>
            <div className="mb-4">
              <p className="mb-2"><strong>Plan:</strong> {selectedPlan.name}</p>
              <p className="mb-2"><strong>Price:</strong> ₹{selectedPlan.price}</p>
              <p className="mb-2"><strong>Duration:</strong> {selectedPlan.duration}</p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setSelectedPlan(null);
                }}
                className="rounded bg-gray-400 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
