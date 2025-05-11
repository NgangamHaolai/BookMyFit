import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FiActivity, FiCalendar, FiClock, FiTrendingUp, FiBell } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/user-dashboard/Sidebar';
import StatsCard from '../components/user-dashboard/StatsCard';
import Profile from '../components/user-dashboard/Profile';
import BMICalculator from '../components/user-dashboard/BMICalculator';
import Booking from '../components/user-dashboard/Booking';
import Payment from '../components/user-dashboard/Payment';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Notifications Data
  const notifications = [
    { id: 1, message: "🔔 Reminder: You have a booking tomorrow at 5 PM" },
    { id: 2, message: "⚠️ Alert: Your membership expires in 3 days" }
  ];

  const workoutData = [
    { name: 'Mon', sessions: 2 },
    { name: 'Tue', sessions: 3 },
    { name: 'Wed', sessions: 1 },
    { name: 'Thu', sessions: 4 },
    { name: 'Fri', sessions: 2 },
    { name: 'Sat', sessions: 3 },
    { name: 'Sun', sessions: 2 },
  ];

  const handleLogout = () => 
  {
    localStorage.removeItem('userToken')
    navigate('/');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 relative">

        {/* Top Right Controls */}
        <div className="absolute top-8 right-8 flex items-center space-x-4">

          {/* Notification Icon */}
          <div className="relative">
            <button onClick={toggleNotifications}>
              <FiBell className="text-[#FF0336] text-2xl" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="p-4 text-gray-700">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  {notifications.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {notifications.map((notification) => (
                        <li key={notification.id}>{notification.message}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No new notifications</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-[#FF0336] hover:bg-[#e60029] text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-3xl font-bold mb-8">Welcome back, User!</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard title="Total Workouts" value="28" icon={<FiActivity />} />
                <StatsCard title="Upcoming Sessions" value="3" icon={<FiCalendar />} />
                <StatsCard title="Hours Trained" value="42" icon={<FiClock />} />
                <StatsCard title="Progress" value="85%" icon={<FiTrendingUp />} />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Weekly Workout Sessions</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={workoutData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sessions" stroke="#FF0336" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          } />
          <Route path="profile" element={<Profile />} />
          <Route path="bmi-calculator" element={<BMICalculator />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="payments" element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
}
