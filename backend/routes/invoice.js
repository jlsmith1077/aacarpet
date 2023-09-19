const express = require("express");
const checkAuth = require("../middleware/check-auth");
const invoiceControllers = require("../controllers/invoice");
const fileExtract = require("../middleware/file");

const router = express.Router();

router.post(
    "",
    fileExtract,
    invoiceControllers.invoiceCreate
);

// router.get("", jobsControllers.jobsGet);

// router.delete("/:id", jobsControllers.jobDelete);


module.exports = router;