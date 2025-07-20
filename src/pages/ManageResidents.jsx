import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import axios from 'axios';

function ManageResidents() {
  const [formData, setFormData] = useState({
    fullName: "",
    unitNumber: "",
    phoneNumber: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    house_address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  // Common base URL and token for all roles
  const baseUrl = 'https://vaultify-43wm.onrender.com/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  // Define role-specific endpoints for creating residents
  const endpoints = {
    'Super-admin': `${baseUrl}api/residence-users/all/`,
    'Paradise admin': `${baseUrl}/api/residence-users/?estate=Paradise Estate`,
    'Range-view admin': `${baseUrl}/api/residence-users/?estate=Range View Estate`,
    'Manager residence': `${baseUrl}api/manageresidence/residence-users/create/`
  };

  // Select endpoint based on role, default to Super admin if role not found
  const currentEndpoint = endpoints[role] || endpoints['Super-admin'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(currentEndpoint, {
        full_name: formData.fullName,
        unit_number: formData.unitNumber,
        phone_number: formData.phoneNumber,
        email: formData.email,
        emergency_contact_name: formData.emergencyContactName,
        emergency_contact_phone: formData.emergencyContactPhone,
        house_address: formData.houseAddress
      }, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccess('Resident added successfully!');
      setFormData({
        fullName: "",
        unitNumber: "",
        phoneNumber: "",
        email: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        houseAddress: ""
      });
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to add resident');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-25 ml-5 pr-10 mb-20 overflow-x-auto max-w-full">
      <h1 className="ml-5 mb-5 font-bold">Add Resident</h1>
      <motion.div
        className="bg-white pb-20 p-5 justify-center self-center rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={handleSubmit}>
          <h1 className="m-5 font-semibold">
            <label>Full Name</label>
            <p>
              <input
                className="bg-gray-50 border-0.2 rounded-x w-full p-1"
                placeholder="Enter Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </p>
          </h1>

          <h1 className="m-5 font-semibold">
            <label>Unit Number/Apartment</label>
            <p>
              <input
                className="bg-gray-50 border-0.2 rounded-x w-full p-1"
                type="text"
                placeholder="Available Unit"
                name="unitNumber"
                value={formData.unitNumber}
                onChange={handleInputChange}
                required
              />
            </p>
          </h1>

          <h1 className="m-5 font-semibold">
            <label>Phone Number</label>
            <p>
              <input
                type="tel"
                className="bg-gray-50 border-0.2 rounded-x w-full p-1"
                placeholder="Enter Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </p>
          </h1>

          <h1 className="m-5 font-semibold">
            <label>Email Address</label>
            <p>
              <input
                type="email"
                className="bg-gray-50 border-0.2 rounded-x w-full p-1"
                placeholder="Enter Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </p>
          </h1>

          <h1 className="m-5 font-semibold">
            <label>House Address</label>
            <p>
              <input
                type="text"
                className="bg-gray-50 border-0.2 rounded-x w-full p-1"
                placeholder="Enter House Address"
                name="house_address"
                value={formData.house_address}
                onChange={handleInputChange}
                required
              />
            </p>
          </h1>

          <h1 className="m-5 font-semibold">
            <label>Emergency Contact (Full Name)</label>
            <p>
              <input
                className="bg-gray-50 border-0.2 rounded-x w-full p-1"
                placeholder="Enter Full Name"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleInputChange}
                required
              />
            </p>
          </h1>

          <h1 className="m-5 font-semibold">
            <label>Emergency Contact (Phone Number)</label>
            <p>
              <input
                type="tel"
                className="bg-gray-50 border-0.2 rounded-x w-full p-1"
                placeholder="Enter Phone Number"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleInputChange}
                required
              />
            </p>
          </h1>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Resident'}
            </button>
          </div>

          {error && <p className="text-red-600 text-center mt-4">{error}</p>}
          {success && <p className="text-green-600 text-center mt-4">{success}</p>}
        </form>
      </motion.div>
    </div>
  );
}

export default ManageResidents;
