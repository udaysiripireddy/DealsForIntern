import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
    // Redirect to login page or update state
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-white tracking-wide hover:text-blue-300 transition duration-200">
        Employee Management
      </h1>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
