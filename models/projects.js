const mongoose = require('mongoose');

const projectBoardSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true
  },
  team: String,
  tasks: [String],
  startDate: Date,
  endDate: Date

}, {
  timestamp: true
});

const Project = mongoose.model('Project', projectBoardSchema);

module.exports = Project;
