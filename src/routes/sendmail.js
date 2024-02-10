const express = require("express");
const router = express.Router();
const path = require("path");
const { sendMail } = require("../handlers/sendMailHandler");

router.route("/").post(sendMail);

module.exports = router;
