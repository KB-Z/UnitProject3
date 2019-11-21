const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: true,
		/*
		Because ALL boards will be in the database,
		I don't think it should be unique.
		otherwise only one person will have the to-do list.
		anyways, each Board will have a unique ID.
		*/
    //unique: true
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
