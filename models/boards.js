const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: true,
    unique: true
  },
  assignedTo:[String],/* users that are assigned*/
  tasks: Array,
  startDate: Date,
  endDate: Date

}, {
  timestamp: true
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
