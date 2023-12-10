const mongoose = require('mongoose');

//mongoose schema for the tickets collection
const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    type: {
      type: String,
    },
    FullName: {
      type: String,
    },
    department: {
      type: String,
    },
    id_user: mongoose.Types.ObjectId,
    createdAt: {
      type: String,
    },
    adminComment: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('tickets', TicketSchema );
