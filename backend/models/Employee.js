const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  uniqueId:{type:Number, required:true},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
