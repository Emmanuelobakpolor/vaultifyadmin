import React from 'react';

const Preloader = () => {
  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <span className="ml-4 text-blue-600 font-semibold">Loading...</span>
    </div>
  );
};

export default Preloader;
