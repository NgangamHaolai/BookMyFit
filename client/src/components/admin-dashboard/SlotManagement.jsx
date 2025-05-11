import { useEffect, useState } from 'react';
import axios from 'axios';

  function SlotManagement()
  {
    const [ maxBooking, setMaxBooking ] = useState(null);
    const [ maxWaiting, setMaxWaiting ] = useState(null);
    const [ defaultBooking, setDefaultBooking ] = useState();
    const [ defaultWaiting, setDefaultWaiting ] = useState();
    const [ newSlot, setNewSlot ] = useState("");
    const [ retrievedSlots, setRetrievedSlots ] = useState([]);
    // const [ deleteSlot, setDeleteSlot ] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    useEffect(()=>
    {
        retrieveTimeSlots();
    }, [newSlot]);
    
    useEffect(()=>
    {
      const timeout = setTimeout(()=>
      {
        setError('');
      }, 3000);
      return ()=> clearTimeout(timeout);
    }, [error]);

    useEffect(()=>
    {
      const timeout = setTimeout(()=>
      {
        setSuccess('');
      }, 3000);
      return ()=> clearTimeout(timeout);
    }, [success]);

    // function handleMaxBooking(e)
    // {
    //     setMaxBooking(e.target.value);
    // }
    // function handleMaxWaiting(e)
    // {
    //     setMaxWaiting(e.target.value);
    // }
    function handleAddSlot(e)
    {
        setNewSlot(e.target.value);
    }
    async function handleAddButton(e)
    {
      e.preventDefault();
      console.log("Attempting to add slot: ", newSlot);

      const slotRegex = /^\d{1,2}:\d{2}\s(?:AM|PM)\s-\s\d{1,2}:\d{2}\s(?:AM|PM)$/;
      if(!slotRegex.test(newSlot))
      {
          return alert("Invalid Slot Format");
      }
      try
      {
          const response = await axios.post("http://localhost:3000/api/timeSlot", { slot: newSlot });
          // alert(response.data.message);
          console.log(response.data.message);
          retrieveTimeSlots();
      }
      catch(err)
      {
          if(err.response.status === 409) //ok
          {
              setError(err.response.data.message);
          }
          if(err.response.status === 404) //ok
          {
              setError(err.response.data.message);
          }
          if(err.response.status === 400)
          {
              setError(err.response.data.message);
          }
          console.log(err);
      }
  }
  async function handleDeleteButton(e, slotId) 
  {
      e.preventDefault();
      let token = localStorage.getItem('adminToken');
      const response = await axios.delete(`http://localhost:3000/api/timeSlot/${slotId}`,
        { headers: { 'Authorization': `Bearer ${token}`}}
      );
      console.log(response.data);
      retrieveTimeSlots();
  }
  async function handleSubmit(e)
  {
      e.preventDefault();
      console.log("Max",maxBooking,maxWaiting);
      const finalBooking = maxBooking === null ? defaultBooking : maxBooking;
      const finalWaiting = maxWaiting === null ? defaultWaiting : maxWaiting;
      console.log("Final", finalBooking, finalWaiting);
      const response = await axios.put("http://localhost:3000/api/timeSlot", { maxBooking: finalBooking, maxWaiting: finalWaiting });
      console.log(response.data.message);
      setSuccess(response.data.message);

  }
  async function retrieveTimeSlots()
  {
      const response = await axios.get("http://localhost:3000/api/timeSlot");
      const slotsRetrieved = response.data;

      setDefaultBooking(slotsRetrieved[0].maxBookingCapacity)
      setDefaultWaiting(slotsRetrieved[0].maxWaitingCapacity)

      console.log(slotsRetrieved);
      
      setRetrievedSlots(slotsRetrieved);

      sortingSlots(slotsRetrieved);

      console.log("Retrieved Slots:", slotsRetrieved);
  }
  function sortingSlots(slotsRetrieved)
  {
      slotsRetrieved.sort((a,b)=>
      {
          function splittingSlots(data)
          {
              const [hr, min, period] = data.split(/[:\s]/);
              let hour = parseInt(hr, 10);
              let minute = parseInt(min, 10);
              if(period === "PM" && hour !== 12) hour += 12;
              if(period !== "AM" && hour === 12) hour = 0;
              let totalMinutes = hour * 60 + minute;
              return totalMinutes;
          }
          return splittingSlots(a.slot) - splittingSlots(b.slot);
      });
      setRetrievedSlots(slotsRetrieved);
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Slot Management</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-4">
          <label>Set Max Booking:</label>
          <input
            type="number"
            value={maxBooking === null ? defaultBooking : maxBooking}
            onChange={(e) => setMaxBooking(e.target.value)}
            className="border rounded p-1 w-16"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <label>Set Max Waiting:</label>
          <input
            type="number"
            value={maxWaiting === null ? defaultWaiting : maxWaiting}
            onChange={(e) => setMaxWaiting(e.target.value)}
            className="border rounded p-1 w-16"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <label>Add New Slot:</label>
          <input
            type="text"
            value={newSlot}
            onChange={(e) => handleAddButton(e.target.value)}
            placeholder="e.g. 10:00 AM to 11:00 AM"
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={handleAddSlot}
            className="bg-red text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
      {success && (
          <p className="text-m text-green mt-1">{success}</p>
          )}

      <div className="border rounded p-4 overflow-x-auto max-w-screen">
        <h3 className="font-bold mb-4">Slots:</h3>
        <ul className="space-y-2">
          {retrievedSlots.map((slot, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{slot.slot}</span>
              <button
                onClick={(e) => handleDeleteButton(e,slot._id)}
                className="text-red hover:text-red-700"
              >
                ✕ Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {error && (
          <p className="text-sm text-red mt-1">{error}</p>
          )}
      <button className="mt-6 bg-red text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
}

export default SlotManagement;