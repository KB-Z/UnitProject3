const express = require('express');
const router = express.Router();
const Project = require('../models/projects.js');
const User = require('../models/users.js');
///getting all the projects for showing
router.get('/', (req, res) => {
  Project.find({}, (err, projectList) => {
      res.json(projectList);
  })
})

////to create new projects
router.post('/', (req, res) => {
  Project.create(req.body, (error, createdProject) => {
      res.json(createdProject);
  });
})

module.exports = router;
