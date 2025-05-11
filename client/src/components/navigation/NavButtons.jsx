import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { FaUser, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import logo from "../../images/logo/l4.png"; // Adjust if needed
import axios from "axios";

const btnStyles = "hover:text-red text-white transition-colors duration-300 focus";

function NavButtons({ onToggleNav }) 
{
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();

  const handleAdminLogin = async(e) => 
  {
    e.preventDefault();
    try
    {
        const result = await axios.post(`${import.meta.env.VITE_BOOKMYFIT_URL_SERVER}/api/adminLogin`, 
            {email: adminEmail, password: adminPassword},
        );
        console.log(result.data);
        
        const {token} = result.data;
        localStorage.removeItem("userToken");
        localStorage.setItem("adminToken", token);
        navigate("/admin-dashboard");
    }
    catch(err)
    {
        if(err.response.status === 401)
        {
            setAdminError(err.response.data.message);
        }
        if(err.response.status === 403)
        {
          setAdminError(err.response.data.message);
        }
        if(err.response.status === 404)
        {
          setAdminError(err.response.data.message);
        }
        console.log(err);
    }
  }

  async function handleUserLogin(e)
  {
    e.preventDefault();
    try
    {            
        const result = await axios.post(`${import.meta.env.VITE_BOOKMYFIT_URL_SERVER}/api/login`,
            {email: userEmail, password: userPassword},
        );
        const {token} = result.data;

        localStorage.removeItem("adminToken");
        localStorage.setItem("userToken", token);
        navigate("/user-dashboard");
        showLogin(false);
    }
    catch(err)
    {
        if(err.response.status === 401)
        {
            return setUserError(err.response.data.message);
        }
        if(err.response.status === 403)
        {
            setUserError(err.response.data.message);
        }
        if(err.response.status === 404)
        {
            setUserError(err.response.data.message);
        }
        console.log(err);
    }
  }

  return (
    <div className="flex items-center justify-between gap-7">
      <button className={`3xl:hidden ${btnStyles}`} onClick={onToggleNav}>
        <FaBars className="h-6 w-6" />
      </button>

      <Link to="/" className={btnStyles}></Link>
      <button className={btnStyles}></button>

      {/* User Login Button */}
      <div className="focus hidden rounded-sm border-2 border-solid border-gray-350 p-1.5 lg:block">
        <button
          onClick={() => setShowLogin(true)}
          className="mr-2 flex items-center justify-between gap-2 text-sm font-bold uppercase text-white outline-none"
        >
          <FaUser className="h-8 w-8 rounded-full bg-red p-2 text-white" />
          Login
        </button>
      </div>

      {/* Admin Login Button */}
      <div className="focus hidden rounded-sm border-2 border-solid border-gray-350 p-1.5 lg:block">
        <button
          onClick={() => setShowAdminLogin(true)}
          className="mr-2 flex items-center justify-between gap-2 text-sm font-bold uppercase text-white outline-none"
        >
          <FaUser className="h-8 w-8 rounded-full bg-red p-2 text-white" />
          Admin
        </button>
      </div>

      {/* User Login Modal */}
      {showLogin && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <img src={logo} alt="BookMyFit Logo" className="h-12 object-contain" />
            </div>

            <h2 className="text-gray-800 mb-4 text-center text-xl font-bold">Login</h2>

            <form onSubmit={handleUserLogin}>
              <input
                type="email"
                placeholder="Email"
                className="mb-3 w-full rounded border border-gray-300 p-2"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 p-2"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              />
              {userError && (
                <p className="text-sm text-red mt-1">{userError}</p>
              )}
              <div className="mb-4 mt-1 text-right">
                <Link to="/forgot-password" className="text-blue-600 text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full rounded bg-red px-4 py-2 font-semibold text-white"
              >
                Submit
              </button>
            </form>

            <div className="my-4 text-center text-sm text-gray-500">or login with</div>
            <div className="mb-4 flex justify-center gap-4 text-xl text-gray-600">
              <FaFacebook className="hover:text-blue-600 cursor-pointer" />
              <FaGoogle className="hover:text-red-500 cursor-pointer" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            </div>

            <button
              onClick={() => {
                setShowLogin(false);
                setUserError("");
              }}
              className="mt-2 block w-full text-sm text-red hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-4 flex justify-center">
              <img src={logo} alt="BookMyFit Logo" className="h-12 object-contain" />
            </div>

            <h2 className="text-gray-800 mb-4 text-center text-xl font-bold">Admin Login</h2>

            <form onSubmit={handleAdminLogin}>
              <input
                type="text"
                placeholder="Admin ID"
                className="mb-3 w-full rounded border border-gray-300 p-2"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 p-2"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
              {adminError && (
                <p className="text-sm text-red mt-1">{adminError}</p>
              )}
              <button
                type="submit"
                className="mt-3 w-full rounded bg-red px-4 py-2 font-semibold text-white"
              >
                Login
              </button>
            </form>

            <button
              onClick={() => {
                setShowAdminLogin(false);
                setAdminError("");
              }}
              className="mt-4 block w-full text-sm text-red hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavButtons;
