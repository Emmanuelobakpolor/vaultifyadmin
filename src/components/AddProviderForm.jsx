import React, { useState, useEffect } from 'react';

function AddProviderForm({ serviceName, onAdd, onCancel, initialData, onUpdate }) {
  const [formData, setFormData] = useState({
    provider_name: '',
    email: '',
    phone: '',
    location: '',
    availability: '',
    service: serviceName || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        provider_name: initialData.provider_name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        location: initialData.location || '',
        availability: initialData.availability || '',
        service: serviceName || '',
      });
    }
  }, [initialData, serviceName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setFormData({
      provider_name: '',
      email: '',
      phone: '',
      location: '',
      availability: '',
      service: serviceName || '',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? `Edit Provider for ${serviceName}` : `Add Provider for ${serviceName}`}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Provider Name</label>
            <input
              type="text"
              name="provider_name"
              value={formData.provider_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
            >
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProviderForm;
