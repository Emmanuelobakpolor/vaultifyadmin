import React, { useState } from 'react'
import { motion } from "framer-motion"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Announcement() {
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  // Estate options based on role
  const estateOptions = []
  if (role.toLowerCase().includes('super-admin') || role.toLowerCase().includes('super admin')) {
    estateOptions.push('all')
    estateOptions.push('paradise estate')
    estateOptions.push('rangeview estate')
  } else if (role.toLowerCase().includes('paradise admin')) {
    estateOptions.push('paradise estate')
  } else if (role.toLowerCase().includes('range-view admin') || role.toLowerCase().includes('range admin')) {
    estateOptions.push('rangeview estate')
  } else {
    estateOptions.push('all') // default fallback
  }

  // Role options for visibility
  const roleOptions = ['residents', 'security']

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')
  const [publicDate, setPublicDate] = useState('')
  const [estate, setEstate] = useState(estateOptions[0])
  const [visibilityRole, setVisibilityRole] = useState(roleOptions[0])
  const [loading, setLoading] = useState(false)

  // Local backend API base URL and token (adjust token usage as needed)
  const baseUrl = 'https://vaultifybackend.onrender.com/api/'  // Assuming backend is proxied or same origin
  // Remove token or adjust if your backend requires authentication
  // const token = 'your_local_backend_token_if_any'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!estate) {
        toast.error('Please select an estate')
        setLoading(false)
        return
      }
      if (!visibilityRole) {
        toast.error('Please select a visibility role')
        setLoading(false)
        return
      }

      // Prepare estates to send alerts to
      let estatesToSend = []
      if (estate === 'all') {
        estatesToSend = ['paradise estate', 'rangeview estate', 'general']
      } else {
        estatesToSend = [estate]
      }

      // For each estate, create alert for the selected role
      for (const est of estatesToSend) {
        const payload = {
          title,
          category,
          message: body,
          public_date: publicDate,
          estate: est,
          role: visibilityRole
        }
        await axios.post(`${baseUrl}alerts/`, payload, {
          // Adjust headers if your backend requires authentication
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      toast.success('Announcement(s) sent successfully')
      // Clear form
      setTitle('')
      setCategory('')
      setBody('')
      setPublicDate('')
      setEstate(estateOptions[0])
      setVisibilityRole(roleOptions[0])
    } catch (error) {
      toast.error('Failed to send announcement: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-25 ml-5 pr-10 mb-20 '>
      <h1 className='ml-5 mb-5 font-bold'>
        Community Announcement
      </h1>
      <motion.div className='bg-white pb-20 p-5 justify-center self-center rounded-2xl shadow-xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={handleSubmit}>
          <h1 className='m-5 font-semibold'>
            <label>Announcement Title </label>
            <p>
              <input
                className='bg-gray-50 border-0.2 rounded-x w-lg p-1'
                placeholder='Descriptive title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </p>
          </h1>

          <h1 className='m-5 font-semibold'>
            <label>Category</label>
            <p>
              <input
                className='bg-gray-50 border-0.2 rounded-x w-lg p-1'
                type="text"
                placeholder='Maintenance Updates'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </p>
          </h1>

          <h1 className='m-5 font-semibold'>
            <label>Announcement Body</label>
            <p>
              <textarea
                className='bg-gray-50 border-0.2 rounded-x w-lg p-1 h-20'
                placeholder='Write your announcement here...'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </p>
          </h1>

          <h1 className='m-5 font-semibold'>
            <label>Public Date and Time</label>
            <p>
              <input
                className='bg-gray-50 border-0.2 rounded-x w-lg p-1'
                type="datetime-local"
                value={publicDate}
                onChange={(e) => setPublicDate(e.target.value)}
                required
              />
            </p>
          </h1>

          <h1 className='m-5 font-semibold'>
            <label>Estate</label>
            <p>
              <select
                className='bg-gray-50 border-0.2 rounded-x w-lg p-1'
                value={estate}
                onChange={(e) => setEstate(e.target.value)}
                required
              >
                {estateOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </p>
          </h1>

          <h1 className='m-5 font-semibold'>
            <label>Visibility Role</label>
            <p>
              <select
                className='bg-gray-50 border-0.2 rounded-x w-lg p-1'
                value={visibilityRole}
                onChange={(e) => setVisibilityRole(e.target.value)}
                required
              >
                {roleOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </p>
          </h1>

          <div className="item-center justify-center">
            <button
              className='bg-sky-800 rounded-2xl p-2 text-white'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Publish'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Announcement
