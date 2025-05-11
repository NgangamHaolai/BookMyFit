import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSettings() 
{
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let navigate = useNavigate();

  function handleEmail(e)
  {
      setEmail(e.target.value);
  }
  function handleOldPassword(e)
  {
      setOldPassword(e.target.value);
  }
  function handleNewPassword(e)
  {
      setNewPassword(e.target.value);
  }
  function handleConfirmPassword(e)
  {
    setConfirmPassword(e.target.value);
  }
  async function handleSubmit(e)
  {
      e.preventDefault();
      const token = localStorage.getItem('adminToken');
      try
      {
          const response = await axios.post(`${import.meta.env.VITE_BOOKMYFIT_URL_SERVER}/api/resetAdminPassword`, 
              {oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword},
              {headers: {'Authorization' : `Bearer ${token}`}}
          );
          // alert(response.data.message);
          setSuccess(response.data.message);
      }
      catch(err)
      {
        if(err.response.status === 400)
        {
          setError(err.response.data.message);
        }
        else if(err.response.status === 401)
        {
          setError(err.response.data.message);
        }
        else if(err.response.status === 403)
        {
          alert(err.response.data.message);
          return navigate("/");
        }
        console.log(err);
      }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold">Change Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-medium">Current Password</label>
            <input 
              type="password" 
              className="w-full rounded border p-2"
              placeholder="Enter current password"
              onChange={handleOldPassword}
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">New Password</label>
            <input 
              type="password" 
              className="w-full rounded border p-2"
              placeholder="Enter new password"
              onChange={handleNewPassword}
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">Confirm New Password</label>
            <input 
              type="password" 
              className="w-full rounded border p-2"
              placeholder="Confirm new password"
              onChange={handleConfirmPassword}
            />
          </div>
          {error ? (
              <p className="text-sm text-red mt-1">{error}</p>
            ) : 
            success ? (
              <p className="text-sm mt-1 text-blue">{success}</p>
            ) : null}
          <button className="rounded bg-red px-4 py-2 text-white">
            Update Password
          </button>
        </form>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold">Admin Credentials</h2>
        <form className="space-y-4">
          <div>
            <label className="mb-2 block font-medium">Email</label>
            <input 
              type="email" 
              className="w-full rounded border p-2"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium">Username</label>
            <input 
              type="text" 
              className="w-full rounded border p-2"
              placeholder="admin"
            />
          </div>
          <button className="rounded bg-red px-4 py-2 text-white">
            Update Credentials
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings;
