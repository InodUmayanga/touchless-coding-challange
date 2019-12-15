const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    Type: String,
    // SessionID: Number,
    INAgentMACID: String,
    Platenumber: String,
    Intime: Number,
    Outtime: Number,
    OUTAgentMACID: String,
    Status: String

});

module.exports = mongoose.model('Session', sessionSchema);
