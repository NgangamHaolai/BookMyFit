import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers, FiCalendar, FiDollarSign, FiSettings,
  FiHome, FiUserPlus, FiBookOpen, FiClock
} from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line
} from 'recharts';

import AdminStats from "../components/admin-dashboard/AdminStats";
import MembershipManagement from "../components/admin-dashboard/MembershipManagement";
import BookingManagement from "../components/admin-dashboard/BookingManagement";
import AdminSettings from "../components/admin-dashboard/AdminSettings";
import SlotManagement from "../components/admin-dashboard/SlotManagement";
import logo from '../images/logo/l4.png'; // ✅ Import your logo
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() 
{
  const [activeTab, setActiveTab] = React.useState('overview');
  const navigate = useNavigate();

  const [ totalMembers, setTotalMembers ] = useState(null);
  const [ totalBookings, setTotalBookings ] = useState(null);
  const [ totalWaitings, setTotalWaitings ] = useState(null);

  useEffect(()=>
  {
    getTotalMembers();
  }, []);

  const getTotalMembers = async()=>
  {
    try
    {
      const response = await axios.get('http://localhost:3000/api/adminDashboard/membersData');
      
      setTotalMembers(response.data.totalMembers);
      setTotalBookings(response.data.totalBookings);
      setTotalWaitings(response.data.totalWaitings);
    }
    catch(err)
    {
      console.log(err);
      
    }
  }

  const handleLogout = () => 
  {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const mockData = {
    memberships: [
      { month: 'Jan', count: 30 },
      { month: 'Feb', count: 45 },
      { month: 'Mar', count: 55 },
      { month: 'Apr', count: 40 },
      { month: 'May', count: 65 },
    ],
    revenue: [
      { month: 'Jan', amount: 25000 },
      { month: 'Feb', amount: 35000 },
      { month: 'Mar', amount: 45000 },
      { month: 'Apr', amount: 30000 },
      { month: 'May', amount: 50000 },
    ]
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl">
        {/* Logo at top-left */}
        <div className="flex justify-center items-center p-4 border-b">
          <img
            src={logo}
            alt="BookMyFit Logo"
            className="h-16 object-contain"
          />
        </div>

        <nav className="mt-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex w-full items-center px-6 py-3 text-left ${activeTab === 'overview' ? 'bg-red text-white' : 'hover:bg-gray-100'}`}
          >
            <FiHome className="mr-3" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('membership')}
            className={`flex w-full items-center px-6 py-3 text-left ${activeTab === 'membership' ? 'bg-red text-white' : 'hover:bg-gray-100'}`}
          >
            <FiUserPlus className="mr-3" /> Membership
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex w-full items-center px-6 py-3 text-left ${activeTab === 'bookings' ? 'bg-red text-white' : 'hover:bg-gray-100'}`}
          >
            <FiBookOpen className="mr-3" /> Bookings
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex w-full items-center px-6 py-3 text-left ${activeTab === 'settings' ? 'bg-red text-white' : 'hover:bg-gray-100'}`}
          >
            <FiSettings className="mr-3" /> Settings
          </button>
          <button
            onClick={() => setActiveTab('slots')}
            className={`flex w-full items-center px-6 py-3 text-left ${activeTab === 'slots' ? 'bg-red text-white' : 'hover:bg-gray-100'}`}
          >
            <FiClock className="mr-3" /> Slots
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Bar with Logout Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="bg-red text-white px-5 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-4">
              <AdminStats title="Total Members" count={totalMembers} icon={<FiUsers />} />
              <AdminStats title="Total Bookings" count={totalBookings} icon={<FiCalendar />} />
              <AdminStats title="Total Waitings" count={totalWaitings} icon={<FiCalendar />} />
              <AdminStats title="Revenue" count="₹52,500" icon={<FiDollarSign />} />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-xl">
                <h3 className="mb-4 text-xl font-bold">Membership Growth</h3>
                <BarChart width={500} height={300} data={mockData.memberships}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF0336" />
                </BarChart>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-xl">
                <h3 className="mb-4 text-xl font-bold">Revenue Trends</h3>
                <LineChart width={500} height={300} data={mockData.revenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#FF0336" />
                </LineChart>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'membership' && <MembershipManagement />}
        {activeTab === 'bookings' && <BookingManagement />}
        {activeTab === 'settings' && <AdminSettings />}
        {activeTab === 'slots' && <SlotManagement />}
      </div>
    </div>
  );
}

export default AdminDashboard;
