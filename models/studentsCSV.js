const mongoose = require('mongoose');

const studentCSVSchema = new mongoose.Schema({
  ID: {
    type: String,
  },
  Name: {
    type: String,
  },
  Resume_Ref: {
    type: String,
  },
  Function: {
    type: String,
  },
  yearsofexp: {
    type: Number,
  },
  availability: {
    type: String,
  },
  date: {
    type: String,
  },
  skills: {
    type: String,
  },
});

module.exports = mongoose.model('studentCSVModel', studentCSVSchema);



