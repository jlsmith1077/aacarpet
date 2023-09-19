const express = require("express");
const checkAuth = require("../middleware/check-auth");
const jobsControllers = require("../controllers/jobs");
const fileExtract = require("../middleware/file");

const router = express.Router();

router.post(
    "",
    fileExtract,
    jobsControllers.jobCreate
);

router.get("", jobsControllers.jobsGet);

router.delete("/:id", jobsControllers.jobDelete);


module.exports = router;