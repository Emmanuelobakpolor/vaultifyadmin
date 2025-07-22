import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useShopContext } from '../../context.jsx';

const EditAdmin = () => {
  const { backendUrl } = useShopContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    adminName: '',
    adminEmail: '',
    adminRole: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/getAdminById/${id}`, { withCredentials: true });
        setAdminData({
          adminName: response.data.adminName || '',
          adminEmail: response.data.adminEmail || '',
          adminRole: response.data.adminRole || '',
        });
      } catch (error) {
        toast.error('Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [id, backendUrl]);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${backendUrl}/api/admin/getAdminById/${id}`, adminData, { withCredentials: true });
      toast.success('Admin updated successfully');
      navigate('/Administration');
    } catch (error) {
      toast.error('Failed to update admin');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading admin data...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Edit Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="adminName" className="block mb-1 font-medium">Admin Name</label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            value={adminData.adminName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adminEmail" className="block mb-1 font-medium">Admin Email</label>
          <input
            type="email"
            id="adminEmail"
            name="adminEmail"
            value={adminData.adminEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="adminRole" className="block mb-1 font-medium">Admin Role</label>
          <select
            id="adminRole"
            name="adminRole"
            value={adminData.adminRole}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Role</option>
            <option value="Super-admin">Super-admin</option>
            <option value="Range-view admin">Range-view admin</option>
            <option value="Paradise admin">Paradise admin</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`w-full py-2 px-4 rounded text-white ${saving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditAdmin;
