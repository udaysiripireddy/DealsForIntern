const express = require('express');
const { createEmployee, getEmployees } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/employee', authMiddleware, createEmployee);
router.get('/employees', authMiddleware, getEmployees);

module.exports = router;
