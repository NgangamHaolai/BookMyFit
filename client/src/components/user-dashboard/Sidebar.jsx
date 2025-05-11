import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiCalendar, FiCreditCard, FiBell, FiActivity } from 'react-icons/fi';
import logoBlack from '../../images/logo/l4.png';

export default function Sidebar() {
  return (
    <div className="bg-white h-screen w-64 shadow-lg flex flex-col">
      
      {/* Logo at top */}
      <div className="flex items-center justify-center py-6">
        <img src={logoBlack} alt="Logo" className="h-16" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <Link
          to="/user-dashboard"
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-[#FF0336] hover:text-white transition-all duration-300 rounded-lg mx-4 mb-2"
        >
          <FiHome className="mr-3" /> Overview
        </Link>

        <Link
          to="/user-dashboard/profile"
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-[#FF0336] hover:text-white transition-all duration-300 rounded-lg mx-4 mb-2"
        >
          <FiUser className="mr-3" /> Profile
        </Link>

        <Link
          to="/user-dashboard/bookings"
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-[#FF0336] hover:text-white transition-all duration-300 rounded-lg mx-4 mb-2"
        >
          <FiCalendar className="mr-3" /> Bookings
        </Link>

        <Link
          to="/user-dashboard/payments"
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-[#FF0336] hover:text-white transition-all duration-300 rounded-lg mx-4 mb-2"
        >
          <FiCreditCard className="mr-3" /> Payments
        </Link>

        <Link
          to="/user-dashboard/bmi-calculator"
          className="flex items-center px-6 py-3 text-gray-600 hover:bg-[#FF0336] hover:text-white transition-all duration-300 rounded-lg mx-4 mb-2"
        >
          <FiActivity className="mr-3" /> BMI Calculator
        </Link>
      </nav>
    </div>
  );
}
