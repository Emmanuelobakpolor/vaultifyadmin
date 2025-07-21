import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import vau from "../../assets/images/vau.png";
import { Eye, EyeOff } from "lucide-react";

const RegisterAdmin = () => {
  useEffect(() => {
    console.log('RegisterAdmin component rendered');
  }, []);

  const [formData, setFormData] = useState({
    adminName: '',
    adminEmail: '',
    adminRole: '',
    adminPassword: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await fetch('/api/admin/registerAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Admin registered successfully');
        setFormData({
          adminName: '',
          adminEmail: '',
          adminRole: '',
          adminPassword: '',
        });
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setError(data.error || 'Failed to register admin');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="mt-10 justify-self-center mx-auto max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="justify-self-center justify-centers font-bold text-3xl font-Montserrat text-center mb-4">
        Vault<span className="text-cyan-700">ify</span> Admin Dashboard
      </h1>
      <div>
        <img src={vau} alt="Vaultify Logo" className="mx-auto mb-5" />
      </div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Admin</h2>
      {message && <p style={{color: 'green'}}>{message}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="adminName" className="block text-gray-700 font-semibold mb-2">Admin Name:</label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adminEmail" className="block text-gray-700 font-semibold mb-2">Admin Email:</label>
          <input
            type="email"
            id="adminEmail"
            name="adminEmail"
            value={formData.adminEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adminRole" className="block text-gray-700 font-semibold mb-2">Admin Role:</label>
          <select
            id="adminRole"
            name="adminRole"
            value={formData.adminRole}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a role</option>
            <option value="Super-admin">Super-admin</option>
            <option value="Range-view admin">Range-view admin</option>
            <option value="Paradise admin">Paradise admin</option>
          </select>
        </div>
        <div className="mb-6 relative">
          <label htmlFor="adminPassword" className="block text-gray-700 font-semibold mb-2">Admin Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="adminPassword"
            name="adminPassword"
            value={formData.adminPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-sky-900 text-white py-2 rounded-md hover:bg-sky-700 transition duration-300 mb-4"
        >
          Register Admin
        </button>
      </form>
      <Link
        to="/login"
        className="w-full block text-center bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition duration-300"
      >
        Login
      </Link>
    </div>
  );
};

export default RegisterAdmin;
