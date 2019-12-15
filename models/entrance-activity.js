const mongoose = require('mongoose');

const entrnaceActivitySchema = mongoose.Schema({
  Type: String,
  SessionID: Number,
  INAgentMACID: String,
  Image: String,
  Platenumber: String,
  Intime: Number,
});

module.exports = mongoose.model('Entrance', entrnaceActivitySchema);
