import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import plier from "../assets/images/plier.png";
import ProvidersTable from "../components/ProvidersTable";
import AddProviderForm from "../components/AddProviderForm";
import { useShopContext } from "../context";

const SERVICES = [
  "Cleaning Service",
  "Plumbing Service",
  "Electrical Service",
  "Pest Control",
  "Appliance Repair",
  "Landscaping/Gardening",
  "Security Service",
  "General Maintenance",
  "Fire Fighters",
];

function ServiceBooking() {
  const [selectedService, setSelectedService] = useState(null);
  const [providers, setProviders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);

  const user = useSelector((state) => state.user.user);
  const adminId = user ? user.id : null;

  const { backendUrl } = useShopContext();

  useEffect(() => {
    if (selectedService && adminId) {
      fetch(`${backendUrl}/api/providers/?service_name=${encodeURIComponent(selectedService)}&admin_id=${adminId}`)
        .then((res) => res.json())
        .then((data) => {
          setProviders(data);
        })
        .catch((err) => console.error("Failed to fetch providers:", err));
    } else {
      setProviders([]);
    }
  }, [selectedService, adminId, backendUrl]);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowAddForm(false);
    setEditingProvider(null);
  };

  const handleAddProviderClick = () => {
    setShowAddForm(true);
    setEditingProvider(null);
  };

  const handleAddProvider = (newProvider) => {
    if (!adminId) {
      alert("Admin not logged in");
      return;
    }
    fetch(`${backendUrl}/api/providers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider_name: newProvider.provider_name,
        email: newProvider.email,
        phone: newProvider.phone,
        location: newProvider.location,
        availability: newProvider.availability,
        service_name: selectedService,
        admin_id: adminId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add provider");
        }
        return res.json();
      })
      .then((addedProvider) => {
        setProviders((prev) => [...prev, addedProvider]);
        setShowAddForm(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to add provider");
      });
  };

  const handleUpdateProvider = (updatedProvider) => {
    if (!adminId || !editingProvider) {
      alert("Admin not logged in or no provider selected for update");
      return;
    }
    fetch(`${backendUrl}/api/providers/${editingProvider.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provider_name: updatedProvider.provider_name,
        email: updatedProvider.email,
        phone: updatedProvider.phone,
        location: updatedProvider.location,
        availability: updatedProvider.availability,
        service_id: editingProvider.service.id,
        admin: adminId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update provider");
        }
        return res.json();
      })
      .then((data) => {
        setProviders((prev) =>
          prev.map((provider) => (provider.id === data.id ? data : provider))
        );
        setShowAddForm(false);
        setEditingProvider(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update provider");
      });
  };

  const handleDeleteProvider = (provider) => {
    if (!adminId) {
      alert("Admin not logged in");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete provider ${provider.provider_name}?`)) {
      return;
    }
    fetch(`${backendUrl}/api/providers/${provider.id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete provider");
        }
        setProviders((prev) => prev.filter((p) => p.id !== provider.id));
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete provider");
      });
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setEditingProvider(null);
  };

  const handleEditProvider = (provider) => {
    setEditingProvider(provider);
    setShowAddForm(true);
  };

  return (
    <div className="mt-25 ">
      <h1 className="text-xl ml-10 text-sky-900 font-semibold">Service Booking</h1>
      <div className="flex flex-wrap gap-5 ml-5">
        {SERVICES.map((service) => (
          <div key={service} className="flex">
            <button
              onClick={() => handleServiceClick(service)}
              className={`flex bg-white-950 shadow text-sky-900 p-5 rounded-xl hover:bg-sky-900 hover:text-white ${
                selectedService === service ? "bg-sky-900 text-white" : ""
              }`}
            >
              <img className="w-5 mr-2" src={plier} alt="icon" />
              <h1>{service}</h1>
            </button>
          </div>
        ))}
      </div>
      {selectedService && (
        <ProvidersTable
          serviceName={selectedService}
          providers={providers}
          onAddProviderClick={handleAddProviderClick}
          onEditProvider={handleEditProvider}
          onDeleteProvider={handleDeleteProvider}
        />
      )}
      {showAddForm && (
        <AddProviderForm
          serviceName={selectedService}
          onAdd={handleAddProvider}
          onCancel={handleCancelAdd}
          initialData={editingProvider}
          onUpdate={handleUpdateProvider}
        />
      )}
    </div>
  );
}

export default ServiceBooking;

