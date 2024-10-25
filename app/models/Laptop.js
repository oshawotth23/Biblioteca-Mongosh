const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  holder: { type: mongoose.Schema.Types.ObjectId, ref: 'Holder', required: true },
  serial: { type: String, required: true },
  qrcode: { type: String, required: true, unique: true },
  state: { type: String, default: '1' },
  observations: { type: String },
  createdAt: { type: Date, default: Date.now }
},

{
  timestamps:true
}
);


module.exports = mongoose.models.Laptop || mongoose.model('Laptop', laptopSchema);
