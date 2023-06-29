const Ticket = require('../models/ticketModel'); // Import the ticket model
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
// Create a new ticket with these pieces of information; title, description, contactinformation, created timestamp, latest ticket update timestamp
// Update a ticket’s information and status (pending, accepted, resolved, rejected).

exports.createTicket = catchAsync(async (req, res, next) => {
  const newTicket = await Ticket.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      newTicket
    }
  });
});

// Get all tickets
exports.getAllTickets = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Ticket.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tickets = await features.query;

  const results = new APIFeatures(Ticket.find(), req.query)
    .filter()
    .limitFields()
  const totalRecords = await results.query;


  res.status(200).json({
    status: 'success',
    results: tickets.length,
    totalRecords: totalRecords.length,
    data: {
      tickets
    }
  });
});

//update status
exports.updateStatus = catchAsync(async (req, res, next) => {
  const update = await Ticket.findByIdAndUpdate(req.params.id, {
    status: req.body.status,
    latestupdate: Date.now()
  });

  const ticket = await Ticket.findById(req.params.id);

  if (!update) {
    return next(new AppError('No tour found with that ID', 404));
  }

  console.log(ticket);
  res.status(200).json({
    status: 'success',
    data: {
      ticket
    }
  });
});
