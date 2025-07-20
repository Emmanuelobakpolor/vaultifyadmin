import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Preloader from '../components/Preloader'
import { useSelector } from 'react-redux';

function Residents() {
  const [searchItems, setSearchItems] = useState("")
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  // Use environment variable for base URL, fallback to production
  const baseUrl = import.meta.env.VITE_API_URL || 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  // Define role-specific endpoints
  const endpoints = {
    'Super-admin': `${baseUrl}residence-users/all/`,
    'Paradise admin': `${baseUrl}residence-users/?estate=Paradise Estate`,
    'Range-view admin': `${baseUrl}residence-users/?estate=Range View Estate`,
    'Manager residence': `${baseUrl}manageresidence/residence-users/all/`
  };

  // Select endpoint based on role, default to Super-admin if role not found
  const currentEndpoint = endpoints[role] || endpoints['Super-admin'];

  // Fetch residence users from API with Authorization header
  const { data, isLoading, error } = useQuery('residenceUsers', () =>
    axios.get(currentEndpoint, {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(res => res.data)
  )

  // Filter data based on search input
  const filteredResidents = data
    ? data.filter(user => {
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase()
        const email = user.email.toLowerCase()
        const phone = user.profile?.phone_number?.toLowerCase() || ""
        const estate = user.profile?.estate?.toLowerCase() || ""
        const plan = user.profile?.plan?.toLowerCase() || ""
        const houseAddress = user.profile?.house_address?.toLowerCase() || ""
        const term = searchItems.toLowerCase()
        return (
          fullName.includes(term) ||
          email.includes(term) ||
          phone.includes(term) ||
          estate.includes(term) ||
          plan.includes(term) ||
          houseAddress.includes(term)
        )
      })
    : []

  // Helper to get initials from full name
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : ''
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : ''
    return firstInitial + lastInitial
  }

  if (isLoading) {
    return <Preloader />
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error loading residents data: {error.message}</div>
  }

  return (
    <motion.div
      className='bg-gray-200 backdrop-blur-md shadow-lg rounded-xl p-6 border-black mt-10'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className='text-xl font-semibold text-sky-950'>Manage Residents</h1>

      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-sky-950'>All Users</h2>

        <div className='relative'>
          <input
            type='text'
            placeholder='Search Engine'
            onChange={e => setSearchItems(e.target.value)}
            value={searchItems}
            className='rounded-lg placeholder-sky-900 placeholder:p-5 focus:outline-none focus:ring-2 focus:ring-sky-800'
          />
        </div>

        <Link to={"/AddManageResidents"} className='mr-30 p-2 rounded-xl mt-1 bg-sky-950 text-white hover:bg-white hover:text-sky-900'>
          <button>+ Add Residents</button>
        </Link>
      </div>

      <div className='overflow-x-auto w-full max-w-full'>
        <table className='min-w-[900px] divide-y divide-grey-700'>
          <thead>
            <tr className='text-sky-950'>
              <th></th>
              <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Image</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Full Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Email</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Phone Number</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Estate</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>Plan</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-grey-400 uppercase tracking-wide'>House Address</th>
            </tr>
          </thead>
          <tbody className='min-w-full divide-y divide-grey-700'>
            {filteredResidents.map(user => {
              const fullName = `${user.first_name} ${user.last_name}`
              const initials = getInitials(user.first_name, user.last_name)
              return (
                <motion.tr
                  key={user.id}
                  className='bg-white hover:bg-gray-100'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>
                    <input type="checkbox" />
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>
                    <div className="w-10 h-10 rounded-full bg-sky-700 text-white flex items-center justify-center font-bold">
                      {initials}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{fullName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{user.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{user.profile?.phone_number}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{user.profile?.estate}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{user.profile?.plan}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900'>{user.profile?.house_address}</td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
};

export default Residents;