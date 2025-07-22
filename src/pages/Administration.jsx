import React, { useState, useEffect } from 'react';
import search from "../assets/images/search.png";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import person from "../assets/images/person.png";
import { useQuery } from "react-query";
import axios from "axios";
import { useShopContext } from '../context';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IsNotSuperAdmin } from '../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';

function Administration() {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { backendUrl } = useShopContext();

  const [searchItems, setSearchItems] = useState("");
  const [filterAdmins, setFilterAdmins] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Removed role-based access restriction to allow all roles to view the page
  // Fetch all paradise and range-view admins for all users
  const { data, isLoading, error, refetch } = useQuery("admin", () => {
    return axios.get(backendUrl + `/admin/getParadiseAndRangeViewAdmins?currentRole=${user.adminRole}`, {
      withCredentials: true,
    });
  });

  // Update filterAdmins when data or searchItems change
  useEffect(() => {
    if (data?.data) {
      const admins = data.data.admins || data.data;
      const filtered = admins.filter(admin =>
        admin.adminName.toLowerCase().includes(searchItems.toLowerCase())
      );
      setFilterAdmins(filtered);
    }
  }, [data, searchItems]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchItems(e.target.value);
  };

  // Single select admin for deletion
  const handleSingleSelect = (id) => {
    setSelectedAdmins((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((adminId) => adminId !== id)
        : [...prevSelected, id]
    );
  };

  // Confirm before deleting a single admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    if (!user.adminRole.includes("Super-admin")) {
      return toast.error("You are not authorized to delete admins");
    }

    try {
      setIsDeleting(true);
      await axios.delete(`${backendUrl}/admin/deleteAdmin/${id}`);
      toast.success("Admin Deleted Successfully", {
        theme: "colored",
        style: { backgroundColor: "#22c55e", color: "#fff", fontWeight: "bold" }
      });
      refetch();
      setSelectedAdmins(selectedAdmins.filter(adminId => adminId !== id));
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
        style: { backgroundColor: "#ef4444", color: "#fff", fontWeight: "bold" }
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Confirm before bulk delete
  const handleBulkDelete = async () => {
    if (selectedAdmins.length === 0) {
      return toast.info("No admins selected for deletion");
    }
    if (!window.confirm(`Are you sure you want to delete ${selectedAdmins.length} selected admins?`)) return;

    if (!user.adminRole.includes("Super-admin")) {
      return toast.error("You are not authorized to delete admins");
    }

    try {
      setIsDeleting(true);
      await Promise.all(
        selectedAdmins.map((id) =>
          axios.delete(`${backendUrl}/admin/deleteAdmin/${id}`)
        )
      );
      toast.success("Selected Admins Deleted", {
        theme: "colored",
        style: { backgroundColor: "#22c55e", color: "#fff", fontWeight: "bold" }
      });
      refetch();
      setSelectedAdmins([]);
    } catch (error) {
      toast.error("Failed to delete selected admins", {
        theme: "colored",
        style: { backgroundColor: "#ef4444", color: "#fff", fontWeight: "bold" }
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Loading and error UI
  if (isLoading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-600">Error loading admins: {error.message}</p>;

  return (
    <motion.div className='bg-gray-200 backdrop-blur-md shadow-lg rounded-xl p-4 border-black mt-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h1 className='text-xl font-semibold text-sky-950 mb-4'>Manage Admin</h1>

      <div className='flex flex-col md:flex-row justify-between items-center mb-4 gap-4'>
        <h2 className='text-xl font-semibold text-sky-950'>All Admin</h2>

        <div className='relative flex-1 max-w-xs'>
          <input
            type='text'
            placeholder='Search Admin'
            onChange={handleSearch}
            value={searchItems}
            className='rounded-lg placeholder-sky-900 pl-10 py-1 focus:outline-none focus:ring-2 focus:ring-sky-800 w-full'
          />
          <img src={search} alt="search" className='absolute left-2 top-1/2 transform -translate-y-1/2 w-4' />
        </div>

        <div className='flex gap-2'>
          <button
            onClick={handleBulkDelete}
            disabled={selectedAdmins.length === 0 || isDeleting}
            className={`p-2 rounded-xl ${selectedAdmins.length === 0 || isDeleting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-red-700 hover:bg-red-800 text-white cursor-pointer'
              }`}
          >
            {isDeleting ? "Deleting..." : "Delete Selected"}
          </button>
          {user.adminRole === "Super-admin" && (
            <button>
              <Link to={"/AddAmin"} className='p-2 rounded-xl bg-sky-950 text-white hover:bg-white hover:text-sky-900'>
                + Add Admin
              </Link>
            </button>
          )}
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-700'>
          <thead>
            <tr className='text-sky-950'>
              <th className='px-4 py-2'>
                <input
                  type="checkbox"
                  checked={selectedAdmins.length === filterAdmins.length && filterAdmins.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAdmins(filterAdmins.map(admin => admin._id));
                    } else {
                      setSelectedAdmins([]);
                    }
                  }}
                />
              </th>
              <th className='px-6 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>Image</th>
              <th className='px-6 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>Admin Name</th>
              <th className='px-6 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>Admin Role</th>
              <th className='px-6 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>Delete</th>
              <th className='px-6 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wide'>Edit</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-700'>
            {filterAdmins?.map((admin) => (
              <motion.tr
                key={admin._id}
                className="bg-white hover:bg-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedAdmins.includes(admin.id)}
                    onChange={() => handleSingleSelect(admin.id)}
                  />
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <img src={person} alt="admin" className="w-8 h-8 rounded-full" />
                </td>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {admin.adminName}
                  <p className="text-gray-500 text-xs">{admin.adminEmail}</p>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">{admin.adminRole}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(admin.id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:bg-red-700 hover:text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <Link to={`/EditAdmins/${admin.id}`}>
                    <button className="text-green-600 hover:bg-green-700 hover:text-white px-2 py-1 rounded text-sm">
                      Edit
                    </button>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Administration;