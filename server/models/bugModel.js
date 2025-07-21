// models/bugModel.js
const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A bug must have a title'],
    trim: true,
    maxlength: [100, 'Title must be ≤ 100 chars']
  },
  description: {
    type: String,
    required: [true, 'A bug must have a description']
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    // removed required validation for quick testing
    // required: [true, 'A bug must belong to a project']
  },
  reporter: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    // removed required validation for quick testing
    // required: [true, 'A bug must have a reporter']
  },
  assignee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Update timestamp on save
bugSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
