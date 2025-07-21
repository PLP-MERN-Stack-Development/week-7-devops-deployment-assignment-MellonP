// controllers/bugController.js
const Bug = require('../models/bugModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createBug = async (req, res) => {
  try {
    const { title, description } = req.body;

    const bug = new Bug({
      title,
      description,
      status: 'open',
      createdAt: new Date()
    });

    await bug.save();

    res.status(201).json({
      success: true,
      message: 'Bug reported successfully',
      bug
    });
  } catch (error) {
    console.error('Bug creation failed:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to report bug, please try again later'
    });
  }
};

// Get all bugs
exports.getAllBugs = catchAsync(async (req, res, next) => {
  const bugs = await Bug.find().sort({ createdAt: -1 }); // Newest first
  
  res.status(200).json({
    status: 'success',
    results: bugs.length,
    data: {
      bugs
    }
  });
});

// Get single bug
exports.getBug = catchAsync(async (req, res, next) => {
  const bug = await Bug.findById(req.params.id);
  
  if (!bug) {
    return next(new AppError('No bug found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      bug
    }
  });
});

// Update bug
exports.updateBug = catchAsync(async (req, res, next) => {
  const bug = await Bug.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, // Return updated document
      runValidators: true // Validate update against schema
    }
  );

  if (!bug) {
    return next(new AppError('No bug found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      bug
    }
  });
});

// Delete bug
exports.deleteBug = catchAsync(async (req, res, next) => {
  const bug = await Bug.findByIdAndDelete(req.params.id);

  if (!bug) {
    return next(new AppError('No bug found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get bugs by status
exports.getBugsByStatus = catchAsync(async (req, res, next) => {
  const bugs = await Bug.find({ status: req.params.status });
  
  res.status(200).json({
    status: 'success',
    results: bugs.length,
    data: {
      bugs
    }
  });
});

// Get bugs by project
exports.getBugsByProject = catchAsync(async (req, res, next) => {
  const bugs = await Bug.find({ project: req.params.projectId });
  
  res.status(200).json({
    status: 'success',
    results: bugs.length,
    data: {
      bugs
    }
  });
});