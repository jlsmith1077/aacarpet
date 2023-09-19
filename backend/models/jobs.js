const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const jobsSchema = mongoose.Schema({
    date: { startDate: {type: Date, required: true}, endDate: { type: Date}},
    dateRange: { type: Array},
    email: {type: String},
    company: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: Array},
    phone: {type: Number, required: true},
    aptNumber: {type: Array},
    rate: {type: Number}
});

jobsSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Job', jobsSchema);