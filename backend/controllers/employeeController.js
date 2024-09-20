const Employee = require('../models/employee');

exports.createEmployee = async (req, res) => {
  const { uniqueId, name, email, mobile, designation, gender, course, image } = req.body;

  if (!uniqueId || !name || !email || !mobile || !designation || !gender || !course || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEmployee = new Employee({ uniqueId, name, email, mobile, designation, gender, course, image });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email or uniqueid already exists' });
    }
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees', error });
  }
};
