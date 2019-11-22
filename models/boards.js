const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  boardName:{type:String,required: true},
  assignedTo:[String],/* users that are assigned*/
  tasks: [String],
  startDate: Date,
  endDate: Date
},
{timestamp:true});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
