const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  idS: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  resumeref: {
    type: String,
    required: true,
    trim: true
  },
  functionName: {
    type: String,
    required: true,
    trim: true
  },
  yearsofexp: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  availability: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: String,
    required: true,
    trim: true
  },
});

module.exports = mongoose.model('students', studentSchema);



