import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import { useSelector } from 'react-redux';

function ManageVisitors() {
  const [searchItems, setSearchItems] = useState("");
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  // Use environment variable for base URL, fallback to production
  const baseUrl = import.meta.env.VITE_API_URL  || 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  // Define role-specific endpoints
  const endpoints = {
    'Super-admin': `${baseUrl}visitor/checkin/all/`,
    'Paradise admin': `${baseUrl}visitor/checkin/?estate=Paradise Estate`,
    'Range-view admin': `${baseUrl}visitor/checkin/?estate=Range View Estate`,
    'Manager residence': `${baseUrl}manageresidence/visitor/checkin/all/`
  };

  // Select endpoint based on role, default to Super-admin if role not found
  const currentEndpoint = endpoints[role] || endpoints['Super-admin'];

  // Fetch visitor checkin data from API with Authorization header
  const { data, isLoading, error } = useQuery("visitorCheckinData", () => {
    console.log('Fetching visitors from:', currentEndpoint); // Debug
    return axios
      .get(currentEndpoint, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data.visitors || []);
  });

  const filteredVisitors = Array.isArray(data)
    ? data.filter((visitor) => {
        const term = searchItems.toLowerCase();
        return (
          visitor?.visitorName?.toLowerCase().includes(term) ||
          visitor?.hostName?.toLowerCase().includes(term) ||
          visitor?.accessCode?.toLowerCase().includes(term) ||
          visitor?.accessArea?.toLowerCase().includes(term) ||
          visitor?.estate?.toLowerCase().includes(term)
        );
      })
    : [];

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    const date = new Date(dateTimeStr);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };

  const getStatus = (expectedCheckOutTime) => {
    if (!expectedCheckOutTime) return "Not Active";
    const now = new Date();
    const checkOut = new Date(expectedCheckOutTime);
    return now < checkOut ? "Active" : "Not Active";
  };

  if (isLoading) return <Preloader />;
  if (error)
    return (
      <div className="p-6 text-center text-red-600">
        Error loading visitor checkin data: {error.message}
      </div>
    );

  return (
    <motion.div
      className="bg-gray-100 shadow-xl rounded-xl p-6 mt-10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-sky-950">Manage Visitors</h2>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search Visitors..."
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-700 placeholder-sky-700"
          />
          {/* <Link
            to="/AddManageVisitors"
            className="bg-sky-950 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-sky-950 hover:border hover:border-sky-950 transition duration-300"
          >
            + Add Visitor
          </Link> */}
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
        <table className="min-w-[1000px] w-full table-auto divide-y divide-gray-200">
          <thead className="bg-sky-50">
            <tr className="text-left text-xs font-semibold text-sky-900 uppercase">
              <th className="px-4 py-3">Select</th>
              <th className="px-4 py-3">Visitor Name</th>
              <th className="px-4 py-3">Residents Name</th>
              <th className="px-4 py-3">Access Code</th>
              <th className="px-4 py-3">Access Area</th>
              <th className="px-4 py-3">Check In Date/Time</th>
              <th className="px-4 py-3">Expected Check Out Date/Time</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVisitors.map((visitor) => (
              <motion.tr
                key={visitor.accessCode}
                className="hover:bg-gray-50 transition duration-150"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {visitor.visitorName || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {visitor.hostName || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {visitor.accessCode || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {visitor.accessArea || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatDateTime(visitor.checkInTime)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatDateTime(visitor.expectedCheckOutTime)}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-semibold text-center rounded ${
                    getStatus(visitor.expectedCheckOutTime) === "Active"
                      ? "bg-green-700 text-white"
                      : "bg-red-700 text-white"
                  }`}
                >
                  {getStatus(visitor.expectedCheckOutTime)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default ManageVisitors;