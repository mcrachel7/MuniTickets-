const mongoose = require('mongoose');

//mongoose schema for the FAQ collection
const FAQSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    image: {
      type: String,
    },
    createdAt: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model('FAQ', FAQSchema );
