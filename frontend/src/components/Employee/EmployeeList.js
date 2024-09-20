import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        const response = await axios.get('http://localhost:5000/api/employees', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });
        setEmployees(response.data); // Set employees data
        setFilteredEmployees(response.data); // Set initial filtered employees to all employees
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized. Please log in again.');
          navigate('/login'); // Redirect to login page on 401
        } else {
          setError('Error fetching employees.');
        }
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword) ||
      emp.mobile.toLowerCase().includes(keyword) ||
      emp.designation.toLowerCase().includes(keyword)
    );

    setFilteredEmployees(filtered);
  };

  const handleCreateEmployee = () => {
    navigate('/add-employee');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold">Admin</span>
        <button 
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200" 
          onClick={() => navigate('/login')}
        >
          Logout
        </button>
      </div>

      {/* Employee Count and Create Employee */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Employee List</h2>
        <span className="text-gray-600">Total Count: {filteredEmployees.length}</span>
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200" 
          onClick={handleCreateEmployee}
        >
          Create Employee
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={search}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* Employee Table */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Unique ID</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Mobile No</th>
            <th className="py-2 px-4 border-b">Designation</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Create Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{employee.uniqueId}</td>
                <td className="py-2 px-4 border-b">
                  <img src={employee.image} alt="Employee" className="h-10 w-10 rounded-full" />
                </td>
                <td className="py-2 px-4 border-b">{employee.name}</td>
                <td className="py-2 px-4 border-b">
                  <a href={`mailto:${employee.email}`} className="text-blue-600 hover:underline">
                    {employee.email}
                  </a>
                </td>
                <td className="py-2 px-4 border-b">{employee.mobile}</td>
                <td className="py-2 px-4 border-b">{employee.designation}</td>
                <td className="py-2 px-4 border-b">{employee.gender}</td>
                <td className="py-2 px-4 border-b">{employee.course}</td>
                <td className="py-2 px-4 border-b">{new Date(employee.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-200">Edit</button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-200 ml-2">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
