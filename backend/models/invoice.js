const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const invoiceSchema = mongoose.Schema({
    bill_to: { type: String },
    ship_to: { type: String },
    po_number: { type: Number },
    terms: { type: String },
    project: { type: String },
    jobDetail: {
        jobDetail:[{ 
            description: String,
            rate: Number,
            quantity: Number,
            amount: Number,
            tax: Number
    }]
    },
    totalAmount: { type: Number },
    totalTax: { type: Number }
});

invoiceSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Invoice', invoiceSchema);