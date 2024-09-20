import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import EmployeeForm from './components/Employee/EmployeeForm';
import EmployeeList from './components/Employee/EmployeeList';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/add-employee" element={<EmployeeForm />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/dashboard" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;