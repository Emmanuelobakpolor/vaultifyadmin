import React from 'react';
import { motion } from "framer-motion";
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const fetchCount = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    if (typeof response.data === 'number') {
      return response.data;
    }
    if (response.data.count !== undefined) {
      return response.data.count;
    }
    for (const key in response.data) {
      if (typeof response.data[key] === 'number') {
        return response.data[key];
      }
    }
    return 0;
  } catch (error) {
    throw error;
  }
};

function AnnualUserCount() {
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";

  const baseUrl = 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  const endpoints = {
    'Super-admin': {
      residentCount: `${baseUrl}residence-users/count/`,
      securityCount: `${baseUrl}security-personnel-users/count/`
    },
    'Paradise admin': {
      residentCount: `${baseUrl}residence-users/count/by-estate/?estate=Paradise Estate`,
      securityCount: `${baseUrl}security-personnel-users/count/by-estate/?estate=Paradise Estate`
    },
    'Range-view admin': {
      residentCount: `${baseUrl}residence-users/count/by-estate/?estate=Range View Estate`,
      securityCount: `${baseUrl}security-personnel-users/count/by-estate/?estate=Range View Estate`
    }
  };

  const currentEndpoints = endpoints[role] || endpoints['Super-admin'];

  const { data: residentCount = 0, isLoading: loadingResidents } = useQuery('residentCount', () => fetchCount(currentEndpoints.residentCount, token));
  const { data: securityCount = 0, isLoading: loadingSecurity } = useQuery('securityCount', () => fetchCount(currentEndpoints.securityCount, token));

  if (loadingResidents || loadingSecurity) {
    return <div className="p-6 text-center text-sky-950">Loading annual user count...</div>;
  }

  const totalCount = residentCount + securityCount;

  const monthlyData = Array(12).fill(totalCount / 12);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'User Count',
        data: monthlyData,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Annual User Count Trend' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-4 text-center"
      >
        <h2 className="text-2xl font-bold">Annual User Count</h2>
        <p className="text-4xl font-extrabold text-blue-600">{totalCount}</p>
      </motion.div>
      <Bar options={options} data={data} />
    </div>
  );
}

export default AnnualUserCount;
