import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import not from "../assets/images/not.png"
import { useSelector } from 'react-redux';

function Notifications() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  // Normalize role string for consistent checks
  const normalizedRole = role.toLowerCase().trim();

  // If user is super-admin, do not render notifications
  if (normalizedRole.includes("super-admin") || normalizedRole.includes("super admin")) {
    return null;
  }

  // Common base URL and token for all roles
  const baseUrl = 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  // Define role-specific endpoints with normalized keys
  const endpoints = {
    'super admin': `${baseUrl}alerts/all/`,
    'paradise admin': `${baseUrl}alerts/?estate=Paradise Estate`,
    'range-view admin': `${baseUrl}alerts/?estate=Range View Estate`
  };

  // Select endpoint based on normalized role, default to super admin if role not found
  const currentEndpoint = endpoints[normalizedRole] || endpoints['super admin'];

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(currentEndpoint, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch alerts')
        }
        const data = await response.json()
        setAlerts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAlerts()
  }, [currentEndpoint, token])

  return (
    <>
      <div className='bg-gray-200 max-w-xs backdrop-blur-md shadow-2xl shadow-x h-auto p-5 rounded-xl border-grey-700'>
        <h1 className="text-2xl font-semibold mb-2">
          Recent Notifications
        </h1>
        <h2 className='text-xl mb-4'>General</h2>

        {loading && <p className="text-gray-600">Loading notifications...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && alerts.length === 0 && (
          <p className="text-gray-600">No notifications available.</p>
        )}

        {!loading && !error && alerts.slice(0, 3).map((item, index) => (
          <motion.div key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            <div className='p-3 rounded-xl bg-white m-2 flex items-center shadow-md hover:shadow-lg transition-shadow cursor-pointer'>
              <div className='m-3 bg-blue-100 p-2 rounded-lg'>
                <img className='w-8' src={not} alt="notification icon" />
              </div>
              <div>
                <h2 className='font-semibold text-lg'>{item.alert_type || item.name || item.title || 'Alert'}</h2>
                <p className='text-gray-600'>{item.message || 'No message provided'}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default Notifications;