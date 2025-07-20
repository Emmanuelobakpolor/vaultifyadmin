import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useShopContext } from '../context';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditAdmins() {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const navigate = useNavigate()
  const { backendUrl } = useShopContext();
  const { id } = useParams();
const { user } = useSelector(state => state.user)
  const { data, error, isLoading } = useQuery("singleAdmin", () =>
    axios.get(`${backendUrl}/api/admin/getAdminById/${id}`).then(res => res.data)
  );

  useEffect(() => {
    if (data) {
      const { adminName, adminEmail, adminRole } = data;
      setAdminName(adminName);
      setAdminEmail(adminEmail);
      setAdminRole(adminRole);
    }
  }, [data]);

  const editAdmin = async (e) => {
    e.preventDefault();
      try {
          if(!user.adminRole.includes("Super-admin")){
              return toast.error("You are not authorized to Edit admins")
            }
        
        await axios.put(`${backendUrl}/api/admin/getAdminById/${id}`, {
          adminName,
          adminEmail,
          adminRole,
        });

        toast.success("Admin updated successfully!");
        navigate("/Administration")
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while updating.");
      }
  };

  if (isLoading) return <div className="p-5">Loading...</div>;
  if (error) return <div className="p-5 text-red-600">Error fetching admin data.</div>;

  return (
    <div className="mt-24 ml-5 pr-10 mb-20">
      <h1 className="ml-5 mb-5 font-bold text-xl">Edit Admin</h1>

      <motion.div
        className="bg-white p-5 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={editAdmin}>
          <div className="m-5 font-semibold">
            <label>Admin Name</label>
            <input
              className="bg-gray-50 border border-gray-300 rounded-xl w-full p-2"
              placeholder="Admin Name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </div>

          <div className="m-5 font-semibold">
            <label>Admin Role</label>
            <input
              className="bg-gray-50 border border-gray-300 rounded-xl w-full p-2"
              type="text"
              placeholder="Admin Role"
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
            />
          </div>

          <div className="m-5 font-semibold">
            <label>Email Address</label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 rounded-xl w-full p-2"
              placeholder="Enter Email Address"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center mt-5">
            <button className="bg-sky-800 rounded-2xl px-6 py-2 text-white" type="submit">
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EditAdmins;
