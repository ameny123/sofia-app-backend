const express = require('express');
const router = express.Router();
const csvtojson = require('csvtojson');
const mongoose = require('mongoose');
const multer = require('../middleware/multer-config');
// Student model
const Students = require('../models/students');
const studentCSVModel = require('../models/studentsCSV');

const db = mongoose.connect('mongodb+srv://test:12345@cluster0.slvsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !', db))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// @route   GET /api/students/
// @desc    Get all students
// @access  Public
router.get('/', async (req, res) => {
  try {
    const students = await Students.find({});
    res.send({ students })
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   POST /api/students/
// @desc    Create a student
// @access  Public
router.post('/', multer, async (req, res) => {
  console.log('req', req);
  try {
    const newStudent = await Students.create({
      idS: req.body.idS,
      name: req.body.name,
      resumeref: req.body.resumeref,
      functionName: req.body.functionName,
      yearsofexp: req.body.yearsofexp,
      availability: req.body.availability,
      date: req.body.dateS,
      skills: req.body.skills,
      resume: `${req.protocol}://${req.get('host')}/resumes/${req.file.filename}`
    });
    res.send({ newStudent });
  } catch (err) {
    res.status(400).send({ error: err });
  }

});

// CSV file name
const fileName = "sample.csv";
var arrayToInsert = [];

// @route   POST /api/students/fromCSV
// @desc    Create a student
// @access  Public
router.post('/fromCSV', async (req, res) => {
  try {
    csvtojson().fromFile(fileName).then(source => {
      // Fetching the all data from each row
      for (var i = 0; i < source.length; i++) {
        var oneRow = {
          idS: source[i]['ID'],
          name: source[i]['Name'],
          resumeref: source[i]['Resume Ref'],
          functionName: source[i]['Function'],
          yearsofexp: source[i]['Years of experience'],
          availability: source[i]['Availability in Days'],
          date: source[i]['Date'],
          skills: source[i]['Main technologies'],
        };
        arrayToInsert.push(oneRow);
      }
      //inserting into the table “employees”
      var collectionName = "students";
      var collection = db.collection(collectionName);
      collection.insertMany(arrayToInsert, (err, result) => {
        if (err) console.log(err);
        if (result) {
          console.log('Import CSV into database successfully.');
        }
      });
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }

});

// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get('/:id', async (req, res) => {
  console.log('req.params.id', req.params.id);
  try {
    const student = await Students.find().where(resumeref, req.params.id);
    res.send({ student });
  } catch (err) {
    res.status(404).send({ message: 'Student not found!' });
  }
});



// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: 'The student was updated' });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeStudent = await Students.findByIdAndRemove(req.params.id);
    res.send({ message: 'The student was removed' });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});


module.exports = router;