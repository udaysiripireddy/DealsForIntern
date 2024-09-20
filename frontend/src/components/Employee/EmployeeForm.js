import React, { useState } from 'react';
import axios from '../axiosConfig';

const EmployeeForm = () => {
  const [uniqueId, setUniqueId] = useState('');  // Changed to 'uniqueid' to match backend
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [image, setImage] = useState('');

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    
    // Convert course to array (assuming comma-separated string input)
    const courseArray = course.split(',').map(c => c.trim());

    try {
      await axios.post('/employee', {
        uniqueId,  // Ensure the key is 'uniqueid'
        name,
        email,
        mobile,
        designation,
        gender,
        course: courseArray,  // Send course as an array
        image
      });
      alert('Employee added successfully');
      
      // Reset form fields
      setUniqueId('');
      setName('');
      setEmail('');
      setMobile('');
      setDesignation('');
      setGender('');
      setCourse('');
      setImage('');
    } catch (error) {
      console.error('Error adding employee:', error.response ? error.response.data : error.message);
      alert(`Error adding employee: ${error.response ? error.response.data.message : 'Internal Server Error'}`);
    }
  };

  return (
    <form onSubmit={handleAddEmployee} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Employee</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Unique ID:</label>
        <input
          type="text"
          placeholder="Unique ID"
          value={uniqueId}  // Use 'uniqueid'
          onChange={(e) => setUniqueId(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Mobile No:</label>
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Designation:</label>
        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Gender:</label>
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Course (comma separated):</label>
        <input
          type="text"
          placeholder="Courses (comma separated)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Image URL:</label>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
