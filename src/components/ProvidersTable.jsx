import React from 'react';

function ProvidersTable({ serviceName, providers, onAddProviderClick, onEditProvider, onDeleteProvider }) {
  return (
    <>
      <div className='mt-6 ml-6 font-semibold text-sky-950 text-xl'>{serviceName}</div>
      <button
        onClick={onAddProviderClick}
        className="mb-4 ml-6 px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
      >
        Add Service Provider
      </button>
      <div>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Provider Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Email</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Phone</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Location</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Availability</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Service</th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {providers.map((provider, index) => (
              <tr key={index}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{provider.provider_name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{provider.email}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{provider.phone}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{provider.location}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{provider.availability}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {provider.service && provider.service.name ? provider.service.name : provider.service}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 space-x-2'>
                  <button
                    onClick={() => onEditProvider(provider)}
                    className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteProvider(provider)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProvidersTable;
