const mongoose = require('mongoose');

//mongoose schema for the inventory collection
const InventorySchema = new mongoose.Schema(
  {
    BackUpDocumentType:{
      type: String,
    },
    BackUpDate:{
      type: String,
    },
    BackUpInventoryNumber: {
      type: String,
    },
    InvoiceDescription: {
      type: String,
    },
    SerialNumber: {
      type: String,
    },
    Color: {
      type: String,
    },
    Department: {
      type: String,
    },
    PhoneNumber:  {
      type: String,
    },
    Floor: {
      type: String,
    },
    Building: {
      type: String,
    },
    ValuationDocumentType: {
      type: String,
    },
    DocumentNumber: {
      type: String,
    },
    DocumentDate: {
      type: String,
    },
    UnitPrice: {
      type: String,
    },
    OwnerNoId: {
      type: String,
    },
    OwnerName: {
      type: String,
    },
    Status: {
      type: String,
    },
    Observations: {
      type: String,
    },
    id_user: mongoose.Types.ObjectId,
    createdAt: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('inventory', InventorySchema );
