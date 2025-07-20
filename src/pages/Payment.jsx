import React, { useState, useEffect } from 'react'
import axios from 'axios'
import search from "../assets/images/search.png"
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';

function Payment() {
  const [searchItems, setSearchItems] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  // Use environment variable for base URL, fallback to production
  const baseUrl = import.meta.env.VITE_API_URL || 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  // Define role-specific endpoints
  const endpoints = {
    'Super-admin': `${baseUrl}subscription-users/`,
    'Paradise admin': `${baseUrl}subscription-users/?estate=Paradise Estate`,
    'Range-view admin': `${baseUrl}subscription-users/?estate=Range View Estate`,
    'Manager residence': `${baseUrl}manageresidence/subscription-users/`
  };

  // Select endpoint based on role, default to Super-admin if role not found
  const currentEndpoint = endpoints[role] || endpoints['Super-admin'];

  useEffect(() => {
    const fetchSubscriptionUsers = async () => {
      try {
        console.log('Fetching subscription users from:', currentEndpoint); // Debug
        const response = await axios.get(currentEndpoint, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Subscription users API response:", response);
        setAllUsers(response.data);
        setFilterProducts(response.data);
      } catch (error) {
        console.error("Error fetching subscription users:", error);
      }
    };
    fetchSubscriptionUsers();
  }, [currentEndpoint]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchItems(term);
    const filter = allUsers.filter(user =>
      (user.first_name + " " + user.last_name).toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      (user.user_id && user.user_id.toString().includes(term))
    );
    setFilterProducts(filter);
  };

  const selection = (e) => {
    e.preventDefault();
    console.log("Checkbox toggled:", e.target.checked);
  };

  return (
    <motion.div
      className='bg-gray-200 backdrop-blur-md shadow-lg rounded-xl p-6 border-black mt-10'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className='text-xl font-semibold text-sky-950 mb-2'>
        Payment Management
      </h1>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-sky-950'>All Users</h2>
        <div className='relative'>
          <input
            type='text'
            placeholder='Search Engine'
            onChange={handleSearch}
            value={searchItems}
            className='rounded-lg placeholder-sky-900 pl-10 pr-5 py-2 focus:outline-none focus:ring-2 focus:ring-sky-800'
          />
          <img
            className='absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5'
            src={search}
            alt="search icon"
          />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr className='text-sky-950'>
              <th></th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>
                Resident Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>
                Transaction ID
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>
                Unit Number
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>
                Payment Type
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>
                Amount Paid
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>
                Visit Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>
                Payment Date
              </th>
            </tr>
          </thead>
          <tbody className='min-w-full max-w-full divide-y divide-gray-700'>
            {filterProducts.map((user) => (
              <motion.tr
                key={user.user_id}
                className='bg-white hover:bg-gray-100'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <input type='checkbox' onChange={selection} />
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {user.first_name} {user.last_name}
                  <p>{user.email}</p>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.user_id}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.unit_number || "N/A"}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.subscription_type || "N/A"}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.payment_amount || "N/A"}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-white ${user.payment_amount && user.payment_amount !== "0.00" ? "bg-green-800" : "bg-red-800"}`}>
                  {user.payment_amount && user.payment_amount !== "0.00" ? "Active" : "Free"}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.payment_date || "N/A"}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default Payment