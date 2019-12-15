const mongoose = require('mongoose');

const exitActivitySchema = mongoose.Schema({
    Type: String,
    SessionID: Number,
    OUTAgentMACID: String,
    Image: String,
    Platenumber: String,
    Outtime: Number,
});

module.exports = mongoose.model('Exit', exitActivitySchema);
