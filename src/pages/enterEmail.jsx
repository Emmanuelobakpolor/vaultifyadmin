import React, { useState } from "react";
import vau from "../assets/images/vau.png";
import { useShopContext } from '../context.jsx';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EnterEmail() {
  const navigate = useNavigate();
  const { backendUrl } = useShopContext();
  const [adminEmail, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/sendRestOtp`, {
        adminEmail
      });
  if (data.success) {
        toast.success("Please check your email for the OTP");
        navigate("/verify");
  }
      
      
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
    }
  }

  return (
    <div className="mt-10 justify-self-center mx-auto">
      <h1 className="justify-self-center font-bold text-3xl font-Montserrat">
        Vault<span className="text-cyan-700">ify</span> Admin Dashboard
      </h1>

      <div>
        <img src={vau} className="mx-auto mb-5" alt="Vaultify Logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="adminEmail">Email Address</label>
          <p>
            <input
              type="email"
              id="adminEmail"
              placeholder="Enter your email"
              value={adminEmail}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-700 text-white py-2 rounded-md hover:bg-sky-700 transition duration-300 mt-5"
        >
          Submit
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default EnterEmail;
