const Invoice = require('../models/invoice');

exports.invoiceCreate = (req, res, next) => {
    const invoice = new Invoice({
        bill_to: req.body.bill_to,
        ship_to: req.body.ship_to,
        po_number: req.body.po_number,
        terms: req.body.terms,
        project: req.body.project,
        jobDetail: req.body.jobDetail,
        totalAmount: req.body.totalAmount,
        totalTax: req.body.totalTax
    });
    invoice.save()
     .then(createdInvoice => {
        res.status(201).json({
            message: "Job Saved!",
            invoice: {
                ...createdInvoice,
                id: createdInvoice._id
            }
        });
     })
     .catch(error => {
        res.status(500).json({
            message:'Creating Invoice Failed!'
        });
     })
}
