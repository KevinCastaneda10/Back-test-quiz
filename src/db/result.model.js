const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  end: {
    type: Boolean,
    required: true
  },
  success: {
    type: Number,
    required: true
  },
  errors: {
    type: Number,
    required: true
  },
  porcent: {
    type: String,
    required: true
  },
});

const Result = mongoose.model('Result', ResultSchema);

module.exports = Result;