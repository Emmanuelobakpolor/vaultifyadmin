import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FaBoxOpen } from 'react-icons/fa';
import Preloader from '../components/Preloader';

function LostAndFound() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);
  const role = user?.adminRole || '';

  const baseUrl = 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  const endpoints = {
    'Super admin': `${baseUrl}lostfound/all/`,
    'Paradise admin': `${baseUrl}lostfound/?estate=Paradise Estate`,
    'Range-view admin': `${baseUrl}lostfound/?estate=Range View Estate`,
  };

  const currentEndpoint = endpoints[role] || endpoints['Super admin'];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(currentEndpoint, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch lost and found details');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [currentEndpoint]);

  if (loading) return <Preloader />;
  if (error) return <div className="text-red-600 text-center mt-10">Error: {error}</div>;

  return (
   <motion.div
  className="w-full bg-white rounded-xl p-8 shadow-xl mt-10 overflow-x-auto"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <h1 className="text-3xl font-bold text-gray-800 mb-8">Lost and Found </h1>

  <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
    <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
      <tr>
        <th className="px-6 py-3 border">Icon</th>
        <th className="px-6 py-3 border">Description</th>
        <th className="px-6 py-3 border">Type</th>
        <th className="px-6 py-3 border">Date Reported</th>
        <th className="px-6 py-3 border">Location</th>
        <th className="px-6 py-3 border">Contact</th>
        <th className="px-6 py-3 border">Status</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, i) => (
        <motion.tr
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          className="hover:bg-gray-50 transition-all"
        >
          <td className="px-6 py-4 text-blue-600 text-center">
            <FaBoxOpen className="mx-auto text-2xl" />
          </td>
          <td className="px-6 py-4">{item.description || 'N/A'}</td>
          <td className="px-6 py-4">{item.item_type || 'N/A'}</td>
          <td className="px-6 py-4">{new Date(item.date_reported).toLocaleDateString() || 'N/A'}</td>
          <td className="px-6 py-4">{item.location || 'N/A'}</td>
          <td className="px-6 py-4">{item.contact_info || 'N/A'}</td>
          <td className="px-6 py-4">
            <span
              className={`px-3 py-1 rounded-full text-white text-xs font-bold ${
                item.item_type?.toLowerCase() === 'lost'
                  ? 'bg-red-600'
                  : item.item_type?.toLowerCase() === 'found'
                  ? 'bg-green-600'
                  : 'bg-gray-500'
              }`}
            >
              {item.item_type?.toUpperCase() || 'N/A'}
            </span>
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</motion.div>
  );
}

export default LostAndFound;
