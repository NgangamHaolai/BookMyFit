import { useState } from "react";
import { schedule } from "./Data";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa"; // Social icons
import logo from "../../images/logo/l4.png"; // Adjust path as needed
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function List({ selectedDay }) {
  const [showSignup, setShowSignup] = useState(false);
  let navigate = useNavigate();
  const openSignup = () => setShowSignup(true);
  const closeSignup = () => setShowSignup(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e)
  {   
      e.preventDefault();
      // const token = localStorage.getItem('token');
      // if(!token)   //working on both back & front ends
      // {
      //     alert("No token found! please log in again.");
      //     return <Navigate to='/admin'></Navigate>
      // }
      try
      {   
          const result = await axios.post("http://localhost:3000/api/register",
              { Fname: firstName,
                Lname: lastName,
                email: email,
                phoneNo: phoneNo,
                password: password,
              conPassword: confirmPassword,
             },
              // { headers: {'Authorization': `Bearer ${token}`}}
          );
          // alert(result.data.message);
          navigate("/user-dashboard");
      }
      catch(err)
      {
          if(err.response.status === 400)
          {
              return setError(err.response.data.message);
          }
          else if(err.response.status === 401)    //ok
          {
              return setError(err.response.data.message);
          }
          else if(err.response.status === 409)  //ok
          {
              return setError(err.response.data.message);
          }
          else if(err.response.data.message === "Session expired. Please log in again!")
          {
              alert("Session expired. Please log in again!");
              localStorage.removeItem('token');
          }
          else
          {
              console.log(err);
              return alert("something went wrong in creating new Admin.")
          }
      }
  }
  function handleFirstName(e)
  {
      setFirstName(e.target.value);
  }
  function handleLastName(e)
  {
    setLastName(e.target.value);
  }
  function handleEmail(e)
  {
      setEmail(e.target.value);
  }
  function handlePhoneNo(e)
  {
    setPhoneNo(e.target.value);
  }
  function handlePassword(e)
  {
      setPassword(e.target.value);
  }
  function handleConfirmPassword(e)
  {
    setConfirmPassword(e.target.value);
  }
  
  return (
    <>
      {schedule.at(selectedDay).map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-between gap-2 bg-gray-50 p-6 text-center xl:flex-row xl:text-left"
        >
          <div className="xl:basis-36">
            <h3 className="text-sm font-medium text-gray-200">Class Name</h3>
            <p className="text-lg font-semibold">{item.class}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-200">Time</h3>
            <p className="text-lg font-semibold">{item.time}</p>
          </div>

          <div className="xl:basis-40">
            <h3 className="text-sm font-medium text-gray-200">Trainer</h3>
            <p className="text-lg font-semibold">{item.trainer}</p>
          </div>

          <button
            onClick={openSignup}
            className="self-center rounded-full bg-gray-400 p-3 text-sm font-bold text-white transition-all duration-300 hover:bg-red"
          >
            Join Now
          </button>
        </div>
      ))}

      {/* Signup Popup Modal */}
      {showSignup && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            {/* Logo */}
            <div className="mb-4 flex justify-center">
              <img
                src={logo}
                alt="BookMyFit Logo"
                className="h-12 object-contain"
              />
            </div>

            <h2 className="text-gray-800 mb-4 text-center text-xl font-bold">
              Create Your Account
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full rounded border border-gray-300 p-2"
                  onChange={handleFirstName}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full rounded border border-gray-300 p-2"
                  onChange={handleLastName}
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded border border-gray-300 p-2"
                onChange={handleEmail}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded border border-gray-300 p-2"
                onChange={handlePhoneNo}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 p-2"
                onChange={handlePassword}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded border border-gray-300 p-2"
                onChange={handleConfirmPassword}
              />
              {error && (
                <p className="text-sm text-red mt-1">{error}</p>
              )}
              <button
                type="submit"
                className="hover:bg-red-600 w-full rounded bg-red px-4 py-2 font-semibold text-white"
              >
                Sign Up
              </button>
            </form>

            {/* Social Media Section */}
            <div className="my-4 text-center text-sm text-gray-500">
              or sign up with
            </div>
            <div className="mb-4 flex justify-center gap-4 text-xl text-gray-600">
              <FaFacebook className="hover:text-blue-600 cursor-pointer" />
              <FaGoogle className="hover:text-red-500 cursor-pointer" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            </div>

            <button
              onClick={closeSignup}
              className="text-red-500 mt-2 block w-full text-sm hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default List;
