import React from 'react';
import { motion } from "framer-motion";
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';

const fetchCount = async (url, token) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    console.log('Fetch count response from', url, ':', response.data);
    if (typeof response.data === 'number') {
      return response.data;
    }
    if (response.data.count !== undefined) {
      return response.data.count;
    }
    // Try to find a count property in response.data if nested
    for (const key in response.data) {
      if (typeof response.data[key] === 'number') {
        return response.data[key];
      }
    }
    console.warn(`No valid count found in response from ${url}`, response.data);
    return 0;
  } catch (error) {
    console.error(`Error fetching count from ${url}:`, error.response ? error.response.data : error.message);
    throw error; // Let useQuery handle the error
  }
};

function Aggregation() {
  const user = useSelector(state => state.user.user);
  const role = user?.adminRole || "";
  
  // Common base URL and token for all roles
  const baseUrl = 'https://vaultify-43wm.onrender.com/api/';
  const token = 'd16f04698426f46c3fa7c67529f07321c24d4726';

  // Define role-specific endpoints
  const endpoints = {
    'Super-admin': {
      residentCount: `${baseUrl}residence-users/count/`,
      securityCount: `${baseUrl}security-personnel-users/count/`,
      pendingAccessCount: `${baseUrl}access-code/unapproved-count/`,
      visitorsCount: `${baseUrl}access-code/verified-count/`,
      alertsCount: `${baseUrl}alerts/count/`,
      lostFoundCount: `${baseUrl}lostfound/count/`
    },
    'Paradise admin': {
      residentCount: `${baseUrl}residence-users/count/by-estate/?estate=Paradise Estate`,
      securityCount: `${baseUrl}security-personnel-users/count/by-estate/?estate=Paradise Estate`,
      pendingAccessCount: `${baseUrl}access-code/unapproved-count/by-estate/?estate=Paradise Estate`,
      visitorsCount: `${baseUrl}access-code/verified-count/by-estate/?estate=Paradise Estate`,
      alertsCount: `${baseUrl}alerts/count/by-estate/?estate=Paradise Estate`,
      lostFoundCount: `${baseUrl}lostfound/count/by-estate/?estate=Paradise Estate`
    },
    'Range-view admin': {
      residentCount: `${baseUrl}residence-users/count/by-estate/?estate=Range View Estate`,
      securityCount: `${baseUrl}security-personnel-users/count/by-estate/?estate=Range View Estate`,
      pendingAccessCount: `${baseUrl}access-code/unapproved-count/by-estate/?estate=Range View Estate`,
      visitorsCount: `${baseUrl}access-code/verified-count/by-estate/?estate=Range View Estate`,
      alertsCount: `${baseUrl}alerts/count/by-estate/?estate=Range View Estate`,
      lostFoundCount: `${baseUrl}lostfound/count/by-estate/?estate=Range View Estate`
    }
  };

  // Select endpoints based on role, default to Super admin if role not found
  const currentEndpoints = endpoints[role] || endpoints['Super admin'];

  const { data: residentCount, isLoading: loadingResidents, error: errorResidents } = useQuery('residentCount', () => fetchCount(currentEndpoints.residentCount, token));
  const { data: securityCount, isLoading: loadingSecurity, error: errorSecurity } = useQuery('securityCount', () => fetchCount(currentEndpoints.securityCount, token));
  const { data: pendingAccessCount, isLoading: loadingPendingAccess, error: errorPendingAccess } = useQuery('pendingAccessCount', () => fetchCount(currentEndpoints.pendingAccessCount, token));
  const { data: visitorsCount, isLoading: loadingVisitors, error: errorVisitors } = useQuery('visitorsCount', () => fetchCount(currentEndpoints.visitorsCount, token));
  const { data: alertsCount, isLoading: loadingAlerts, error: errorAlerts } = useQuery('alertsCount', () => fetchCount(currentEndpoints.alertsCount, token));
  const { data: lostFoundCount, isLoading: loadingLostFound, error: errorLostFound } = useQuery('lostFoundCount', () => fetchCount(currentEndpoints.lostFoundCount, token));

  if (
    loadingResidents || loadingSecurity || loadingPendingAccess || loadingVisitors || loadingAlerts || loadingLostFound
  ) {
    return <div className="p-6 text-center text-sky-950">Loading dashboard data...</div>;
  }

  if (
    errorResidents || errorSecurity || errorPendingAccess || errorVisitors || errorAlerts || errorLostFound
  ) {
    return <div className="p-6 text-center text-red-600">Error loading dashboard data. Please refresh or contact the developer .</div>;
  }

  const DASHBOARD = [
    { name: "Registered Residents", total: residentCount, red: "Total Registered Residents" },
    { name: "Security Staff", total: securityCount, red: "Total number of Security Staff" },
  ];

  if (!role.includes("Super-admin")) {
    DASHBOARD.push(
      { name: "Alerts Raised", total: alertsCount, red: "Alerts Count" },
       { name: "Total No Of Lost and Found", total: lostFoundCount, red: "Lost and Found Count" },
             { name: "Total No Of Visitors Checked", total: visitorsCount, red: "Visitors Count" },
                 { name: "Pending Access Approvals", total: pendingAccessCount, red: "Pending Access Approvals" },



    );
  }

  return (
    <motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 flex-wrap mr-5'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {DASHBOARD.map((item) => (
        <motion.div key={item.name} className='bg-white rounded-lg shadow-cyan-100 shadow-md p-4 mb-4 w-60'
          whileHover={{ y: -5, boxShadow: "0 25px 50px -12px " }}
        >
          <h2 className='text-black font-semibold'>{item.name}</h2>
          <p className='text-2xl font-bold'>{item.total || 0}</p>
          <p className='text-gray-600 bg-gray-200 p-2 text-xs mr-5'>{item.red}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Aggregation;