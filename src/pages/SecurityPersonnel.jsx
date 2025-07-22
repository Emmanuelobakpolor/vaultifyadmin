import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import { useSelector } from 'react-redux';

function SecurityPersonnel() {
  const [searchItems, setSearchItems] = useState("");
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  // Use environment variable for base URL, fallback to production
  const baseUrl = import.meta.env.VITE_API_URL || 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  // Define role-specific endpoints
  const endpoints = {
    'Super-admin': `${baseUrl}security-personnel-users/all/`,
    'Paradise admin': `${baseUrl}security-personnel-users/?estate=Paradise Estate`,
    'Range-view admin': `${baseUrl}security-personnel-users/?estate=Range View Estate`,
    'Manager residence': `${baseUrl}manageresidence/security-personnel-users/all/`
  };

  // Select endpoint based on role, default to Super-admin if role not found
  const currentEndpoint = endpoints[role] || endpoints['Super-admin'];

  // Fetch security personnel users from API with Authorization header
  const { data, isLoading, error } = useQuery("securityPersonnelUsers", () =>
    axios
      .get(currentEndpoint, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data)
  );

  // Filter data based on search input
  const filteredPersonnel = data
    ? data.filter((user) => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        const email = user.email?.toLowerCase() || "";
        const phone = user.profile?.phone_number?.toLowerCase() || "";
        const estate = user.profile?.estate?.toLowerCase() || "";
        const term = searchItems.toLowerCase();
        return (
          fullName.includes(term) ||
          email.includes(term) ||
          phone.includes(term) ||
          estate.includes(term)
        );
      })
    : [];

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error loading security personnel data: {error.message}</div>;
  }

  return (
    <motion.div
      className="bg-gray-200 backdrop-blur-md shadow-lg rounded-xl p-6 border-black mt-10 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className="text-xl font-semibold text-sky-950">Manage Security Personnel</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-sky-950">All Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Engine"
            onChange={(e) => setSearchItems(e.target.value)}
            value={searchItems}
            className="rounded-lg placeholder-sky-900 placeholder:p-5 focus:outline-none focus:ring-2 focus:ring-sky-800"
          />
        </div>
        {/* <Link
          to={"/AddManageSecurityPersonnel"}
          className="mr-8 p-2 rounded-xl mt-1 bg-sky-950 text-white hover:bg-white hover:text-sky-900"
        >
          <button>+ Add Security Personnel</button>
        </Link> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="text-sky-950">
              <th></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Phone Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Estate</th>
            </tr>
          </thead>
          <tbody className="min-w-full max-w-full divide-y divide-gray-700">
            {filteredPersonnel.map((user) => {
              const fullName = `${user.first_name} ${user.last_name}`;
              const initials = (user.first_name?.charAt(0).toUpperCase() || "") + (user.last_name?.charAt(0).toUpperCase() || "");
              return (
                <motion.tr
                  key={user.email}
                  className="bg-white hover:bg-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <input type="checkbox" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="w-10 h-10 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold">
                      {initials}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.profile?.phone_number || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.profile?.estate || "N/A"}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default SecurityPersonnel;