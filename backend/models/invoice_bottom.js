const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const invoicebottomSchema = mongoose.Schema({
    description: {type: String},
    rate: {type: Number},
    quantity: {type: Number},
    amount: {type: Number},
    tax: {type: Number},
   
});

invoicebottomSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Invoicebottom', invoicebottomSchema);