
import { useState } from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import Logo from '../components/logo/Logo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() 
{
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userError, setUserError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e)
  {
    e.preventDefault();
    try
    {            
        const result = await axios.post("http://localhost:3000/api/login", 
            {email: userEmail, password: userPassword},
        );
        const {token} = result.data;

        localStorage.removeItem("adminToken");
        localStorage.setItem("userToken", token);
        navigate("/user-dashboard");
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <Logo />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 p-3 focus:border-red focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 p-3 focus:border-red focus:outline-none"
            />
             {userError && (
                <p className="text-sm text-red mt-1">{userError}</p>
              )}
            <div className="mt-1 text-right">
              <a href="#" className="text-sm text-red hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-red py-3 text-white transition-colors hover:bg-red/90"
          >
            Submit
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">or login with</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="rounded-full p-2 text-gray-400 hover:text-red">
              <FaFacebook size={24} />
            </button>
            <button className="rounded-full p-2 text-gray-400 hover:text-red">
              <FaGoogle size={24} />
            </button>
            <button className="rounded-full p-2 text-gray-400 hover:text-red">
              <FaTwitter size={24} />
            </button>
          </div>
          <button 
            className="mt-4 text-sm text-red hover:underline"
            onClick={() => window.close()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
