const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  category: {
    type: String,
    unique: true,
    required: true
  },
  questions: {
    type: Object,
    required: true
  },
  finally: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const Question = mongoose.model('Question', QuizSchema);



module.exports = Question;